import React, { FC } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton';
import { Operators, OperatorTypes } from '../../../calculators';
import { useActions } from '../../../hooks';
import { CalculatorRuntime } from '../../models';
import './RuntimeOperators.scss'

interface RuntimeOperatorsProps {

	operators: Operators;

	calculator: CalculatorRuntime;

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
						key={example.getValue()}
						className={'runtime-operator'}
						onClick={() => onClickHandler(example.getValue())}
					>{example.getValue()}</CalculatorButton>
				)
			}
		</div>
	)
}

export { RuntimeOperators }