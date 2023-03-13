import { Positions } from "./calculator";
import { Element, ElementTypes } from "./element";



export class Display extends Element {
	active: boolean = false;
	value: string = '0';

	constructor(position: Positions.first) {
		super(position, ElementTypes.Display);
	}
}