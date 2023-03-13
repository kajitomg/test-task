import React, { FC } from 'react'
import { CalculatorViewer } from '../../../../shared/ui/CalculatorViewer'
import { useTypedSelector } from '../../../hooks'
import './RuntimeDisplay.scss'

interface RuntimeDisplayProps {


}

const RuntimeDisplay: FC<RuntimeDisplayProps> = () => {
	const { runtimeValue } = useTypedSelector(state => state.calculatorRuntime)

	const children = runtimeValue === null ? '0' : typeof runtimeValue === typeof NaN ? 'Не определено' : runtimeValue


	const fontsize = children.toLocaleString().length > 8 && 'smallfontsize'

	return (
		<div className={'wrapper'}>
			<CalculatorViewer className={['runtime-display', fontsize].join(' ')}>{children}</CalculatorViewer>
		</div>
	)
}

export { RuntimeDisplay }