import { Dispatch } from "redux"
import { OperatorTypes } from "../calculators"
import { CalculatorRuntime } from "./models"
import { CalculatorAction, CalculatorActionTypes } from "./reducer"

export const AddSymbol = (calculator: CalculatorRuntime, value: string) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.addSymbol(value)
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.getValue()
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export const SetValue = (calculator: CalculatorRuntime, value: string) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.setValue(value)
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.getValue()
			})
		} catch (error) {
			console.log(error)
		}
	}
}
export const RenderValue = (calculator: CalculatorRuntime) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.getValue()
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export const RenderPreviewValue = (calculator: CalculatorRuntime) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.getPreviewValue()
			})
		} catch (error) {
			console.log(error)
		}
	}
}
export const ClearValue = (calculator: CalculatorRuntime) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.clearValue()
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.getValue()
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export const SetOperation = (calculator: CalculatorRuntime, operation: OperatorTypes) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.setOperation(operation)
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.getValue()
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export const RenderRuntimeElement = (calculator: CalculatorRuntime) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__ELEMENT,
				payload: calculator.getElements()
			})
		} catch (error) {
			console.log(error)
		}
	}
}
export const MakeOperation = (calculator: CalculatorRuntime) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			calculator.makeOperation()
			dispatch({
				type: CalculatorActionTypes.SET__CALCULATOR__VALUE,
				payload: calculator.getValue()
			})
		} catch (error) {
			console.log(error)
		}
	}
}