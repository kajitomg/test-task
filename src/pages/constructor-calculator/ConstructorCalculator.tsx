import React, { FC, useEffect, useState } from 'react'
import { Positions, Element } from '../../features/calculators'
import { CalculatorModes } from '../../shared/ui/CalculatorModes'
import { ReactComponent as EyeIcon } from './../../temp/eye.svg'
import { ReactComponent as SelectorIcon } from './../../temp/selector.svg'
import { ReactComponent as AddIcon } from './../../temp/add.svg'
import { useActions, useTypedSelector } from '../../features/hooks'
import { CalculatorConstructor, ConstructorElements, Modes } from '../../features/constructor'
import { CalculatorRuntime, RuntimeElements } from '../../features/runtime'
import { ConstructorTempElements } from '../../features/constructor/components/ConstructorTempElements'
import './ConstructorCalculator.scss'


interface ConstructorCalculatorProps {

}

const ConstructorCalculator: FC<ConstructorCalculatorProps> = ({ }) => {
	const { runtimeElements } = useTypedSelector(state => state.calculatorRuntime)
	const { constructorTempElements } = useTypedSelector(state => state.calculatorConstructor)

	const [constructorCalculator, setConstructorCalculator] = useState(new CalculatorConstructor())
	const [constructorTempCalculator, setConstructorTempCalculator] = useState(new CalculatorConstructor())

	const { AddConstructorTempElement, DeleteConstructorTempElement } = useActions()

	const [dragOver, setDragOver] = useState<boolean>(false)
	const [draggedElement, setDraggedElement] = useState<Element | null>(null)

	const [mode, setMode] = useState<Modes>(Modes.constructor)


	const setConstructorMode = () => {
		setMode(Modes.constructor)
	}
	const setRuntimeMode = () => {
		setMode(Modes.runtime)
	}


	const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragOver(true)
	};
	const onDragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {

		setDragOver(false)

	};

	const onDropHandler = (event: React.DragEvent<HTMLDivElement>, constructorCalculator: CalculatorConstructor, constructorTempCalculator: CalculatorConstructor) => {

		event.preventDefault();

		if (dragOver) {
			if (draggedElement) {
				AddConstructorTempElement(constructorTempCalculator, draggedElement)
				constructorCalculator.getElements().forEach((element) => {
					if (element.name === draggedElement.name) {
						element.setActive(false)
					}
				})
			}
			setDragOver(false)
			setDraggedElement(null)
		}


	};

	const onDragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {

		if (!dragOver) {
			if (draggedElement) {
				DeleteConstructorTempElement(constructorTempCalculator, draggedElement)
				constructorCalculator.getElements().forEach((element) => {
					if (element.name === draggedElement.name) {
						element.setActive(true)
					}
				})
			}
		}

		setDragOver(false)
		setDraggedElement(null)

	};

	return (
		<section className={'calculator-page'}>
			<div className={'calculator-page__wrapper'}>
				<div className={'calculator-page__buttons buttons'}>
					<CalculatorModes className={'buttons__wrapper'}>
						<CalculatorModes.Item
							className={'buttons__button'}
							available={mode === Modes.runtime ? true : false}
							onClick={() => setRuntimeMode()}><SelectorIcon />Runtime</CalculatorModes.Item>

						<CalculatorModes.Item
							className={'buttons__button'}
							available={mode === Modes.constructor ? true : false}
							onClick={() => setConstructorMode()}><EyeIcon />Constructor</CalculatorModes.Item>
					</CalculatorModes>
				</div>
				<div className={'calculator-page__calculators'}>
					<div className={'calculator-page__calculator-constructor calculator'}>
						<ConstructorElements
							draggedElement={draggedElement}
							calculatorTemp={constructorTempCalculator}
							calculator={constructorCalculator}
							mode={mode}
							setDraggedElement={setDraggedElement}
						/>
					</div>
					<div className={['calculator-page__calculator-runtime', 'calculator', 'runtime', constructorTempElements.length <= 0 && mode === Modes.constructor ? 'empty' : '', dragOver ? 'dragover' : ''].join(' ')}
						onDragOver={(event) => onDragOverHandler(event)}
						onDrop={(event) => onDropHandler(event, constructorCalculator, constructorTempCalculator)}
						onDragLeave={(event) => onDragLeaveHandler(event)}
						onDragEnd={(event) => onDragEndHandler(event)}

					>
						{
							constructorTempElements.length > 0 && mode === Modes.constructor &&
							<ConstructorTempElements
								draggedElement={draggedElement}
								calculatorTemp={constructorTempCalculator}
								calculator={constructorCalculator}
								mode={mode}
								setDraggedElement={setDraggedElement}
							/>
							||
							mode === Modes.runtime &&
							<RuntimeElements
								mode={mode}
								constructorTempCalculator={constructorTempCalculator}
							/>
							||
							constructorTempElements.length === 0 && mode === Modes.constructor &&
							<div className={'runtime__block'}>
								<AddIcon className={'runtime__icon'} />
								<h4 className={'runtime__text'}>Перетащите сюда<span>любой элемент из левой панели</span></h4>
							</div>
						}
					</div>
				</div>
			</div>
		</section>
	)
}

export { ConstructorCalculator }