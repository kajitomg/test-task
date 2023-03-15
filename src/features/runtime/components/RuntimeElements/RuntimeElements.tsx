import React, { FC, useEffect, useState } from 'react'
import { Element, ElementTypes } from '../../../calculators'
import { CalculatorConstructor, Modes } from '../../../constructor'
import { useActions, useTypedSelector } from '../../../hooks'
import { CalculatorRuntime } from '../../models'
import { RuntimeDisplay } from '../RuntimeDisplay'
import { RuntimeEqually } from '../RuntimeEqually'
import { RuntimeNumbers } from '../RuntimeNumbers'
import { RuntimeOperators } from '../RuntimeOperators'

interface RuntimeElementsProps {

	mode: Modes;

	constructorTempCalculator: CalculatorConstructor;

}

const RuntimeElements: FC<RuntimeElementsProps> = ({ mode, constructorTempCalculator }) => {
	const [calculator, setCalculator] = useState<CalculatorRuntime>(new CalculatorRuntime())

	const { runtimeElements } = useTypedSelector(state => state.calculatorRuntime)

	const { RenderRuntimeElement, RenderValue } = useActions()

	useEffect(() => {
		setCalculator(new CalculatorRuntime())
		if (mode === Modes.runtime) {
			calculator?.addElements(constructorTempCalculator.getElements())
			RenderRuntimeElement(calculator)
			RenderValue(calculator)
		}
	}, [mode])

	return (
		<>
			{
				runtimeElements.length > 0 && calculator &&
				runtimeElements.map((element) =>
					element.name === ElementTypes.Display && <RuntimeDisplay key={element.name} /> ||
					element.name === ElementTypes.Operators && <RuntimeOperators calculator={calculator} operators={calculator.getOperators()} key={element.name} /> ||
					element.name === ElementTypes.Numbers && <RuntimeNumbers calculator={calculator} numbers={calculator.getNumbers()} key={element.name} /> ||
					element.name === ElementTypes.Equally && <RuntimeEqually calculator={calculator} equally={calculator.getEqually()} key={element.name} />
				)
			}
		</>
	)
}

export { RuntimeElements }