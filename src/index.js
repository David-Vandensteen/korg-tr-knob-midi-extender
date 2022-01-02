import easymidi from 'easymidi';
import SuperEasyMidi from '#src/lib/superEasyMidi';
import menu from '#src/lib/menu';
// import config from '#src/config/default-fr';

menu(easymidi.getOutputs())
  .then((response) => {
    console.log('response : ', response);
    const midi = new SuperEasyMidi(response.portName);
    midi
      .register()
      .start();
  });
