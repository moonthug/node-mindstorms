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

export class Protocol {

  /**
   *
   * @param command
   * @param messageCount
   */
  static createCommandPayload (command: Buffer, messageCount: number): Buffer {
    const commandPayload = Buffer.alloc(command.length + 2);
    command.copy(commandPayload, 4);
    commandPayload.writeUInt16LE(command.length);
    commandPayload.writeUInt16LE(messageCount, 2);
    return commandPayload;
  }

  /**
   *
   * @param volume
   * @param frequency
   * @param duration
   */
  static playTone (volume: number, frequency: number, duration: number): Buffer {
    const command = Buffer.alloc(13);
    command.writeUInt8(COMMAND_TYPE.DIRECT_COMMAND_NO_REPLY);
    command.writeUInt16LE(0, 1); // UNUSED?
    command.writeUInt8(OP_CODES.SOUND, 3);
    command.writeUInt8(COMMAND_PARAMETER.TONE, 4);
    command.writeUInt8(BYTE_PREFIX.LC1, 5);
    command.writeUInt8(volume, 6);
    command.writeUInt8(BYTE_PREFIX.LC2, 7);
    command.writeUInt16LE(frequency, 8);
    command.writeUInt8(BYTE_PREFIX.LC2, 10);
    command.writeUInt16LE(duration, 11);
    return command;
  };
}
