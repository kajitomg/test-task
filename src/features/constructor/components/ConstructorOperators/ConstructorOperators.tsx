import React, { FC, useState } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton';
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase';
import { CalculatorLine, Lines } from '../../../../shared/ui/CalculatorLine';
import { Element, Operators } from '../../../calculators';
import { CalculatorConstructor, Modes } from '../../models';
import { ConstructorDraggableElement } from '../ConstructorDraggableElement';
import './ConstructorOperators.scss'
import cn from 'classnames'

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
	const wrapperClass = cn('constructor-operators', className, { temp: isTemp })

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
				{operators.examples.map((example) =>
					<CalculatorButton
						key={example.getValue()}
						className={'constructor-operator'}

					>{example.getValue()}</CalculatorButton>
				)}
				{isTemp && <CalculatorLine line={line} />}
			</CalculatorCase>
		</ConstructorDraggableElement>
	)
}

export { ConstructorOperators }