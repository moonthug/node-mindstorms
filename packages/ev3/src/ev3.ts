import SerialPort from 'serialport';

import { Protocol } from '@node-mindstorms/ev3-protocol';

export class Ev3 {

  /**
   *
   */
  port: SerialPort;

  /**
   *
   */
  private _messageCounter: number;
  private readonly _commandQueue: [];
  private readonly _isPortOpen: boolean;

  /**
   *
   * @param serialPort
   */
  constructor (serialPort: string) {
    this._messageCounter = 6;

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
    const result = await this.execute(Protocol.playTone(volume, frequency, duration));
    return this._delay(duration);
  };

  /**
   *
   * @param command
   */
  async execute (command: Buffer) {
    return new Promise(((resolve, reject) => {
      const commandPayload = Protocol.createCommandPayload(command, this._messageCounter);
      console.log(commandPayload.toString('hex'));
      this.port.write(commandPayload, (err) => {
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
