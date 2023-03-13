import React, { FC } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton';
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase';
import { Element, Operators } from '../../../calculators';
import { useActions } from '../../../hooks';
import './ConstructorOperators.scss'

interface ConstructorOperatorsProps {

	operators: Operators;

	className: string;

	element: Element;

	setDragElement: (element: any) => void;

}

const ConstructorOperators: FC<ConstructorOperatorsProps> = ({ operators, className, setDragElement, element }) => {

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
			className={['constructor-operators', className].join(' ')}
			onDragEndHandler={onDragEndHandler}
			onDragLeaveHandler={onDragLeaveHandler}
			onDragOverHandler={onDragOverHandler}
			onDragStartHandler={onDragStartHandler}
			onDropHandler={onDropHandler}
			onDoubleClickHandler={onDoubleClickHandler}
		>
			{operators.examples.map((example) =>
				<CalculatorButton

					key={example.getValue()}
					className={['constructor-operator'].join(' ')}

				>{example.getValue()}</CalculatorButton>
			)}
		</CalculatorCase>
	)
}

export { ConstructorOperators }