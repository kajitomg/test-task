import React, { FC } from 'react'
import { CalculatorLine, Lines } from '../../../../shared/ui/CalculatorLine';
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

	const onDragOverHandler = (event: any) => {
		event.preventDefault();
		if (draggedElement) {
			if (getMousePositionOnElement(event) <= getElementHeight(event) / 2) {
				if (draggedElement.name === ElementTypes.Display) {
					// let elem = event.target.offsetParent.firstChild.firstChild
					// event.target.className.split(' ').map((className: any) => {
					// 	if (className === 'calculator__button') {
					// 		elem = event.target.offsetParent.offsetParent.firstChild.firstChild
					// 	}
					// })
					// if (elem.lastElementChild.className === 'line before-line') {
					// 	elem.removeChild(<CalculatorLine line={Lines.before} />);
					// }
					// return elem.append(<CalculatorLine line={Lines.before} />);пше
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
			if (getMousePositionOnElement(event) <= getElementHeight(event) / 2) {
				calculator.getElements().forEach((e) => {
					if (e.name === draggedElement?.name) {
						e.setActive(false)
					}
				})
				AddConstructorTempElement(calculatorTemp, draggedElement, element.getPosition())
			}
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

export { ConstructorDraggableElement }