import React, { FC } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton'
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase'
import { useActions } from '../../../hooks'
import { Calculator, Element, Numbers, NumberTypes } from '../../models'
import './ConstructorNumbers.scss'

interface ConstructorNumbersProps {

	numbers: Numbers;

	className: string;

	calculator: Calculator;

	element: Element;

	setDragElement: (element: any) => void;

	temp?: boolean

}

const ConstructorNumbers: FC<ConstructorNumbersProps> = ({ numbers, className, calculator, setDragElement, element, temp }) => {

	const { DeleteElement } = useActions()

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
		if (temp) {
			return DeleteElement(calculator, element, true)
		}
	};

	return (
		<CalculatorCase
			className={'constructor-numbers'}
			onDragEndHandler={onDragEndHandler}
			onDragLeaveHandler={onDragLeaveHandler}
			onDragOverHandler={onDragOverHandler}
			onDragStartHandler={onDragStartHandler}
			onDropHandler={onDropHandler}
			onDoubleClickHandler={onDoubleClickHandler}
		>
			{numbers.examples.map((example) =>
				<CalculatorButton
					key={example.value}
					className={['constructor-number', example.value === NumberTypes.Zero && 'big', className].join(' ')}
				>{example.value}</CalculatorButton>
			)}
		</CalculatorCase>
	)
}

export { ConstructorNumbers }