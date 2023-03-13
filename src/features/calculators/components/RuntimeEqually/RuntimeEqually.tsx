import React, { FC } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton';
import { useActions } from '../../../hooks';
import { Calculator, Equally } from '../../models';
import './RuntimeEqually.scss'

interface RuntimeEquallyProps {

	equally: Equally;

	calculator: Calculator;

}

const RuntimeEqually: FC<RuntimeEquallyProps> = ({ equally, calculator }) => {

	const { MakeOperation, RenderPreviewValue } = useActions()

	const onClickHandler = () => {
		MakeOperation(calculator)
		RenderPreviewValue(calculator)
	}

	return (
		<div className={'wrapper'}>
			<CalculatorButton.Blue
				className={'runtime-equally'}
				onClick={() => onClickHandler()}
			>{equally.value}</CalculatorButton.Blue>
		</div>
	)
}

export { RuntimeEqually }