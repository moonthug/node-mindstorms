import { CommandType, OpCode } from './constants';


export enum CommandParameter {
  GET_VBATT = 0x01,
  GET_IBATT = 0x02,
  GET_LBATT = 0x12
}

/**
 *
 */
export const getVBatt = (): Buffer => {
  const command = Buffer.alloc(2);
  command.writeUInt16LE(CommandParameter.GET_VBATT);
  return opUIRead(command);
};

/**
 *
 */
export const getLBatt = (): Buffer => {
  const command = Buffer.alloc(2);
  command.writeUInt16LE(CommandParameter.GET_LBATT);
  return opUIRead(command);
};

/**
 *
 * @param command
 */
export const opUIRead = (command: Buffer): Buffer => {
  let operation = Buffer.alloc(command.length + 4, 255, 'hex');
  command.copy(operation, 4);

  operation.writeUInt8(CommandType.DIRECT_COMMAND_REPLY);
  operation.writeUInt16LE(1, 1); // UNUSED?
  operation.writeUInt8(OpCode.UI_READ, 3);
  return operation;
};
