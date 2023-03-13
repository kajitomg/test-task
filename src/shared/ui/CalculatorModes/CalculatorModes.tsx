import React, { FC } from 'react'
import { Item } from './item'
import './CalculatorModes.scss'

interface CalculatorModesProps {

	children: React.ReactNode;

	className?: string;

}

const CalculatorModes = ({ children, className }: CalculatorModesProps) => {
	return (
		<div className={['calculator__modes', 'modes', className].join(' ')}>{children}</div>
	)
}

CalculatorModes.Item = Item

export { CalculatorModes }