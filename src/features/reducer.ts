
import { CalculatorRuntimeReducer } from './runtime/reducer'
import { CalculatorConstructorReducer } from './constructor/reducer'

export const featuresReducers = {
	calculatorRuntime: CalculatorRuntimeReducer,
	calculatorConstructor: CalculatorConstructorReducer,
}