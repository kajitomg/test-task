import React, { FC } from 'react'
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase'
import { CalculatorViewer } from '../../../../shared/ui/CalculatorViewer'
import { useActions } from '../../../hooks';
import { Calculator, Element } from '../../models';
import './ConstructorDisplay.scss'

interface ConstructorDisplayProps {

	value: string;

	className: string;

	calculator: Calculator;

	element: Element;

	setDragElement: (element: any) => void;

	temp?: boolean

}

const ConstructorDisplay: FC<ConstructorDisplayProps> = ({ value, className, calculator, setDragElement, element, temp }) => {

	const { DeleteElement, AddElement } = useActions()

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



	const fontsize = value.toLocaleString().length > 8 && 'smallfontsize'

	return (
		<CalculatorCase
			className={'constructor-wrapper'}
			onDragOverHandler={onDragOverHandler}
			onDragLeaveHandler={onDragLeaveHandler}
			onDragStartHandler={onDragStartHandler}
			onDragEndHandler={onDragEndHandler}
			onDropHandler={onDropHandler}
			onDoubleClickHandler={onDoubleClickHandler}
		>
			<CalculatorViewer className={['constructor-display', fontsize, className].join(' ')}>{value}</CalculatorViewer>
		</CalculatorCase>
	)
}

export { ConstructorDisplay }