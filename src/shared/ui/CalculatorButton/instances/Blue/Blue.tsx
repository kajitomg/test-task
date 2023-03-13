import React, { FC } from 'react'
import { CalculatorButton, CalculatorButtonProps } from '../../CalculatorButton'
import './Blue.scss'

const Blue: FC<CalculatorButtonProps> = ({ children, className, onClick }) => {
	return (
		<CalculatorButton className={['blue', className].join(' ')} onClick={onClick}>{children}</CalculatorButton>
	)
}

export { Blue }