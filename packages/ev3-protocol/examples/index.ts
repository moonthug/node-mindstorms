import { Protocol } from '../src';

const main = async () => {
  console.log('run');
  const request = Protocol.playTone(100, 262, 100);
  console.log('Value:', '80000094018164820601826400');
  console.log('Value:', request.toString('hex'));
};

main().catch(e => console.error(e));
