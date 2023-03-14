import React, { FC, useEffect } from 'react'
import { Element, ElementTypes, Positions } from '../../../calculators'
import { useActions, useTypedSelector } from '../../../hooks';
import { CalculatorConstructor, Modes } from '../../models'
import { ConstructorDisplay } from '../ConstructorDisplay';
import { ConstructorEqually } from '../ConstructorEqually';
import { ConstructorNumbers } from '../ConstructorNumbers';
import { ConstructorOperators } from '../ConstructorOperators';

interface ConstructorElementsProps {

	mode: Modes;

	setDraggedElement: (element: Element) => void;

	calculator: CalculatorConstructor

	calculatorTemp: CalculatorConstructor

	draggedElement: Element | null;

}

const ConstructorElements: FC<ConstructorElementsProps> = ({ mode, setDraggedElement, calculator, calculatorTemp, draggedElement }) => {


	const { constructorElements } = useTypedSelector(state => state.calculatorConstructor)

	const { AddConstructorElement } = useActions()

	const getConditionClass = (element: Element) => {
		return mode === Modes.constructor && element.getActive() && draggedElement?.name !== element?.name
	}
	const getConditionVisible = (element: Element) => {
		return mode === Modes.constructor || element.getActive()
	}
	useEffect(() => {
		calculator.initDisplay(Positions.first)
		calculator.initOperators(Positions.second)
		calculator.initNumbers(Positions.third)
		calculator.initEqually(Positions.fourth)
		AddConstructorElement(calculator, calculator.getDisplay())
		AddConstructorElement(calculator, calculator.getOperators())
		AddConstructorElement(calculator, calculator.getEqually())
		AddConstructorElement(calculator, calculator.getNumbers())
	}, [])

	const getIsDraggableElement = (element: Element): boolean => {
		return element.getActive() && mode === Modes.constructor
	}

	return (
		<>
			{constructorElements?.map((element) =>

				getConditionVisible(element) && element.name === ElementTypes.Display && <ConstructorDisplay
					key={element.name}
					calculator={calculator}
					calculatorTemp={calculatorTemp}
					draggable={getIsDraggableElement(element)}
					mode={mode}
					setDragElement={setDraggedElement}
					draggedElement={draggedElement}
					element={element}
					value={calculator.getDisplay()?.getValue()}
					className={getConditionClass(element) ? 'active' : ''} /> ||

				getConditionVisible(element) && element.name === ElementTypes.Operators && <ConstructorOperators
					operators={calculator.getOperators()}
					key={element.name}
					calculator={calculator}
					calculatorTemp={calculatorTemp}
					draggable={getIsDraggableElement(element)}
					mode={mode}
					setDragElement={setDraggedElement}
					draggedElement={draggedElement}
					element={element}
					className={getConditionClass(element) ? 'active' : ''} /> ||

				getConditionVisible(element) && element.name === ElementTypes.Numbers && <ConstructorNumbers
					numbers={calculator.getNumbers()}
					key={element.name}
					calculator={calculator}
					calculatorTemp={calculatorTemp}
					draggable={getIsDraggableElement(element)}
					mode={mode}
					setDragElement={setDraggedElement}
					draggedElement={draggedElement}
					element={element}
					className={getConditionClass(element) ? 'active' : ''} /> ||

				getConditionVisible(element) && element.name === ElementTypes.Equally && <ConstructorEqually
					value={calculator.getEqually()?.getValue()}
					key={element.name}
					calculator={calculator}
					calculatorTemp={calculatorTemp}
					draggable={getIsDraggableElement(element)}
					mode={mode}
					setDragElement={setDraggedElement}
					draggedElement={draggedElement}
					element={element}
					className={getConditionClass(element) ? 'active' : ''} />
			)
			}
		</>
	)
}

export { ConstructorElements }