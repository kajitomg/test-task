import React, { FC } from 'react'
import './CalculatorViewer.scss'
import cn from 'classnames'

interface CalculatorViewerProps {

	children: string | null | typeof NaN | undefined;

	className?: string;

	active?: boolean;

	draggable?: boolean;

}

const CalculatorViewer: FC<CalculatorViewerProps> = ({ children, className, active, draggable }) => {
	const viewerClass = cn('calculator__viewer', className, { active: active })

	return (
		<div className={viewerClass} draggable={draggable}>{children}</div>
	)
}

export { CalculatorViewer }