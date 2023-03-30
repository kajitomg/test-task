import React, { FC } from 'react'
import { Item } from './item'
import './CalculatorModes.scss'
import cn from 'classnames'

interface CalculatorModesProps {

	children: React.ReactNode;

	className?: string;

}

const CalculatorModes = ({ children, className }: CalculatorModesProps) => {
	const modesClass = cn('calculator__modes', 'modes', className)
	return (
		<div className={modesClass}>{children}</div>
	)
}

CalculatorModes.Item = Item

export { CalculatorModes }