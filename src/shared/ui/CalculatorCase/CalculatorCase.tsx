import React, { FC } from 'react'
import './CalculatorCase.scss'

interface CalculatorCaseProps {

	children: React.ReactNode;

	className?: string;

}

const CalculatorCase: FC<CalculatorCaseProps> = ({ children, className }) => {

	return (
		<div
			className={['calculator__case', className].join(' ')}
		>{children}</div>
	)
}

export { CalculatorCase }