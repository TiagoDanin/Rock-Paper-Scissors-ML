# Rock Paper Scissors ML
Rock Paper Scissors Machine Learning

## Usage

```javascript
const config = {
	choices: ['rock', 'paper', 'scissors'],
	history: 3,
	lastChoices: []
}
const run = rockPaperScissors(config)
run('rock') //winHumane, winMachine, answerHumane, answerMachine
```

## Installation

This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install rock-paper-scissors-ml --save
```

## Dependencies

- [brainjs](https://ghub.io/brainjs): Neural network library

## License

MIT
