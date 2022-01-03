import { getInputs, getOutputs } from 'easymidi';
import midiRepeater from '#src/lib/midiRepeater';
import SuperEasyMidi from '#src/lib/superEasyMidi';
import menu from '#src/lib/menu';

const { log } = console;
log('in', getInputs());
log('out', getOutputs());

midiRepeater
  .register({ input: 0, output: 2 })
  // .repeat()
  /*
  .on('message', ({ reply, message }) => {
    log('receive : ', message);
    reply(message);
  })
  */
  // .repeat()
  // .filter(144)
  // .filter(80)
  .repeat()
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
