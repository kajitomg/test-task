import React, { FC, useEffect, useState } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton'
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase'
import { CalculatorLine, Lines } from '../../../../shared/ui/CalculatorLine'
import { Element, Numbers, NumberTypes, Positions } from '../../../calculators'
import { useActions } from '../../../hooks'
import { CalculatorConstructor, Modes } from '../../models'
import ConstructorDraggableElement from '../ConstructorDraggableElement/ConstructorDraggableElement'
import './ConstructorNumbers.scss'

interface ConstructorNumbersProps {

	numbers: Numbers;

	className?: string;

	element: Element;

	setDragElement: (element: any) => void;

	draggedElement: Element | null;

	mode: Modes;

	draggable: boolean;

	calculator: CalculatorConstructor

	calculatorTemp: CalculatorConstructor

	isTemp?: boolean


}

const ConstructorNumbers: FC<ConstructorNumbersProps> = ({ numbers, className, setDragElement, element, draggable = false, calculator, calculatorTemp, isTemp = false, draggedElement }) => {

	const [line, setLine] = useState<Lines>(Lines.none)

	return (
		<CalculatorCase
			className={['constructor-numbers', className, isTemp ? 'temp' : ''].join(' ')}
		>
			{numbers.examples.map((example) =>
				<CalculatorButton
					key={example.getValue()}
					className={['constructor-number', example.getValue() === NumberTypes.Zero && 'big'].join(' ')}
				>{example.getValue()}</CalculatorButton>
			)}
			{isTemp && <CalculatorLine line={line} />}
			<ConstructorDraggableElement
				draggable={draggable}
				calculator={calculator}
				calculatorTemp={calculatorTemp}
				draggedElement={draggedElement}
				element={element}
				isTemp={isTemp}
				setDragElement={setDragElement}
				setLine={setLine}
			/>
		</CalculatorCase>
	)
}

export { ConstructorNumbers }