import React, { FC, useState } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton';
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase';
import { CalculatorLine, Lines } from '../../../../shared/ui/CalculatorLine';
import { Element, Operators } from '../../../calculators';
import { CalculatorConstructor, Modes } from '../../models';
import { ConstructorDraggableElement } from '../ConstructorDraggableElement';
import './ConstructorOperators.scss'

interface ConstructorOperatorsProps {

	operators: Operators;

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

const ConstructorOperators: FC<ConstructorOperatorsProps> = ({ operators, className, setDragElement, element, mode, draggable = false, calculator, calculatorTemp, isTemp = false, draggedElement }) => {

	const [line, setLine] = useState<Lines>(Lines.none)

	const getIsShadowClass = () => {
		return isTemp ? 'temp' : ''
	}

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
				className={['constructor-operators', className, getIsShadowClass()].join(' ')}
			>
				{operators.examples.map((example) =>
					<CalculatorButton
						key={example.getValue()}
						className={['constructor-operator'].join(' ')}

					>{example.getValue()}</CalculatorButton>
				)}
				{isTemp && <CalculatorLine line={line} />}
			</CalculatorCase>
		</ConstructorDraggableElement>
	)
}

export { ConstructorOperators }