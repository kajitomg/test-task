import React, { FC } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton'
import { Numbers, NumberTypes } from '../../../calculators';
import { useActions } from '../../../hooks';
import { CalculatorRuntime } from '../../models';
import './RuntimeNumbers.scss'

interface RuntimeNumbersProps {

	numbers: Numbers;

	calculator: CalculatorRuntime;

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
						key={example.getValue()}
						className={['runtime-number', example.getValue() === NumberTypes.Zero && 'big'].join(' ')}
						onClick={() => onClickHandler(example.getValue())}
					>{example.getValue()}</CalculatorButton>
				)
			}
		</div>
	)
}

export { RuntimeNumbers }