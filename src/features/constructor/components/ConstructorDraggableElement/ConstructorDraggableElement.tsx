import React, { FC } from 'react'
import { CalculatorLine, Lines } from '../../../../shared/ui/CalculatorLine';
import { Element, ElementTypes, Positions } from '../../../calculators';
import { useActions } from '../../../hooks';
import { CalculatorConstructor } from '../../models';
import NoDraggedArea from '../NoDraggableArea/NoDraggedArea';
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

	children: React.ReactNode;

}

const ConstructorDraggableElement: FC<ConstructorDraggableElementProps> = ({ draggable, setLine, setDragElement, element, draggedElement, calculator, calculatorTemp, isTemp, children }) => {

	const { DeleteConstructorTempElement, AddConstructorTempElement } = useActions()

	const getMousePositionOnElement = (event: any) => {
		let element = event.target.getBoundingClientRect();
		event.target.className.split(' ').map((className: any) => {
			if (className === 'calculator__button') {
				element = event.target.offsetParent.getBoundingClientRect()
			}
		})
		const mousePosition = event.clientY

		return mousePosition - element.top
	}
	const getElementHeight = (event: any) => {
		let element = event.target.getBoundingClientRect();
		event.target.className.split(' ').map((className: any) => {
			if (className === 'calculator__button') {
				element = event.target.offsetParent.getBoundingClientRect()
			}
		})
		return element.height
	}
	const setUndraggable = () => {
		setDragElement(null)
		return setLine(Lines.none)
	}
	const setActiveThisElement = (boolean: boolean, element: Element | null) => {
		calculator.getElements().forEach((thisElement) => {
			if (thisElement.name === element?.name) {
				return thisElement.setActive(boolean)
			}
		})
	}

	const onDragOverHandler = (event: any) => {
		event.preventDefault();
		if (draggedElement) {
			if (getMousePositionOnElement(event) <= getElementHeight(event) / 2) {
				if (draggedElement.name === ElementTypes.Display) {
					if (element.getPosition() === Positions.first) {
						return setLine(Lines.before)
					}
					return
				}
				return setLine(Lines.before)
			}
			if (getMousePositionOnElement(event) >= getElementHeight(event) / 2) {
				if (draggedElement.name === ElementTypes.Display) {
					return
				}
				return setLine(Lines.after)
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
		return setUndraggable()

	};

	const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (isTemp) {
			if (getMousePositionOnElement(event) <= getElementHeight(event) / 2) {
				if (draggedElement) {
					if (draggedElement?.getPosition() < element.getPosition()) {
						AddConstructorTempElement(calculatorTemp, draggedElement, element.getPosition() - 1)
					}
					if (draggedElement?.getPosition() >= element.getPosition()) {
						AddConstructorTempElement(calculatorTemp, draggedElement, element.getPosition())
					}
				}
			}
			if (getMousePositionOnElement(event) >= getElementHeight(event) / 2) {
				if (draggedElement) {
					if (draggedElement?.getPosition() <= element.getPosition()) {
						AddConstructorTempElement(calculatorTemp, draggedElement, element.getPosition())
					}
					if (draggedElement?.getPosition() > element.getPosition()) {
						AddConstructorTempElement(calculatorTemp, draggedElement, element.getPosition() + 1)
					}
				}
			}
			setActiveThisElement(false, draggedElement)
		}
		return setUndraggable()

	};
	const onDoubleClickHandler = () => {
		if (draggable) {
			if (isTemp) {
				DeleteConstructorTempElement(calculatorTemp, element)
				return setActiveThisElement(true, element)
			}
			if (!isTemp) {
				setActiveThisElement(false, element)
				return AddConstructorTempElement(calculatorTemp, element, Positions.end)
			}
		}
	}
	return (
		<div
			className={'drag-element'}
			onDragEnd={() => onDragEndHandler()}
			onDragLeave={() => onDragLeaveHandler()}
			onDragOver={(event) => onDragOverHandler(event)}
			onDragStart={() => onDragStartHandler()}
			onDrop={(event) => onDropHandler(event)}
			onDoubleClick={() => onDoubleClickHandler()}
			draggable={draggable}
		>
			{!draggable && <NoDraggedArea />}
			{children}
		</div>
	)
}

export { ConstructorDraggableElement }