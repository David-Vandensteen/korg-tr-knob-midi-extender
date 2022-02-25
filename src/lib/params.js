import arg from 'arg';

const { log } = console;

export default class Params {
  constructor() {
    this.args = arg({
      '--in': Number,
      '--out': Number,
      '--list': Boolean,
      '--version': Boolean,
      '--help': Boolean,

      // Aliases
      '-i': '--in',
      '-o': '--out',
      '-l': '--list',
      '-h': '--help',
    });
    if (process.argv.length <= 1) Params.help();
  }

  static help() {
    log('');
    log('');
    log('korg-tr-extender', '[options]');
    log('');
    log('     Required options:');
    log('');
    log('   -i    --in                  -- input midi interface id');
    log('   -o    --out                 -- output midi interface id');
    log('');
    log('     Extra options:');
    log('');
    log('   --list     -l               -- show available midi interface');
    log('   --version                   -- show version');
    log('   --help     -h               -- show help');
    process.exit(0);
  }

  get in() {
    return this.args['--in'];
  }

  get out() {
    return this.args['--out'];
  }

  get list() {
    return this.args['--list'];
  }

  get version() {
    return this.args['--version'];
  }

  get help() {
    return this.args['--help'];
  }
}
