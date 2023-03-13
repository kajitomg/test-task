import React, { FC } from 'react'
import './CalculatorViewer.scss'

interface CalculatorViewerProps {

	children: string | null | typeof NaN;

	className?: string;

	active?: boolean;

}

const CalculatorViewer: FC<CalculatorViewerProps> = ({ children, className, active }) => {

	return (
		<div className={['calculator__viewer', className, active ? 'active' : ''].join(' ')}>{children}</div>
	)
}

export { CalculatorViewer }