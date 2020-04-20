import { Ev3 } from '../src';



const main = async () => {
  const ev3 = new Ev3('/dev/tty.EV3-SerialPort');

  await ev3.connect();
  await ev3.playTone(100, 200, 100);
  await ev3.playTone(100, 100, 100);
  await ev3.playTone(100, 440, 100);
  await ev3.playTone(100, 630, 100);
  await ev3.disconnect();
};


main().catch(e => console.error(e));
