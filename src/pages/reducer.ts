import { combineReducers } from "redux"
import { CalculatorRuntimeReducer } from '../features/runtime/reducer'
import { CalculatorConstructorReducer } from '../features/constructor/reducer'

export const rootReducer = combineReducers({
	calculatorRuntime: CalculatorRuntimeReducer,
	calculatorConstructor: CalculatorConstructorReducer,

})

export type RootState = ReturnType<typeof rootReducer>