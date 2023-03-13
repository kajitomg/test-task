import React, { FC, useEffect, useState } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton'
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase'
import { CalculatorLine, Lines } from '../../../../shared/ui/CalculatorLine'
import { Element, Numbers, NumberTypes, Positions } from '../../../calculators'
import { useActions } from '../../../hooks'
import { CalculatorConstructor, Modes } from '../../models'
import './ConstructorNumbers.scss'

interface ConstructorNumbersProps {

	numbers: Numbers;

	className?: string;

	element: Element;

	setDragElement: (element: any) => void;

	draggedElement: Element | null;

	mode: Modes;

	draggable: boolean;

	calculator: CalculatorConstructor

	calculatorTemp: CalculatorConstructor

	temp?: boolean


}

const ConstructorNumbers: FC<ConstructorNumbersProps> = ({ numbers, className, setDragElement, element, mode, draggable = false, calculator, calculatorTemp, temp = false, draggedElement }) => {

	const [line, setLine] = useState<Lines>(Lines.none)

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
		if (getMousePositionOnElement(event) <= getElementHeight(event) / 2) {
			setLine(Lines.before)
		}
		if (getMousePositionOnElement(event) >= getElementHeight(event) / 2) {
			setLine(Lines.after)
		}
	};

	const onDragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
		setLine(Lines.none)
	};

	const onDragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
		setDragElement(element)
	};

	const onDragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
		setDragElement(null)
		setLine(Lines.none)

	};

	const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (element.name === draggedElement?.name) {
			return
		}
		if (temp) {
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
		if (temp) {
			DeleteConstructorTempElement(calculatorTemp, element)
			calculator.getElements().forEach((e) => {
				if (e.name === element.name) {
					e.setActive(true)
				}
			})
		}
		if (!temp) {
			calculator.getElements().forEach((e) => {
				if (e.name === element.name) {
					e.setActive(false)
				}
			})
			AddConstructorTempElement(calculatorTemp, element)
		}
	}
	return (
		<CalculatorCase
			className={['constructor-numbers', className].join(' ')}
			onDragEndHandler={onDragEndHandler}
			onDragLeaveHandler={onDragLeaveHandler}
			onDragOverHandler={onDragOverHandler}
			onDragStartHandler={onDragStartHandler}
			onDropHandler={onDropHandler}
			onDoubleClickHandler={onDoubleClickHandler}
			draggable={draggable}
		>
			{numbers.examples.map((example) =>
				<CalculatorButton
					key={example.getValue()}
					className={['constructor-number', example.getValue() === NumberTypes.Zero && 'big'].join(' ')}
				>{example.getValue()}</CalculatorButton>
			)}
			<CalculatorLine line={line} />
		</CalculatorCase>
	)
}

export { ConstructorNumbers }