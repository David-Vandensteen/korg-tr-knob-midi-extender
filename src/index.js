import { getInputs, getOutputs } from 'easymidi';
import midiRepeater from '#src/lib/midiRepeater';
import SuperEasyMidi from '#src/lib/superEasyMidi';
import menu from '#src/lib/menu';

const { log } = console;
log('in', getInputs());
log('out', getOutputs());

midiRepeater
  .register({
    input: 0,
    output: 2,
    sysex: false,
    clock: false,
    activeSensing: false,
  })
  .on('midi-in', ({ reply, message }) => {
    // if (message[0] === 0x80) reply([0x70, message[1], message[2]]);
    // console.log(message);
    // reply([0x70]);
    console.log(message);
    // reply(message);
    // reply(message);
    reply([0x8F, 48, 0]);
  })
  .apply();

/*
menu(easymidi.getOutputs())
  .then((response) => {
    console.log('response : ', response);
    const midi = new SuperEasyMidi(response.portName);
    midi
      .register()
      .start();
  });
  */
