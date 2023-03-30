import React, { FC } from 'react'
import './CalculatorCase.scss'
import cn from 'classnames'

interface CalculatorCaseProps {

	children: React.ReactNode;

	className?: string;

}

const CalculatorCase: FC<CalculatorCaseProps> = ({ children, className }) => {
	const caseClass = cn('calculator__case', className)

	return (
		<div
			className={caseClass}
		>{children}</div>
	)
}

export { CalculatorCase }