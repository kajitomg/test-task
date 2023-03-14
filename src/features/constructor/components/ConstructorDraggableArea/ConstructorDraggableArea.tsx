import React, { FC } from 'react'
import { Element, ElementTypes, Positions } from '../../../calculators';
import { useActions } from '../../../hooks';
import { CalculatorConstructor } from '../../models';
import './ConstructorDraggableArea.scss'

interface ConstructorDraggableAreaProps {

	dragOver: boolean;

	setDragOver: (boolean: boolean) => void;

	draggedElement: Element | null;

	setDraggedElement: (element: Element | null) => void;

	constructorCalculator: CalculatorConstructor;

	constructorTempCalculator: CalculatorConstructor;

}

const ConstructorDraggableArea: FC<ConstructorDraggableAreaProps> = ({ dragOver, setDragOver, draggedElement, setDraggedElement, constructorCalculator, constructorTempCalculator }) => {
	const { AddConstructorTempElement } = useActions()

	const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragOver(true)
	};
	const onDragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {

		setDragOver(false)

	};

	const onDropHandler = (event: React.DragEvent<HTMLDivElement>, constructorCalculator: CalculatorConstructor, constructorTempCalculator: CalculatorConstructor) => {

		event.preventDefault();

		if (dragOver) {
			if (draggedElement) {
				let isItElement = false
				constructorTempCalculator.getElements().map((element) => {
					if (element.name === draggedElement.name) {
						isItElement = true
					}
				})
				if (isItElement) {
					return
				}
				if (!isItElement) {
					AddConstructorTempElement(constructorTempCalculator, draggedElement, Positions.end)
				}
				constructorCalculator.getElements().forEach((element) => {
					if (element.name === draggedElement.name) {
						element.setActive(false)
					}
				})
			}
			setDragOver(false)
			setDraggedElement(null)
		}


	};

	const onDragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
		setDragOver(false)
		setDraggedElement(null)

	};

	return (
		<div
			className={'drag-area'}
			onDragOver={(event) => onDragOverHandler(event)}
			onDrop={(event) => onDropHandler(event, constructorCalculator, constructorTempCalculator)}
			onDragLeave={(event) => onDragLeaveHandler(event)}
			onDragEnd={(event) => onDragEndHandler(event)}
			draggable={true}
		></div>
	)
}

export { ConstructorDraggableArea }