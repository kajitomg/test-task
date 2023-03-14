import React, { FC } from 'react'
import { Element, ElementTypes } from '../../../calculators'
import { useTypedSelector } from '../../../hooks';
import { CalculatorConstructor, Modes } from '../../models'
import { ConstructorDisplay } from '../ConstructorDisplay';
import { ConstructorEqually } from '../ConstructorEqually';
import { ConstructorNumbers } from '../ConstructorNumbers';
import { ConstructorOperators } from '../ConstructorOperators';

interface ConstructorTempElementsProps {

	mode: Modes;

	setDraggedElement: (element: Element) => void;

	calculator: CalculatorConstructor

	calculatorTemp: CalculatorConstructor

	draggedElement: Element | null;

}

const ConstructorTempElements: FC<ConstructorTempElementsProps> = ({ mode, setDraggedElement, calculator, calculatorTemp, draggedElement }) => {

	const { constructorTempElements } = useTypedSelector(state => state.calculatorConstructor)

	const getConditionActive = (element: Element): string => {
		return draggedElement?.name !== element?.name ? 'active' : ''
	}


	return (
		<>
			{constructorTempElements?.map((element) =>

				element.name === ElementTypes.Display && <ConstructorDisplay
					isTemp={true}
					key={element.name}
					calculator={calculator}
					calculatorTemp={calculatorTemp}
					draggable={false}
					mode={mode}
					setDragElement={setDraggedElement}
					draggedElement={draggedElement}
					element={element}
					value={calculator.getDisplay()?.getValue()}
					className={getConditionActive(element)}
				/> ||

				element.name === ElementTypes.Operators && <ConstructorOperators
					isTemp={true}
					operators={calculator.getOperators()}
					key={element.name}
					calculator={calculator}
					calculatorTemp={calculatorTemp}
					draggable={mode === Modes.constructor}
					mode={mode}
					setDragElement={setDraggedElement}
					draggedElement={draggedElement}
					element={element}
					className={getConditionActive(element)}
				/> ||

				element.name === ElementTypes.Numbers && <ConstructorNumbers
					isTemp={true}
					numbers={calculator.getNumbers()}
					key={element.name}
					calculator={calculator}
					calculatorTemp={calculatorTemp}
					draggable={mode === Modes.constructor}
					mode={mode}
					setDragElement={setDraggedElement}
					draggedElement={draggedElement}
					element={element}
					className={getConditionActive(element)}
				/> ||

				element.name === ElementTypes.Equally && <ConstructorEqually
					isTemp={true}
					value={calculator.getEqually()?.getValue()}
					key={element.name}
					calculator={calculator}
					calculatorTemp={calculatorTemp}
					draggable={mode === Modes.constructor}
					mode={mode}
					setDragElement={setDraggedElement}
					draggedElement={draggedElement}
					element={element}
					className={getConditionActive(element)}
				/>
			)
			}
		</>
	)
}

export { ConstructorTempElements }