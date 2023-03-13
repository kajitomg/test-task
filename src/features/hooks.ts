import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../pages";
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as constructorAction from './constructor/action'
import * as runtimeAction from './runtime/action'


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector


const actions = {
	...constructorAction,
	...runtimeAction
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}