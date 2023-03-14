import React, { FC, useState } from 'react'
import { CalculatorCase } from '../../../../shared/ui/CalculatorCase'
import { CalculatorLine, Lines } from '../../../../shared/ui/CalculatorLine';
import { CalculatorViewer } from '../../../../shared/ui/CalculatorViewer'
import { Element } from '../../../calculators';
import { CalculatorConstructor, Modes } from '../../models';
import { ConstructorDraggableElementDisplay } from '../ConstructorDraggableElementDisplay';
import './ConstructorDisplay.scss'

interface ConstructorDisplayProps {

	value: string;

	className?: string;

	element: Element;

	setDragElement: (element: any) => void;

	mode: Modes;

	draggable: boolean;

	calculator: CalculatorConstructor

	calculatorTemp: CalculatorConstructor

	isTemp?: boolean

	draggedElement: Element | null;


}

const ConstructorDisplay: FC<ConstructorDisplayProps> = ({ value, className, setDragElement, element, mode, draggable = false, calculator, calculatorTemp, isTemp = false, draggedElement }) => {

	const [line, setLine] = useState<Lines>(Lines.none)

	const fontsize = value.toLocaleString().length > 8 && 'smallfontsize'

	const getIsDraggableElement = (): boolean => {
		return isTemp ? false : draggable
	}
	const getIsShadowClass = () => {
		return isTemp ? 'temp' : ''
	}


	return (
		<CalculatorCase
			className={['constructor-wrapper', className, getIsShadowClass()].join(' ')}
		>
			<CalculatorViewer className={['constructor-display', fontsize].join(' ')} draggable={getIsDraggableElement()}>{value}</CalculatorViewer>
			{isTemp && <CalculatorLine line={line} />}
			<ConstructorDraggableElementDisplay
				draggable={getIsDraggableElement()}
				calculator={calculator}
				calculatorTemp={calculatorTemp}
				draggedElement={draggedElement}
				element={element}
				isTemp={isTemp}
				setDragElement={setDragElement}
				setLine={setLine}
			/>
		</CalculatorCase>
	)
}

export { ConstructorDisplay }