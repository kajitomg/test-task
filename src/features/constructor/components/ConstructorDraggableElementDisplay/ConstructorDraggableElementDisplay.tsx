import React, { FC } from 'react'
import { Lines } from '../../../../shared/ui/CalculatorLine';
import { Element, ElementTypes, Positions } from '../../../calculators';
import { useActions } from '../../../hooks';
import { ConstructorDraggableElementProps } from '../ConstructorDraggableElement/ConstructorDraggableElement';
import '../ConstructorDraggableElement/ConstructorDraggableElement.scss'


const ConstructorDraggableElementDisplay: FC<ConstructorDraggableElementProps> = ({ draggable, setLine, setDragElement, element, draggedElement, calculator, calculatorTemp, isTemp }) => {


	const { AddConstructorTempElement } = useActions()

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
			if (draggedElement.name === ElementTypes.Display) {
				return
			}
			if (getMousePositionOnElement(event) <= getElementHeight(event) / 2) {
				setLine(Lines.none)
			}
			if (getMousePositionOnElement(event) >= getElementHeight(event) / 2) {
				setLine(Lines.after)
			}
		}
	};

	const onDragLeaveHandler = () => {
		setLine(Lines.none)
	};

	const onDragStartHandler = () => {
		if (!isTemp) {
			setDragElement(element)
		}
	};

	const onDragEndHandler = () => {
		setDragElement(null)
		setLine(Lines.none)

	};
	const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (element.name === draggedElement?.name) {
			setDragElement(null)
			setLine(Lines.none)
			return
		}
		if (isTemp) {
			if (getMousePositionOnElement(event) >= getElementHeight(event) / 2) {
				calculator.getElements().forEach((e) => {
					if (e.name === draggedElement?.name) {
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
		if (draggable) {
			if (!isTemp) {
				calculator.getElements().forEach((e) => {
					if (e.name === element.name) {
						e.setActive(false)
					}
				})
				AddConstructorTempElement(calculatorTemp, element, Positions.end)
			}
		}
	}
	const getIsDraggedClass = (): string => {
		return !draggable ? 'nodragged' : ''
	}

	return (
		<div
			className={['drag-element', getIsDraggedClass()].join(' ')}
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

export { ConstructorDraggableElementDisplay }