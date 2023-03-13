import { Element } from "../calculators";


export enum CalculatorActionTypes {
	REFRESH__CALCULATOR__CONSTRUCTOR__ELEMENT = 'REFRESH__CALCULATOR__CONSTRUCTOR__ELEMENT',
	REFRESH__CALCULATOR__CONSTRUCTOR__TEMP__ELEMENT = 'REFRESH__CALCULATOR__CONSTRUCTOR__TEMP__ELEMENT',
}

interface RefreshCalculatorConstructorElement {
	type: CalculatorActionTypes.REFRESH__CALCULATOR__CONSTRUCTOR__ELEMENT;
	payload: Element[];
}
interface RefreshCalculatorConstructorTempElement {
	type: CalculatorActionTypes.REFRESH__CALCULATOR__CONSTRUCTOR__TEMP__ELEMENT;
	payload: Element[];
}
export type CalculatorAction = RefreshCalculatorConstructorElement | RefreshCalculatorConstructorTempElement

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
		case CalculatorActionTypes.REFRESH__CALCULATOR__CONSTRUCTOR__ELEMENT:
			return {
				...state,
				constructorElements: action.payload
			};
		case CalculatorActionTypes.REFRESH__CALCULATOR__CONSTRUCTOR__TEMP__ELEMENT:
			return {
				...state,
				constructorTempElements: action.payload
			};
		default:
			return state;
	}

}