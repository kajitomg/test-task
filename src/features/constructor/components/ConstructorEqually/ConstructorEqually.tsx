import React, { FC } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton';
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase';
import { Element } from '../../../calculators';
import { useActions } from '../../../hooks';
import './ConstructorEqually.scss'

interface ConstructorEquallyProps {

	value: string;

	className: string;

	element: Element;

	setDragElement: (element: any) => void;

}

const ConstructorEqually: FC<ConstructorEquallyProps> = ({ value, className, setDragElement, element }) => {

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
			className={['constructor-wrapper', className].join(' ')}
			onDragEndHandler={onDragEndHandler}
			onDragLeaveHandler={onDragLeaveHandler}
			onDragOverHandler={onDragOverHandler}
			onDragStartHandler={onDragStartHandler}
			onDropHandler={onDropHandler}
			onDoubleClickHandler={onDoubleClickHandler}
		>
			<CalculatorButton.Blue className={'constructor-equally'}>{value}</CalculatorButton.Blue>
		</CalculatorCase>
	)
}

export { ConstructorEqually }