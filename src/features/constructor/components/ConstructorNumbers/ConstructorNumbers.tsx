import React, { FC } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton'
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase'
import { Element, Numbers, NumberTypes } from '../../../calculators'
import { useActions } from '../../../hooks'
import './ConstructorNumbers.scss'

interface ConstructorNumbersProps {

	numbers: Numbers;

	className: string;

	element: Element;

	setDragElement: (element: any) => void;

}

const ConstructorNumbers: FC<ConstructorNumbersProps> = ({ numbers, className, setDragElement, element }) => {

	const { DeleteConstructorElement } = useActions()

	const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const onDragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {

	};

	const onDragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
		setDragElement(element)
	};

	const onDragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
		setDragElement(null)

	};

	const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();

	};
	const onDoubleClickHandler = () => {
	};

	return (
		<CalculatorCase
			className={['constructor-numbers', className].join(' ')}
			onDragEndHandler={onDragEndHandler}
			onDragLeaveHandler={onDragLeaveHandler}
			onDragOverHandler={onDragOverHandler}
			onDragStartHandler={onDragStartHandler}
			onDropHandler={onDropHandler}
			onDoubleClickHandler={onDoubleClickHandler}
		>
			{numbers.examples.map((example) =>
				<CalculatorButton
					key={example.getValue()}
					className={['constructor-number', example.getValue() === NumberTypes.Zero && 'big'].join(' ')}
				>{example.getValue()}</CalculatorButton>
			)}
		</CalculatorCase>
	)
}

export { ConstructorNumbers }