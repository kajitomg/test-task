import React, { FC } from 'react'
import { Lines } from '../../../../shared/ui/CalculatorLine';
import { Element, ElementTypes, Positions } from '../../../calculators';
import { useActions } from '../../../hooks';
import { CalculatorConstructor } from '../../models';
import './ConstructorDraggableElement.scss'

export interface ConstructorDraggableElementProps {

	draggable: boolean;

	setLine: (line: Lines) => void;

	setDragElement: (element: Element | null) => void;

	element: Element;

	draggedElement: Element | null;

	calculator: CalculatorConstructor;

	calculatorTemp: CalculatorConstructor;

	isTemp: boolean;

}

const ConstructorDraggableElement: FC<ConstructorDraggableElementProps> = ({ draggable, setLine, setDragElement, element, draggedElement, calculator, calculatorTemp, isTemp }) => {

	const { DeleteConstructorTempElement, AddConstructorTempElement } = useActions()

	const getMousePositionOnElement = (event: any) => {
		const element = event.target.getBoundingClientRect();

		const mousePosition = event.clientY

		return mousePosition - element.top
	}
	const getElementHeight = (event: any) => {
		const element = event.target.getBoundingClientRect();

		return element.height
	}

	const onDragOverHandler = (event: any) => {
		event.preventDefault();
		if (draggedElement) {
			if (getMousePositionOnElement(event) <= getElementHeight(event) / 2) {
				setLine(Lines.before)
			}
			if (getMousePositionOnElement(event) >= getElementHeight(event) / 2) {
				if (draggedElement.name === ElementTypes.Display) {
					return
				}
				setLine(Lines.after)
			}

		}
	};
	const onDragLeaveHandler = () => {
		setLine(Lines.none)
	};

	const onDragStartHandler = () => {
		setDragElement(element)
	};

	const onDragEndHandler = () => {
		setDragElement(null)
		setLine(Lines.none)

	};

	const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (element.name === draggedElement?.name) {
			return
		}
		if (isTemp) {
			if (getMousePositionOnElement(event) <= getElementHeight(event) / 2) {
				calculator.getElements().forEach((e) => {
					if (e.name === element.name) {
						e.setActive(false)
					}
				})
				AddConstructorTempElement(calculatorTemp, draggedElement, element.getPosition())
			}
			if (getMousePositionOnElement(event) >= getElementHeight(event) / 2) {
				calculator.getElements().forEach((e) => {
					if (e.name === element.name) {
						e.setActive(false)
					}
				})
				if ((element.getPosition() + 1) < Positions.fourth) {
					AddConstructorTempElement(calculatorTemp, draggedElement, element.getPosition() + 1)
				}
				if ((element.getPosition() + 1) >= Positions.fourth) {
					AddConstructorTempElement(calculatorTemp, draggedElement, element.getPosition())
				}
			}
		}
		setDragElement(null)
		setLine(Lines.none)

	};
	const onDoubleClickHandler = () => {
		if (isTemp) {
			DeleteConstructorTempElement(calculatorTemp, element)
			calculator.getElements().forEach((e) => {
				if (e.name === element.name) {
					e.setActive(true)
				}
			})
		}
		if (!isTemp) {
			calculator.getElements().forEach((e) => {
				if (e.name === element.name) {
					e.setActive(false)
				}
			})
			AddConstructorTempElement(calculatorTemp, element)
		}
	}
	return (
		<div
			className={['drag-element', !draggable ? 'nodragged' : ''].join(' ')}
			onDragEnd={() => onDragEndHandler()}
			onDragLeave={() => onDragLeaveHandler()}
			onDragOver={(event) => onDragOverHandler(event)}
			onDragStart={() => onDragStartHandler()}
			onDrop={(event) => onDropHandler(event)}
			onDoubleClick={() => onDoubleClickHandler()}
			draggable={true}
		></div>
	)
}

export default ConstructorDraggableElement