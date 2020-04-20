export const createOperationPayload = (operation: Buffer, messageCount: number): Buffer => {
  const operationPayload = Buffer.alloc(operation.length + 4);
  operation.copy(operationPayload, 4);
  operationPayload.writeUInt16LE(operation.length + 2);
  operationPayload.writeUInt16LE(messageCount, 2);
  return operationPayload;
};
