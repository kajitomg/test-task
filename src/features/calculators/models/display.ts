import { Positions } from "./calculator";
import { Element, ElementTypes } from "./element";



export class Display extends Element {
	private value: string = '0';
	position: Positions.first = Positions.first

	constructor(position: Positions.first, active: boolean = true) {
		super(position, ElementTypes.Display, active);
		this.setActive(true);
	}
	public getPosition(): Positions.first {
		return this.position
	}
	getValue() {
		return this.value
	}
	setValue(value: string) {
		return this.value = value
	}
}