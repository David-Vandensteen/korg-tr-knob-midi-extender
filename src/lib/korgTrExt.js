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
        clock: false,
        sysex: false,
        activeSensing: false,
        config,
      })
      .start();
    return this;
  }

  start() {
    const { stdin } = process;
    const defaultBankKey = config.defaultKey;

    emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    stdin.on('keypress', (str, keypressing) => {
      if (keypressing.ctrl && keypressing.name === 'c') this.midi.stop();
      else {
        log(keypressing);
        if (defaultBankKey === keypressing.name) {
          this.midi.replaceCCreset();
        } else {
          const { keys, knobsCC } = config;
          const key = keys.find((k) => k.name === keypressing.name);
          this.midi.replaceCC({ map: knobsCC, remap: key.knobsMap });
        }
      }
    });
    return this;
  }
}

export default new KorgTrExt();
