import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../pages";
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as calculatorAction from './calculators/action'


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector


const actions = {
	...calculatorAction
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}