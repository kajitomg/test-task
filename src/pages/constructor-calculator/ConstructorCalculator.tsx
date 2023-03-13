import React, { FC, useEffect, useState } from 'react'
import { Calculator, Positions, ElementTypes, Element } from '../../features/calculators'
import { CalculatorModes } from '../../shared/ui/CalculatorModes'
import { ReactComponent as EyeIcon } from './../../temp/eye.svg'
import { ReactComponent as SelectorIcon } from './../../temp/selector.svg'
import { ReactComponent as AddIcon } from './../../temp/add.svg'
import { useActions, useTypedSelector } from '../../features/hooks'
import { CalculatorConstructor, ConstructorDisplay, ConstructorEqually, ConstructorNumbers, ConstructorOperators } from '../../features/constructor'
import { CalculatorRuntime, RuntimeDisplay, RuntimeEqually, RuntimeNumbers, RuntimeOperators } from '../../features/runtime'
import './ConstructorCalculator.scss'

enum Modes {
	constructor = 1,
	runtime = 2
}

interface ConstructorCalculatorProps {

}

const ConstructorCalculator: FC<ConstructorCalculatorProps> = ({ }) => {
	const { runtimeElements, runtimeValue } = useTypedSelector(state => state.calculatorRuntime)
	const { constructorElements, constructorTempElements } = useTypedSelector(state => state.calculatorConstructor)

	const [calculator, setCalculator] = useState<CalculatorRuntime | null>(null)
	const [constructorCalculator, setConstructorCalculator] = useState(new CalculatorConstructor())
	const [constructorTempCalculator, setConstructorTempCalculator] = useState(new CalculatorConstructor())

	const { AddConstructorElement, AddConstructorTempElement, RenderRuntimeElement } = useActions()

	const [dragOver, setDragOver] = useState<boolean>(false)
	const [draggedElement, setDraggedElement] = useState<Element | null>(null)

	const [mode, setMode] = useState<Modes>(Modes.constructor)

	useEffect(() => {
		constructorCalculator.initDisplay(Positions.first)
		constructorCalculator.initOperators(Positions.second)
		constructorCalculator.initNumbers(Positions.third)
		constructorCalculator.initEqually(Positions.fourth)
		AddConstructorElement(constructorCalculator, constructorCalculator.getDisplay())
		AddConstructorElement(constructorCalculator, constructorCalculator.getOperators())
		AddConstructorElement(constructorCalculator, constructorCalculator.getEqually())
		AddConstructorElement(constructorCalculator, constructorCalculator.getNumbers())
	}, [])

	console.log(constructorTempElements)
	useEffect(() => {
		if (mode === Modes.runtime) {
			setCalculator(new CalculatorRuntime(
				constructorTempCalculator.getDisplay()?.getPosition(),
				constructorTempCalculator.getOperators()?.getPosition(),
				constructorTempCalculator.getNumbers()?.getPosition(),
				constructorTempCalculator.getEqually()?.getPosition()
			))
		}
	}, [mode])


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

							(mode === Modes.constructor || element.getActive()) && element.name === ElementTypes.Display && <ConstructorDisplay
								key={element.name}
								setDragElement={setDraggedElement}
								element={element}
								value={constructorCalculator.getDisplay()?.getValue()}
								className={element.getActive() ? 'active' : ''} /> ||

							(mode === Modes.constructor || element.getActive()) && element.name === ElementTypes.Operators && <ConstructorOperators
								operators={constructorCalculator.getOperators()}
								key={element.name}
								setDragElement={setDraggedElement}
								element={element}
								className={element.getActive() ? 'active' : ''} /> ||

							(mode === Modes.constructor || element.getActive()) && element.name === ElementTypes.Numbers && <ConstructorNumbers
								numbers={constructorCalculator.getNumbers()}
								key={element.name}
								setDragElement={setDraggedElement}
								element={element}
								className={element.getActive() ? 'active' : ''} /> ||

							(mode === Modes.constructor || element.getActive()) && element.name === ElementTypes.Equally && <ConstructorEqually
								value={constructorCalculator.getEqually()?.getValue()}
								key={element.name}
								setDragElement={setDraggedElement}
								element={element}
								className={element.getActive() ? 'active' : ''} />
						)}
					</div>
					<div className={['calculator-page__calculator-runtime', 'calculator', 'runtime', constructorTempElements.length <= 0 && mode === Modes.constructor ? 'empty' : '', dragOver ? 'dragover' : ''].join(' ')}
						onDragOver={(event) => onDragOverHandler(event)}
						onDrop={(event) => onDropHandler(event, constructorCalculator, constructorTempCalculator)}
						onDragLeave={(event) => onDragLeaveHandler(event)}
						onDragEnd={(event) => onDragEndHandler(event)}

					>
						{


							constructorTempElements.length > 0 && mode === Modes.constructor &&
							constructorTempElements?.map((element) =>
								element.name === ElementTypes.Display && <ConstructorDisplay
									key={element.name}
									setDragElement={setDraggedElement}
									element={element}
									value={constructorTempCalculator.getDisplay()?.getValue()}
									className={element.getActive() ? 'active' : ''} /> ||

								element.name === ElementTypes.Operators && <ConstructorOperators
									operators={constructorTempCalculator.getOperators()}
									key={element.name}
									setDragElement={setDraggedElement}
									element={element}
									className={element.getActive() ? 'active' : ''} /> ||

								element.name === ElementTypes.Numbers && <ConstructorNumbers
									numbers={constructorTempCalculator.getNumbers()}
									key={element.name}
									setDragElement={setDraggedElement}
									element={element}
									className={element.getActive() ? 'active' : ''} /> ||

								element.name === ElementTypes.Equally && <ConstructorEqually
									value={constructorTempCalculator.getEqually()?.getValue()}
									key={element.name}
									setDragElement={setDraggedElement}
									element={element}
									className={element.getActive() ? 'active' : ''} />
							) ||
							runtimeElements.length > 0 && mode === Modes.runtime && calculator &&
							runtimeElements.map((element) =>
								element.name === ElementTypes.Display && <RuntimeDisplay key={element.name} /> ||
								element.name === ElementTypes.Operators && <RuntimeOperators calculator={calculator} operators={calculator.getOperators()} key={element.name} /> ||
								element.name === ElementTypes.Numbers && <RuntimeNumbers calculator={calculator} numbers={calculator.getNumbers()} key={element.name} /> ||
								element.name === ElementTypes.Equally && <RuntimeEqually calculator={calculator} equally={calculator.getEqually()} key={element.name} />
							) ||
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