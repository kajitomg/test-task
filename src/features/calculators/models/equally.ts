import { Positions } from "./calculator";
import { Element, ElementTypes } from "./element";


export class Equally extends Element {
	private value: string = '=';
	position: Exclude<Positions, Positions.first> = Positions.fourth

	constructor(position: Exclude<Positions, Positions.first>, active: boolean = true) {
		super(position, ElementTypes.Equally, active);
		this.setActive(true)
	}
	public getPosition(): Exclude<Positions, Positions.first> {
		return this.position
	}

	public getValue() {
		return this.value
	}

}