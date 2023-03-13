import React, { FC } from 'react'
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase'
import { CalculatorViewer } from '../../../../shared/ui/CalculatorViewer'
import { Element } from '../../../calculators';
import { useActions } from '../../../hooks';
import './ConstructorDisplay.scss'

interface ConstructorDisplayProps {

	value: string;

	className: string;

	element: Element;

	setDragElement: (element: any) => void;

}

const ConstructorDisplay: FC<ConstructorDisplayProps> = ({ value, className, setDragElement, element }) => {

	const { DeleteConstructorElement, AddConstructorElement } = useActions()

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



	const fontsize = value.toLocaleString().length > 8 && 'smallfontsize'

	return (
		<CalculatorCase
			className={['constructor-wrapper', className].join(' ')}
			onDragOverHandler={onDragOverHandler}
			onDragLeaveHandler={onDragLeaveHandler}
			onDragStartHandler={onDragStartHandler}
			onDragEndHandler={onDragEndHandler}
			onDropHandler={onDropHandler}
			onDoubleClickHandler={onDoubleClickHandler}
		>
			<CalculatorViewer className={['constructor-display', fontsize].join(' ')}>{value}</CalculatorViewer>
		</CalculatorCase>
	)
}

export { ConstructorDisplay }