import React, { FC } from 'react'
import { useActions } from '../../..';
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton';
import { Calculator, Operators, OperatorTypes } from '../../models';
import './RuntimeOperators.scss'

interface RuntimeOperatorsProps {

	operators: Operators;

	calculator: Calculator;

}

const RuntimeOperators: FC<RuntimeOperatorsProps> = ({ operators, calculator }) => {

	const { SetOperation, RenderPreviewValue } = useActions()

	const onClickHandler = (operation: OperatorTypes) => {
		SetOperation(calculator, operation)
		RenderPreviewValue(calculator)
	}


	return (
		<div className={'runtime-operators'}>
			{
				operators.examples.map((example) =>
					<CalculatorButton
						key={example.value}
						className={'runtime-operator'}
						onClick={() => onClickHandler(example.value)}
					>{example.value}</CalculatorButton>
				)
			}
		</div>
	)
}

export { RuntimeOperators }