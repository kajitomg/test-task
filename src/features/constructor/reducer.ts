import { Element } from "../calculators";


export enum CalculatorActionTypes {
	REFRESH__CALCULATOR__ELEMENT = 'REFRESH__CALCULATOR__ELEMENT',
	REFRESH__CALCULATOR__TEMP__ELEMENT = 'REFRESH__CALCULATOR__TEMP__ELEMENT',
}

interface RefreshCalculatorElement {
	type: CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT;
	payload: Element[];
}
interface RefreshCalculatorTempElement {
	type: CalculatorActionTypes.REFRESH__CALCULATOR__TEMP__ELEMENT;
	payload: Element[];
}
export type CalculatorAction = RefreshCalculatorElement | RefreshCalculatorTempElement

interface CalculatorState {
	constructorElements: Element[];
	constructorTempElements: Element[];
}


const defaultState: CalculatorState = {
	constructorElements: [],
	constructorTempElements: []
}

export const CalculatorConstructorReducer = (state = defaultState, action: CalculatorAction): CalculatorState => {

	switch (action.type) {
		case CalculatorActionTypes.REFRESH__CALCULATOR__ELEMENT:
			return {
				...state,
				constructorElements: action.payload
			};
		case CalculatorActionTypes.REFRESH__CALCULATOR__TEMP__ELEMENT:
			return {
				...state,
				constructorTempElements: action.payload
			};
		default:
			return state;
	}

}