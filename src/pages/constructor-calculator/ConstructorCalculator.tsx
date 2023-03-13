import React, { FC, useEffect, useState } from 'react'
import { useActions, useTypedSelector } from '../../features'
import { Calculator, Positions, ConstructorDisplay, ConstructorEqually, ConstructorNumbers, ConstructorOperators, RuntimeDisplay, RuntimeEqually, RuntimeNumbers, RuntimeOperators, ElementTypes, Element } from '../../features/calculators'
import { CalculatorModes } from '../../shared/ui/CalculatorModes'
import { ReactComponent as EyeIcon } from './../../temp/eye.svg'
import { ReactComponent as SelectorIcon } from './../../temp/selector.svg'
import { ReactComponent as AddIcon } from './../../temp/add.svg'
import './ConstructorCalculator.scss'

enum Modes {
	constructor = 1,
	runtime = 2
}

interface ConstructorCalculatorProps {

}

const ConstructorCalculator: FC<ConstructorCalculatorProps> = ({ }) => {
	const { elements, value, constructorElements, constructorElementsTemp } = useTypedSelector(state => state.calculator)

	const { AddElement, ShiftElement, AddConstructorElement, AddConstructorTempElement } = useActions()


	const [calculator, setCalculator] = useState(new Calculator())
	const [constructorCalculator, setConstructorCalculator] = useState(new Calculator())
	const [constructorCalculatorTemp, setConstructorCalculatorTemp] = useState(new Calculator())

	const [dragOver, setDragOver] = useState<boolean>(false)
	const [draggedElement, setDraggedElement] = useState<Element | null>(null)

	const [mode, setMode] = useState<Modes>(Modes.constructor)

	useEffect(() => {
		constructorCalculator.initDisplay(Positions.first)
		constructorCalculator.initOperators(Positions.second)
		constructorCalculator.initNumbers(Positions.third)
		constructorCalculator.initEqually(Positions.fourth)
		AddConstructorElement(constructorCalculator, constructorCalculator.display)
		AddConstructorElement(constructorCalculator, constructorCalculator.operators)
		AddConstructorElement(constructorCalculator, constructorCalculator.equally)
		AddConstructorElement(constructorCalculator, constructorCalculator.numbers)
	}, [])

	useEffect(() => {
		calculator.initDisplay(Positions.first)
		calculator.initOperators(Positions.second)
		calculator.initNumbers(Positions.third)
		calculator.initEqually(Positions.fourth)
		// AddElement(calculator, calculator.display, true)
		// AddElement(calculator, calculator.operators, true)
		// AddElement(calculator, calculator.equally, true)
		// AddElement(calculator, calculator.numbers, true)
	}, [])


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

	const onDragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {

	};
	const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (draggedElement) {
			AddElement(calculator, draggedElement)
			AddConstructorTempElement(calculator, draggedElement)
		}

	};

	const onDragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {

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
						{constructorElements?.map((element) =>
							element.name === ElementTypes.Display && <ConstructorDisplay
								key={element.name}
								setDragElement={setDraggedElement}
								element={element}
								calculator={constructorCalculator}
								value={constructorCalculator.display.value}
								className={element.active ? 'active' : ''} /> ||

							element.name === ElementTypes.Operators && <ConstructorOperators
								operators={constructorCalculator.operators}
								key={element.name}
								setDragElement={setDraggedElement}
								element={element}
								calculator={constructorCalculator}
								className={element.active ? 'active' : ''} /> ||

							element.name === ElementTypes.Numbers && <ConstructorNumbers
								numbers={constructorCalculator.numbers}
								key={element.name}
								setDragElement={setDraggedElement}
								element={element}
								calculator={constructorCalculator}
								className={element.active ? 'active' : ''} /> ||

							element.name === ElementTypes.Equally && <ConstructorEqually
								value={constructorCalculator.equally.value}
								key={element.name}
								setDragElement={setDraggedElement}
								element={element}
								calculator={constructorCalculator}
								className={element.active ? 'active' : ''} />
						)}
					</div>
					<div className={['calculator-page__calculator-runtime', 'calculator', 'runtime', constructorElementsTemp.length <= 0 ? 'empty' : '', dragOver ? 'dragover' : ''].join(' ')}
						onDragOver={(event) => onDragOverHandler(event)}
						onDrop={(event) => onDropHandler(event)}
						onDragLeave={(event) => onDragLeaveHandler(event)}
						onDragEnd={(event) => onDragEndHandler(event)}

					>
						{
							constructorElementsTemp.length > 0
								?
								mode === Modes.constructor
									?
									constructorElementsTemp?.map((element) =>
										element.name === ElementTypes.Display && <ConstructorDisplay
											key={element.name}
											temp={true}
											setDragElement={setDraggedElement}
											element={element}
											calculator={constructorCalculatorTemp}
											value={constructorCalculatorTemp.display.value}
											className={element.active ? 'active' : ''} /> ||

										element.name === ElementTypes.Operators && <ConstructorOperators
											operators={constructorCalculatorTemp.operators}
											key={element.name}
											temp={true}
											setDragElement={setDraggedElement}
											element={element}
											calculator={constructorCalculatorTemp}
											className={element.active ? 'active' : ''} /> ||

										element.name === ElementTypes.Numbers && <ConstructorNumbers
											numbers={constructorCalculatorTemp.numbers}
											key={element.name}
											temp={true}
											setDragElement={setDraggedElement}
											element={element}
											calculator={constructorCalculatorTemp}
											className={element.active ? 'active' : ''} /> ||

										element.name === ElementTypes.Equally && <ConstructorEqually
											value={constructorCalculatorTemp.equally.value}
											key={element.name}
											temp={true}
											setDragElement={setDraggedElement}
											element={element}
											calculator={constructorCalculatorTemp}
											className={element.active ? 'active' : ''} />
									)
									:
									elements.map((element) =>
										element.name === ElementTypes.Display && <RuntimeDisplay key={element.name} /> ||
										element.name === ElementTypes.Operators && <RuntimeOperators calculator={calculator} operators={calculator.operators} key={element.name} /> ||
										element.name === ElementTypes.Numbers && <RuntimeNumbers calculator={calculator} numbers={calculator.numbers} key={element.name} /> ||
										element.name === ElementTypes.Equally && <RuntimeEqually calculator={calculator} equally={calculator.equally} key={element.name} />
									)
								:
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