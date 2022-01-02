import easymidi from 'easymidi';

const { log } = console;

export default class SuperEasyMidi extends easymidi.Output {
  register() {
    log('register');
    return this;
  }

  start() {
    log('start');
    return this;
  }
}
