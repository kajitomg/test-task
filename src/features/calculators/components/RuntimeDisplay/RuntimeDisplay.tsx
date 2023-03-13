import React, { FC } from 'react'
import { CalculatorViewer } from '../../../../shared/ui/CalculatorViewer'
import { useTypedSelector } from '../../../hooks'
import './RuntimeDisplay.scss'

interface RuntimeDisplayProps {


}

const RuntimeDisplay: FC<RuntimeDisplayProps> = () => {
	const { value } = useTypedSelector(state => state.calculator)

	const children = value === null ? '0' : typeof value === typeof NaN ? 'Не определено' : value


	const fontsize = children.toLocaleString().length > 8 && 'smallfontsize'

	return (
		<div className={'wrapper'}>
			<CalculatorViewer className={['runtime-display', fontsize].join(' ')}>{children}</CalculatorViewer>
		</div>
	)
}

export { RuntimeDisplay }