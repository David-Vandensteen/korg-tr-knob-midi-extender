import { EventEmitter } from 'events';
import midi from 'midi';

const { log } = console;
const TYPE_CC = 176;

class MidiRepeater extends EventEmitter {
  register({
    input,
    output,
    sysex = true,
    clock = true,
    activeSensing = true,
    config,
  }) {
    this.config = config;
    this.input = new midi.Input(input);
    this.output = new midi.Output(output);
    this.input.openPort(input);
    this.output.openPort(output);
    this.input.ignoreTypes(!sysex, !clock, !activeSensing);
    this.excludes = [];

    log('in interface name :', this.input.getPortName(input));
    log('out interface name :', this.output.getPortName(output));

    this.on('midi-out', (message) => {
      this.output.sendMessage(message);
    });

    this.input.on('message', (deltaTime, message) => {
      this.emit('midi-in', { reply: this.send.bind(this), message });
    });
    return this;
  }

  exclude(type) {
    this.excludes.push(type);
    return this;
  }

  excludeClock() {
    return this.exclude(0xF8);
  }

  excludeActiveSensing() {
    return this.exclude(0xFE);
  }

  excludeSysex() {
    return this.exclude(0xF0);
  }

  send(message) {
    if (!this.excludes.find((type) => type === message[0])) {
      const translatedMessage = message;
      if (this.ccsMapIn && this.ccsMapOut && message[0] === TYPE_CC) {
        this.ccsMapIn.map((cc, index) => {
          if (cc === message[1]) translatedMessage[1] = this.ccsMapOut[index];
          return index;
        });
      }
      log('send :', translatedMessage);
      this.emit('midi-out', translatedMessage);
    }
    return this;
  }

  replaceCC({ map, remap }) {
    this.ccsMapIn = map;
    this.ccsMapOut = remap;
    return this;
  }

  replaceCCreset() {
    this.ccsMapIn = undefined;
    this.ccsMapOut = undefined;
  }

  start() {
    this.on('midi-in', ({ message }) => {
      this.send(message);
    });
    return this;
  }

  stop() {
    this.removeAllListeners();
    this.input.closePort();
    this.output.closePort();
    process.exit();
  }
}

export default new MidiRepeater();
