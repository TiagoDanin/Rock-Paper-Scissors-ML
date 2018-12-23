const brain = require('brainjs')

const net = new brain.NeuralNetwork({
	activation: 'sigmoid'
})

module.exports = (options) => {
	var choices = options.choices || []
	var history = options.history || 1
	var lastChoices = options.lastChoices || []

	const choicesObjIn = choices.reduce((total, elem) => {
		for (var i = 1; i <= history; i++) {
			total[`${i}${elem}`] = 0
		}
		return total
	}, {})

	const choicesObjOut = choices.reduce((total, elem) => {
		total[elem] = 0.2
		return total
	}, {})

	const randomChoices = () => choices[Math.floor((Math.random() * choices.length))]

	const getLastChoices = () => {
		if (lastChoices.length <= 0) {
			for (var i = 1; i <= history; i++) {
				lastChoices.push(`${i}${randomChoices()}`)
			}
		}
		return lastChoices.reduce((total, elem) => {
			total[elem] = 1
			return total
		}, {})
	}

	const updateLastChoices = (elem) => [...lastChoices.splice(1, history), elem]

	net.train({
		input: choicesObjIn,
		output: choicesObjOut
	})

	const checkWin = (answerOne, answerTwo) => {
		if (answerOne == answerTwo) {
			return 0.5
		}
		var getIndex = choices.indexOf(answerOne) + 1
		getIndex = (choices.length == getIndex) ? 0 : getIndex
		if (choices[getIndex] == answerTwo) {
			return 0
		}
		return 1
	}

	const output = (answerHumane) => {
		const result = net.run(getLastChoices())
		const answerMachine = choices.reduce((total, elem) => {
			var value = result[elem]
			if (total.value - value <= 0) {
				return {
					value: value,
					name: elem
				}
			}
			return total
		}, { value: 0, name: '' })
		const isWin = checkWin(answerHumane, answerMachine.name)

		var winIa = isWin
		if (isWin == 0) {
			winIa = 1
		} else if (isWin == 1) {
			winIa = 0
		} else {
			winIa = Math.random() * (0.2 - 0) + 0
		}

		updateLastChoices(answerHumane)
		net.train({
			input : { ...choicesObjIn, ...getLastChoices() },
			output: { ...choicesObjOut, [answerMachine.name ]: winIa }
		})

		return {
			winHumane: isWin,
			winMachine: winIa,
			answerHumane: answerHumane,
			answerMachine: answerMachine.name
		}
	}

	return output
}
