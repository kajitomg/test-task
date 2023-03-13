import { Element } from "../calculators";


export enum CalculatorActionTypes {
	SET__CALCULATOR__VALUE = 'SET__CALCULATOR__VALUE',
	CLEAR__CALCULATOR__VALUE = 'CLEAR__CALCULATOR__VALUE',
	SET__CALCULATOR__ELEMENT = 'SET__CALCULATOR__ELEMENT',
}

interface SetCalculatorValue {
	type: CalculatorActionTypes.SET__CALCULATOR__VALUE;
	payload: string;
}
interface ClearCalculatorValue {
	type: CalculatorActionTypes.CLEAR__CALCULATOR__VALUE;
}
interface SetCalculatorElement {
	type: CalculatorActionTypes.SET__CALCULATOR__ELEMENT;
	payload: Element[];
}
export type CalculatorAction = SetCalculatorValue | ClearCalculatorValue | SetCalculatorElement

interface CalculatorState {
	runtimeValue: string | null;
	runtimeElements: Element[];
}


const defaultState: CalculatorState = {
	runtimeValue: null,
	runtimeElements: [],
}


export const CalculatorRuntimeReducer = (state = defaultState, action: CalculatorAction): CalculatorState => {

	switch (action.type) {
		case CalculatorActionTypes.SET__CALCULATOR__VALUE:
			return {
				...state,
				runtimeValue: action.payload
			};
		case CalculatorActionTypes.CLEAR__CALCULATOR__VALUE:
			return {
				...state,
				runtimeValue: null
			};
		case CalculatorActionTypes.SET__CALCULATOR__ELEMENT:
			return {
				...state,
				runtimeElements: action.payload
			};
		default:
			return state;
	}

}