import { EventEmitter } from 'events';
import midi from 'midi';

class MidiRepeater extends EventEmitter {
  register({ input, output }) {
    this.input = new midi.Input(input);
    this.output = new midi.Output(output);
    this.input.openPort(input);
    this.output.openPort(output);
    this.maxOperation = 0;
    this.input.ignoreTypes(false, false, false);
    return this;
  }

  repeat() {
    this.on('midi-in', ({ reply, message }) => {
      console.log('repeat receive');
      reply(message);
    });
    return this;
  }

  apply() {
    this.input.on('message', (deltaTime, message) => {
      this.emit('midi-in', { reply: this.sendMessage.bind(this), message });
      // The message is an array of numbers corresponding to the MIDI bytes:
      //   [status, data1, data2]
      // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
      // information interpreting the messages.
      console.log(`m: ${message} d: ${deltaTime}`);
    });
    console.log('listeners :', this.listenerCount('midi-in'));
    this.maxOperation = this.listenerCount('midi-in');
    return this;
  }

  filter(type) {
    this.on('midi-in', ({ reply, message }) => {
      console.log('filter receive:', type);
      if (message[0] === type) reply(message);
    });
    return this;
  }

  sendMessage(message) {
    this.maxOperation -= 1;
    if (this.maxOperation <= 0) {
      this.output.sendMessage(message);
      this.maxOperation = this.listenerCount('midi-in');
    }
  }

  stop() {
    this.removeAllListeners();
    this.input.close();
    this.output.close();
  }
}

export default new MidiRepeater();
