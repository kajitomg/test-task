import React, { FC } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton'
import { Number, Numbers, NumberTypes } from '../../../calculators';
import { useActions } from '../../../hooks';
import { CalculatorRuntime } from '../../models';
import './RuntimeNumbers.scss'
import cn from 'classnames'

interface RuntimeNumbersProps {

	numbers: Numbers;

	calculator: CalculatorRuntime;

}

const RuntimeNumbers: FC<RuntimeNumbersProps> = ({ numbers, calculator }) => {

	const { AddSymbol } = useActions()

	const getElementClass = (example: Number) => {
		return cn('runtime-number', example.getValue() === NumberTypes.Zero && 'big')
	}

	const onClickHandler = (value: NumberTypes) => {
		AddSymbol(calculator, value)
	}

	return (
		<div className={'runtime-numbers'}>
			{
				numbers.examples.map((example) =>
					<CalculatorButton
						key={example.getValue()}
						className={getElementClass(example)}
						onClick={() => onClickHandler(example.getValue())}
					>{example.getValue()}</CalculatorButton>
				)
			}
		</div>
	)
}

export { RuntimeNumbers }