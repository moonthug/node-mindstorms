import { Ev3 } from '../src';



const main = async () => {
  const ev3 = new Ev3('/dev/tty.EV3-SerialPort');

  await ev3.connect();


  await ev3.tone(1, 262, 30);
  await ev3.tone(1, 353, 30);

  await ev3.getLBatt();

  setTimeout(async () => {
    await ev3.disconnect();
  }, 1000 * 3)
};


main().catch(e => console.error(e));
