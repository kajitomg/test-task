import { combineReducers } from "redux"
import { CalculatorReducer } from '../features'

export const rootReducer = combineReducers({
	calculator: CalculatorReducer,

})

export type RootState = ReturnType<typeof rootReducer>