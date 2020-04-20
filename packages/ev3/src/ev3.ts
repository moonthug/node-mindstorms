import SerialPort, { BaseBinding } from 'serialport';

const COMMAND_TYPE = {
  DIRECT_COMMAND_REPLY: 0x00,
  DIRECT_COMMAND_NO_REPLY: 0x80,
};

const OP_CODES = {
  SOUND: 0x94
};

const COMMAND_PARAMETER = {
  BREAK: 0x00,
  TONE: 0x01,
  PLAY: 0x02,
  REPEAT: 0x01
};

const BYTE_PREFIX = {
  LC1: 129,
  LC2: 130,
  LC3: 131
};

export class Ev3 {

  /**
   *
   */
  port: SerialPort;

  /**
   *
   */
  private _messageCounter: number;
  private _commandQueue: [];
  private _isPortOpen: boolean;

  /**
   *
   * @param serialPort
   */
  constructor (serialPort: string) {
    this.port = new SerialPort(serialPort, {
      autoOpen: false,
      baudRate: 57600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1
    });
  }

  /**
   *
   */
  async connect () {
    return new Promise(((resolve: Function, reject: Function) => {
      this.port.open((err: Error) => {
        if (err) {
          reject(err);
        }
        resolve();
      })
    }));
  }

  async disconnect() {
    return new Promise(((resolve: Function, reject: Function) => {
      this.port.close((err: Error) => {
        if (err) {
          reject(err);
        }
        resolve();
      })
    }));
  }

  /**
   *
   * @param volume
   * @param frequency
   * @param duration
   */
  async playTone (volume: number, frequency: number, duration: number) {
    const request = Buffer.alloc(15);
    request.writeUInt8(COMMAND_TYPE.DIRECT_COMMAND_NO_REPLY);
    request.writeUInt16LE(0, 1); // UNUSED?
    request.writeUInt8(OP_CODES.SOUND, 3);
    request.writeUInt8(COMMAND_PARAMETER.TONE, 4);
    request.writeUInt8(BYTE_PREFIX.LC1, 5);
    request.writeUInt8(volume, 6);
    request.writeUInt8(BYTE_PREFIX.LC2, 7);
    request.writeUInt16LE(frequency, 8);
    request.writeUInt8(BYTE_PREFIX.LC2, 10);
    request.writeUInt16LE(duration, 11);

    const result = await this.execute(request);

    return this._delay(duration);
  };

  /**
   *
   * @param command
   */
  async execute (command: Buffer) {
    return new Promise(((resolve, reject) => {
      const btCommand = Buffer.alloc(command.length + 2);
      command.copy(btCommand, 4);
      btCommand.writeUInt16LE(command.length);
      btCommand.writeUInt16LE(this._messageCounter, 2);

      console.log(btCommand.toString('hex'));

      this.port.write(btCommand, (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
      this._messageCounter++;
    }))
  }

  /**
   *
   * @private
   */
  private async _delay (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));

  }

  /**
   *
   * @private
   */
  private _initialisePort () {
    this.port.on('data', (data: any) => {
      console.dir(data);
    });
  }

  /**
   *
   */
  get isPortOpen(): boolean {
    return this._isPortOpen;
  }
}
