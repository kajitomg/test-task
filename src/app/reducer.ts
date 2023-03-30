import { combineReducers } from "redux"
import { featuresReducers } from '../features/reducer'

export const rootReducer = combineReducers({
	...featuresReducers
})

export type RootState = ReturnType<typeof rootReducer>