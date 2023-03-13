import React, { FC } from 'react'
import './CalculatorLine.scss'

export enum Lines {
	none = 0,
	after = 1,
	before = 2,
}

interface CalculatorLineProps {

	line: Lines

}

const CalculatorLine: FC<CalculatorLineProps> = ({ line }) => {
	return (
		<>
			{
				line !== Lines.none ? <span className={['line', line === Lines.after ? 'after-line' : '', line === Lines.before ? 'before-line' : ''].join(' ')}></span> : <></>
			}
		</>
	)
}

export { CalculatorLine }