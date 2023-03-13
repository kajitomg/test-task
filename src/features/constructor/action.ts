import { Dispatch } from "redux"
import { Element, Positions } from "../calculators"
import { CalculatorConstructor } from "./models"
import { CalculatorAction, CalculatorActionTypes } from "./reducer"



export const AddConstructorElement = (calculator: CalculatorConstructor, element: Element | null) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			if (element) {
				calculator.addElement(element)
				dispatch({
					type: CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT,
					payload: calculator.getElements()
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}

export const DeleteConstructorElement = (calculator: CalculatorConstructor, element: Element | null) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			if (element) {
				calculator.deleteElement(element)
				dispatch({
					type: CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT,
					payload: calculator.getElements()
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}

export const ShiftConstructorElement = (calculator: CalculatorConstructor, element: Element | null, position: Positions) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			if (element) {
				calculator.shiftElement(element, position)
				dispatch({
					type: CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT,
					payload: calculator.getElements()
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}
export const AddConstructorTempElement = (calculator: CalculatorConstructor, element: Element | null) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			if (element) {
				calculator.addElement(element)
				dispatch({
					type: CalculatorActionTypes.REFRESH__CALCULATOR__TEMP__ELEMENT,
					payload: calculator.getElements()
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}

export const DeleteConstructorTempElement = (calculator: CalculatorConstructor, element: Element | null) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			if (element) {
				calculator.deleteElement(element)
				dispatch({
					type: CalculatorActionTypes.REFRESH__CALCULATOR__TEMP__ELEMENT,
					payload: calculator.getElements()
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}

export const ShiftConstructorTempElement = (calculator: CalculatorConstructor, element: Element | null, position: Positions) => {
	return (dispatch: Dispatch<CalculatorAction>) => {
		try {
			if (element) {
				calculator.shiftElement(element, position)
				dispatch({
					type: CalculatorActionTypes.REFRESH__CALCULATOR__TEMP__ELEMENT,
					payload: calculator.getElements()
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}

