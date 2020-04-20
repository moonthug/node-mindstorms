import { CommandType, OpCode, BytePrefix } from './constants';

/**
 *
 */
export const CommandParameter = {
  BREAK: 0x00,
  TONE: 0x01,
  PLAY: 0x02,
  REPEAT: 0x01
};

/**
 *
 * @param volume
 * @param frequency
 * @param duration
 */
export const tone = (volume: number, frequency: number, duration: number): Buffer => {
  const command = Buffer.alloc(9, 255, 'hex');
  command.writeUInt8(CommandParameter.TONE);
  command.writeUInt8(BytePrefix.LC1, 1);
  command.writeUInt8(volume, 2);
  command.writeUInt8(BytePrefix.LC2, 3);
  command.writeUInt16LE(frequency, 4);
  command.writeUInt8(BytePrefix.LC2, 6);
  command.writeUInt16LE(duration, 7);
  return opSound(command);
};

/**
 *
 * @param command
 */
export const opSound = (command: Buffer): Buffer => {
  const operation = Buffer.alloc(command.length + 4);
  command.copy(operation, 4);

  operation.writeUInt8(CommandType.DIRECT_COMMAND_NO_REPLY);
  operation.writeUInt16LE(0, 1); // UNUSED?
  operation.writeUInt8(OpCode.SOUND, 3);
  return operation;
};
