import React, { FC } from 'react'
import './CalculatorViewer.scss'

interface CalculatorViewerProps {

	children: string | null | typeof NaN | undefined;

	className?: string;

	active?: boolean;

	draggable?: boolean;

}

const CalculatorViewer: FC<CalculatorViewerProps> = ({ children, className, active, draggable }) => {

	return (
		<div className={['calculator__viewer', className, active ? 'active' : ''].join(' ')} draggable={draggable}>{children}</div>
	)
}

export { CalculatorViewer }