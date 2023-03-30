import React, { FC } from 'react'
import { CalculatorViewer } from '../../../../shared/ui/CalculatorViewer'
import { useTypedSelector } from '../../../hooks'
import './RuntimeDisplay.scss'
import cn from 'classnames'

interface RuntimeDisplayProps {


}

const RuntimeDisplay: FC<RuntimeDisplayProps> = () => {
	const { runtimeValue } = useTypedSelector(state => state.calculatorRuntime)

	const displayClass = cn('runtime-display', { smallfontsize: runtimeValue && runtimeValue.toLocaleString().length > 8 })



	return (
		<div className={'wrapper'}>
			<CalculatorViewer className={displayClass}>{runtimeValue}</CalculatorViewer>
		</div>
	)
}

export { RuntimeDisplay }