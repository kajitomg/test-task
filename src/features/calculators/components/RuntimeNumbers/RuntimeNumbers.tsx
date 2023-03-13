import React, { FC } from 'react'
import { useActions } from '../../..';
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton'
import { Calculator, Numbers, NumberTypes } from '../../models'
import './RuntimeNumbers.scss'

interface RuntimeNumbersProps {

	numbers: Numbers;

	calculator: Calculator;

}

const RuntimeNumbers: FC<RuntimeNumbersProps> = ({ numbers, calculator }) => {

	const { AddSymbol } = useActions()

	const onClickHandler = (value: NumberTypes) => {
		AddSymbol(calculator, value)
	}

	return (
		<div className={'runtime-numbers'}>
			{
				numbers.examples.map((example) =>
					<CalculatorButton
						key={example.value}
						className={['runtime-number', example.value === NumberTypes.Zero && 'big'].join(' ')}
						onClick={() => onClickHandler(example.value)}
					>{example.value}</CalculatorButton>
				)
			}
		</div>
	)
}

export { RuntimeNumbers }