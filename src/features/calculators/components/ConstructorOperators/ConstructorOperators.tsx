import React, { FC } from 'react'
import { CalculatorButton } from '../../../../shared/ui/CalculatorButton';
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase';
import { useActions } from '../../../hooks';
import { Calculator, Element, Operators } from '../../models'
import './ConstructorOperators.scss'

interface ConstructorOperatorsProps {

	operators: Operators;

	className: string;

	calculator: Calculator;

	element: Element;

	setDragElement: (element: any) => void;

	temp?: boolean

}

const ConstructorOperators: FC<ConstructorOperatorsProps> = ({ operators, className, calculator, setDragElement, element, temp }) => {

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
			className={'constructor-operators'}
			onDragEndHandler={onDragEndHandler}
			onDragLeaveHandler={onDragLeaveHandler}
			onDragOverHandler={onDragOverHandler}
			onDragStartHandler={onDragStartHandler}
			onDropHandler={onDropHandler}
			onDoubleClickHandler={onDoubleClickHandler}
		>
			{operators.examples.map((example) =>
				<CalculatorButton

					key={example.value}
					className={['constructor-operator', className].join(' ')}

				>{example.value}</CalculatorButton>
			)}
		</CalculatorCase>
	)
}

export { ConstructorOperators }