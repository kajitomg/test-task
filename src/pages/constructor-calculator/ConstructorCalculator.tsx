import React, { FC, useState } from 'react'
import { Element } from '../../features/calculators'
import { CalculatorModes } from '../../shared/ui/CalculatorModes'
import { ReactComponent as EyeIcon } from './../../temp/eye.svg'
import { ReactComponent as SelectorIcon } from './../../temp/selector.svg'
import { ReactComponent as AddIcon } from './../../temp/add.svg'
import { useTypedSelector } from '../../features/hooks'
import { CalculatorConstructor, ConstructorElements, Modes } from '../../features/constructor'
import { RuntimeElements } from '../../features/runtime'
import { ConstructorTempElements } from '../../features/constructor/components/ConstructorTempElements'
import { ConstructorDraggableArea } from '../../features/constructor/components/ConstructorDraggableArea'
import './ConstructorCalculator.scss'


interface ConstructorCalculatorProps {

}

const ConstructorCalculator: FC<ConstructorCalculatorProps> = ({ }) => {
	const { constructorTempElements } = useTypedSelector(state => state.calculatorConstructor)

	const [constructorCalculator] = useState(new CalculatorConstructor())
	const [constructorTempCalculator] = useState(new CalculatorConstructor())

	const [dragOver, setDragOver] = useState<boolean>(false)
	const [draggedElement, setDraggedElement] = useState<Element | null>(null)

	const [mode, setMode] = useState<Modes>(Modes.constructor)


	const setConstructorMode = () => {
		setMode(Modes.constructor)
	}
	const setRuntimeMode = () => {
		setMode(Modes.runtime)
	}
	const getIsRuntimeMode = (): boolean => {
		return mode === Modes.runtime ? true : false
	}
	const getIsConstructorMode = (): boolean => {
		return mode === Modes.constructor ? true : false
	}
	const getIsElementsInTempConstructor = (): boolean => {
		return constructorTempElements.length > 0
	}

	return (
		<section className={'calculator-page'}>
			<div className={'calculator-page__wrapper'}>
				<div className={'calculator-page__buttons buttons'}>
					<CalculatorModes className={'buttons__wrapper'}>
						<CalculatorModes.Item
							className={'buttons__button'}
							available={getIsRuntimeMode()}
							onClick={() => setRuntimeMode()}><SelectorIcon />Runtime</CalculatorModes.Item>

						<CalculatorModes.Item
							className={'buttons__button'}
							available={getIsConstructorMode()}
							onClick={() => setConstructorMode()}><EyeIcon />Constructor</CalculatorModes.Item>
					</CalculatorModes>
				</div>
				<div className={'calculator-page__calculators'} draggable={false}>
					<div className={'calculator-page__calculator-constructor calculator'}>
						<ConstructorElements
							draggedElement={draggedElement}
							calculatorTemp={constructorTempCalculator}
							calculator={constructorCalculator}
							mode={mode}
							setDraggedElement={setDraggedElement}
						/>
					</div>
					{
						getIsConstructorMode() && <ConstructorDraggableArea
							constructorCalculator={constructorCalculator}
							constructorTempCalculator={constructorTempCalculator}
							dragOver={dragOver}
							draggedElement={draggedElement}
							setDragOver={setDragOver}
							setDraggedElement={setDraggedElement}
							draggable={!getIsElementsInTempConstructor()}
						>
							<div
								className={['calculator-page__calculator-runtime', 'calculator', 'runtime', !getIsElementsInTempConstructor() ? 'empty' : '', dragOver ? 'dragover' : ''].join(' ')}
								draggable={false}
							>
								{
									getIsElementsInTempConstructor() &&
									<ConstructorTempElements
										draggedElement={draggedElement}
										calculatorTemp={constructorTempCalculator}
										calculator={constructorCalculator}
										mode={mode}
										setDraggedElement={setDraggedElement}
									/>
									||
									!getIsElementsInTempConstructor() &&
									<div className={'runtime__block'}>
										<AddIcon className={'runtime__icon'} />
										<h4 className={'runtime__text'}>Перетащите сюда<span>любой элемент из левой панели</span></h4>
									</div>
								}
							</div>
						</ConstructorDraggableArea>
					}
					{
						getIsRuntimeMode() &&
						<div className={['calculator-page__calculator-runtime', 'calculator', 'runtime'].join(' ')}
						>
							<RuntimeElements
								mode={mode}
								constructorTempCalculator={constructorTempCalculator}
							/>
						</div>
					}

				</div>
			</div>
		</section>
	)
}

export { ConstructorCalculator }