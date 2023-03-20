import React, { FC } from 'react'
import { Lines } from '../../../../shared/ui/CalculatorLine';
import { Element, ElementTypes, Positions } from '../../../calculators';
import { useActions } from '../../../hooks';
import { ConstructorDraggableElementProps } from '../ConstructorDraggableElement/ConstructorDraggableElement';
import '../ConstructorDraggableElement/ConstructorDraggableElement.scss'
import NoDraggedArea from '../NoDraggableArea/NoDraggedArea';


const ConstructorDraggableElementDisplay: FC<ConstructorDraggableElementProps> = ({ draggable, setLine, setDragElement, element, draggedElement, calculator, calculatorTemp, isTemp, children }) => {


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
		return setUndraggable()

	};
	const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (isTemp) {
			if (getMousePositionOnElement(event) >= getElementHeight(event) / 2) {
				if (draggedElement) {
					if (draggedElement?.getPosition() > element.getPosition()) {
						AddConstructorTempElement(calculatorTemp, draggedElement, element.getPosition() + 1)
					}
				}
			}
		}

		setActiveThisElement(false, draggedElement)
		return setUndraggable()

	};
	const onDoubleClickHandler = () => {
		if (draggable) {
			if (!isTemp) {
				setActiveThisElement(false, element)
				AddConstructorTempElement(calculatorTemp, element, Positions.end)
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

export { ConstructorDraggableElementDisplay }