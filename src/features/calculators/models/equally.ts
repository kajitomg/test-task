import { Positions } from "./calculator";
import { Element, ElementTypes } from "./element";


export class Equally extends Element {
	value: string = '=';
	active: boolean = false;

	constructor(position: Exclude<Positions, Positions.first>) {
		super(position, ElementTypes.Equally);
	}
	public setActive(boolean: boolean): void {
		this.active = boolean
	}

}