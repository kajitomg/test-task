import { Dispatch } from "redux"
import { Calculator, Equally, Number, NumberTypes, Operator, OperatorTypes, Positions } from "./models"
import { Element } from "./models/element"
import { CalculatorAction, CalculatorActionTypes } from "./reducer"

export const AddSymbol = (calculator: Calculator, value: string) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.addSymbol(value)
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.value
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export const SetValue = (calculator: Calculator, value: string) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.setValue(value)
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.value
			})
		} catch (error) {
			console.log(error)
		}
	}
}
export const RenderValue = (calculator: Calculator) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.value
			})
		} catch (error) {
			console.log(error)
		}
	}
}
export const AddConstructorElement = (calculator: Calculator, element: Element) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.addElement(element)
			dispatch({
				type: CalculatorActionTypes.REFRESH__CALCULATOR__CONSTUCTOR__ELEMENT,
				payload: calculator.elements
			})
		} catch (error) {
			console.log(error)
		}
	}
}
export const AddConstructorTempElement = (calculator: Calculator, element: Element) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.addElement(element)
			dispatch({
				type: CalculatorActionTypes.REFRESH__CALCULATOR__CONSTUCTOR__TEMP__ELEMENT,
				payload: calculator.elements
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export const AddElement = (calculator: Calculator, element: Element, render?: boolean) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.addElement(element)
			if (render) {
				dispatch({
					type: CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT,
					payload: calculator.elements
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}
export const DeleteElement = (calculator: Calculator, element: Element, render?: boolean) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.deleteElement(element)
			if (render) {
				dispatch({
					type: CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT,
					payload: calculator.elements
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}

export const ShiftElement = (calculator: Calculator, element: Element, position: Positions) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.shiftElement(element, position)
			dispatch({
				type: CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT,
				payload: calculator.elements
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export const RenderPreviewValue = (calculator: Calculator) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.previewValue
			})
		} catch (error) {
			console.log(error)
		}
	}
}
export const ClearValue = (calculator: Calculator) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.clearValue()
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.value
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export const SetOperation = (calculator: Calculator, operation: OperatorTypes) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.setOperation(operation)
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.value
			})
		} catch (error) {
			console.log(error)
		}
	}
}
export const MakeOperation = (calculator: Calculator) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.MakeOperation()
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.value
			})
		} catch (error) {
			console.log(error)
		}
	}
}