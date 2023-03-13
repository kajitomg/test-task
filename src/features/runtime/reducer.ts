import { Element } from "../calculators";


export enum CalculatorActionTypes {
	SET__CALCULATOR__VALUE = 'SET__CALCULATOR__VALUE',
	REFRESH__CALCULATOR__VALUE = 'REFRESH__CALCULATOR__VALUE',
	REFRESH__CALCULATOR__ELEMENT = 'REFRESH__CALCULATOR__ELEMENT',
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
export type CalculatorAction = SetCalculatorValue | RefreshCalculatorValue | RefreshCalculatorElement

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
		case CalculatorActionTypes.REFRESH__CALCULATOR__VALUE:
			return {
				...state,
				runtimeValue: null
			};
		case CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT:
			return {
				...state,
				runtimeElements: action.payload
			};
		default:
			return state;
	}

}