export const CommandType = {
  DIRECT_COMMAND_REPLY: 0x00,
  DIRECT_COMMAND_NO_REPLY: 0x80
};

export const OpCode = {
  // opUI
  UI_READ: 0x81,

  // opSound
  SOUND: 0x94,
};

export const BytePrefix = {
  LC1: 129,
  LC2: 130,
  LC3: 131
};
