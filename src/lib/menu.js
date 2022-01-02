import inquirer from 'inquirer';

export default (choices) => inquirer
  .prompt([
    {
      type: 'list',
      name: 'portName',
      message: 'Select a midi out interface',
      choices,
    },
  ]);
