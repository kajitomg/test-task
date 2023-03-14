import React, { FC } from 'react'
import { CalculatorViewer } from '../../../../shared/ui/CalculatorViewer'
import { useTypedSelector } from '../../../hooks'
import './RuntimeDisplay.scss'

interface RuntimeDisplayProps {


}

const RuntimeDisplay: FC<RuntimeDisplayProps> = () => {
	const { runtimeValue } = useTypedSelector(state => state.calculatorRuntime)

	const fontsize = runtimeValue && runtimeValue.toLocaleString().length > 8 && 'smallfontsize'

	return (
		<div className={'wrapper'}>
			<CalculatorViewer className={['runtime-display', fontsize].join(' ')}>{runtimeValue}</CalculatorViewer>
		</div>
	)
}

export { RuntimeDisplay }