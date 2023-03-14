import React, { FC, useState } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton';
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase';
import { CalculatorLine, Lines } from '../../../../shared/ui/CalculatorLine';
import { Element, Positions } from '../../../calculators';
import { useActions } from '../../../hooks';
import { CalculatorConstructor, Modes } from '../../models';
import ConstructorDraggableElement from '../ConstructorDraggableElement/ConstructorDraggableElement';
import './ConstructorEqually.scss'

interface ConstructorEquallyProps {

	value: string;

	className?: string;

	element: Element;

	setDragElement: (element: any) => void;

	mode: Modes;

	draggable: boolean;

	calculator: CalculatorConstructor

	calculatorTemp: CalculatorConstructor

	isTemp?: boolean

	draggedElement: Element | null;


}


const ConstructorEqually: FC<ConstructorEquallyProps> = ({ value, className, setDragElement, element, draggable = false, calculator, calculatorTemp, isTemp = false, draggedElement }) => {

	const [line, setLine] = useState<Lines>(Lines.none)

	return (
		<CalculatorCase
			className={['constructor-wrapper', className].join(' ')}
		>
			<CalculatorButton.Blue className={'constructor-equally'} draggable={draggable}>{value}</CalculatorButton.Blue>
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

export { ConstructorEqually }