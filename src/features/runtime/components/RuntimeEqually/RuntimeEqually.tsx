import React, { FC } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton';
import { Calculator, Equally } from '../../../calculators';
import { CalculatorConstructor } from '../../../constructor';
import { useActions } from '../../../hooks';
import { CalculatorRuntime } from '../../models';
import './RuntimeEqually.scss'

interface RuntimeEquallyProps {

	equally: Equally;

	calculator: CalculatorRuntime;

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
			>{equally.getValue()}</CalculatorButton.Blue>
		</div>
	)
}

export { RuntimeEqually }