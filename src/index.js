import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import { getInputs, getOutputs } from 'easymidi';
import Params from '#src/lib/params';
import korgTrExt from '#src/lib/korgTrExt';

const { readJSONSync } = fs;
const { resolve } = appRootPath;
const { log } = console;
const { exit } = process;

const params = new Params();

if (params.help) Params.help();

if (params.version) {
  const { version } = readJSONSync(resolve('./package.json'));
  log(version);
  exit(0);
}

if (params.list) {
  const availableInput = getInputs();
  const availableOutput = getOutputs();

  const displayInput = [];
  const displayOutput = [];

  let id = -1;
  availableInput.map((int) => {
    id += 1;
    return displayInput.push(`${id} ${int}`);
  });

  id = -1;

  availableOutput.map((int) => {
    id += 1;
    return displayOutput.push(`${id} ${int}`);
  });

  log('Midi input :');
  log(displayInput.join('\n'));
  log('');
  log('Midi output :');
  log(displayOutput.join('\n'));
  log('');

  exit(0);
}

if (
  params.in === undefined
  || params.out === undefined
) Params.help();

korgTrExt
  .register({
    input: params.in,
    output: params.out,
  })
  .start();
