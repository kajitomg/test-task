import React, { FC } from 'react'
import './CalculatorLine.scss'
import cn from 'classnames'

export enum Lines {
	none = 0,
	after = 1,
	before = 2,
}

interface CalculatorLineProps {

	line: Lines

}

const CalculatorLine: FC<CalculatorLineProps> = ({ line }) => {
	const lineClass = cn('line', { 'after-line': line === Lines.after }, { 'before-line': line === Lines.before })
	return (
		<>
			{
				line !== Lines.none ? <span className={lineClass}></span> : <></>
			}
		</>
	)
}

export { CalculatorLine }