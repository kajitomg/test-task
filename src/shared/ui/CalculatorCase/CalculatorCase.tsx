import React, { FC } from 'react'
import { Calculator, Element } from '../../../features';
import './CalculatorCase.scss'

interface CalculatorCaseProps {

	children: React.ReactNode;

	className?: string;

	onDragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void;

	onDragLeaveHandler: (event: React.DragEvent<HTMLDivElement>) => void;

	onDragStartHandler: (event: React.DragEvent<HTMLDivElement>) => void;

	onDragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void;

	onDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;

	onDoubleClickHandler: () => void;

}

const CalculatorCase: FC<CalculatorCaseProps> = ({ children, className, onDragOverHandler, onDragEndHandler, onDragLeaveHandler, onDragStartHandler, onDropHandler, onDoubleClickHandler }) => {

	return (
		<div
			className={['calculator__case', className].join(' ')}
			draggable={true}
			onDragOver={(event: React.DragEvent<HTMLDivElement>) => onDragOverHandler(event)}
			onDragLeave={(event: React.DragEvent<HTMLDivElement>) => onDragLeaveHandler(event)}
			onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStartHandler(event)}
			onDragEnd={(event: React.DragEvent<HTMLDivElement>) => onDragEndHandler(event)}
			onDrop={(event: React.DragEvent<HTMLDivElement>) => onDropHandler(event)}
			onDoubleClick={() => onDoubleClickHandler()}
		>{children}</div>
	)
}

export { CalculatorCase }