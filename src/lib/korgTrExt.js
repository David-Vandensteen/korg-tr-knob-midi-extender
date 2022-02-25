import { emitKeypressEvents } from 'readline';
import config from '#src/config/default-fr';
import midiRepeater from '#src/lib/midiRepeater';

const { log } = console;

class KorgTrExt {
  register({
    input,
    output,
  }) {
    this.midi = midiRepeater
      .register({
        input,
        output,
        config,
      })
      .start();
    return this;
  }

  start() {
    const { stdin } = process;
    emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    stdin.on('keypress', (str, keypressing) => {
      if (keypressing.ctrl && keypressing.name === 'c') this.midi.stop();
      else {
        log(keypressing);
        const { keys, knobsCC } = config;
        const key = keys.find((k) => k.name === keypressing.sequence);
        this.midi.replaceCC({ map: knobsCC, remap: key.knobsMap });
      }
    });
    return this;
  }
}

export default new KorgTrExt();
