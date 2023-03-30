import React, { FC, useEffect, useState } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton'
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase'
import { CalculatorLine, Lines } from '../../../../shared/ui/CalculatorLine'
import { Element, Number, Numbers, NumberTypes } from '../../../calculators'
import { CalculatorConstructor, Modes } from '../../models'
import { ConstructorDraggableElement } from '../ConstructorDraggableElement';
import './ConstructorNumbers.scss'
import cn from 'classnames'

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
	const wrapperClass = cn('constructor-numbers', className, { temp: isTemp })
	const getElementClass = (example: Number) => {
		return cn('constructor-number', { big: example.getValue() === NumberTypes.Zero })
	}

	const [line, setLine] = useState<Lines>(Lines.none)

	return (
		<ConstructorDraggableElement
			draggable={draggable}
			calculator={calculator}
			calculatorTemp={calculatorTemp}
			draggedElement={draggedElement}
			element={element}
			isTemp={isTemp}
			setDragElement={setDragElement}
			setLine={setLine}
		>
			<CalculatorCase
				className={wrapperClass}
			>
				{numbers.examples.map((example) =>
					<CalculatorButton
						key={example.getValue()}
						className={getElementClass(example)}
					>{example.getValue()}</CalculatorButton>
				)}
				{isTemp && <CalculatorLine line={line} />}
			</CalculatorCase>
		</ConstructorDraggableElement>
	)
}

export { ConstructorNumbers }