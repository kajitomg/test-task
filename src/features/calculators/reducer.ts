import { Element } from "./models/element";


export enum CalculatorActionTypes {
	SET__CALCULATOR__VALUE = 'SET__CALCULATOR__VALUE',
	REFRESH__CALCULATOR__VALUE = 'REFRESH__CALCULATOR__VALUE',
	REFRESH__CALCULATOR__ELEMENT = 'REFRESH__CALCULATOR__ELEMENT',
	REFRESH__CALCULATOR__CONSTUCTOR__ELEMENT = 'REFRESH__CALCULATOR__CONSTUCTOR__ELEMENT',
	REFRESH__CALCULATOR__CONSTUCTOR__TEMP__ELEMENT = 'REFRESH__CALCULATOR__CONSTUCTOR__TEMP__ELEMENT'
}

interface SetCalculatorValue {
	type: CalculatorActionTypes.SET__CALCULATOR__VALUE;
	payload: string;
}
interface RefreshCalculatorValue {
	type: CalculatorActionTypes.REFRESH__CALCULATOR__VALUE;
}
interface RefreshCalculatorElement {
	type: CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT;
	payload: Element[];
}
interface RefreshCalculatorConstructorElement {
	type: CalculatorActionTypes.REFRESH__CALCULATOR__CONSTUCTOR__ELEMENT;
	payload: Element[];
}
export type CalculatorAction = SetCalculatorValue | RefreshCalculatorValue | RefreshCalculatorElement | RefreshCalculatorConstructorElement

interface CalculatorState {
	value: string | null;
	elements: Element[];
	constructorElements: Element[];
}


const defaultState: CalculatorState = {
	value: null,
	elements: [],
	constructorElements: [],
}


export const CalculatorReducer = (state = defaultState, action: CalculatorAction): CalculatorState => {

	switch (action.type) {
		case CalculatorActionTypes.SET__CALCULATOR__VALUE:
			return {
				...state,
				value: action.payload
			};
		case CalculatorActionTypes.REFRESH__CALCULATOR__VALUE:
			return {
				...state,
				value: null
			};
		case CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT:
			return {
				...state,
				elements: action.payload
			};
		case CalculatorActionTypes.REFRESH__CALCULATOR__CONSTUCTOR__ELEMENT:
			return {
				...state,
				constructorElements: action.payload
			};
		default:
			return state;
	}

}