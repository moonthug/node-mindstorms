import { tone, getLBatt, createOperationPayload } from '../src';

const main = async () => {
  console.log('run');

  const toneOperation = tone(100, 262, 100);
  // console.log(toneOperation.toString('hex').toUpperCase());
  // console.log('80000094018164820601826400');
  console.assert(toneOperation.toString('hex').toUpperCase() === '80000094018164820601826400');

  const toneOperationPayload = createOperationPayload(toneOperation, 6);
  // console.log(toneOperationPayload.toString('hex').toUpperCase());
  // console.log('0F00060080000094018164820601826400');
  console.assert(toneOperationPayload.toString('hex').toUpperCase() === '0F00060080000094018164820601826400');

  const lBattOperation = getLBatt();
  console.log(lBattOperation.toString('hex').toUpperCase());
  console.log('000100811260');

  const lBattOperationPayload = createOperationPayload(lBattOperation, 0);
  console.log(lBattOperationPayload.toString('hex'));
  console.log('08000000000100811260');
  console.assert(toneOperationPayload.toString('hex').toUpperCase() === '08000000000100811260');
};

main().catch(e => console.error(e));
