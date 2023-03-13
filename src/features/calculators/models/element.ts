import { Positions } from "./calculator";

export enum ElementTypes {
	Display = 'Display',
	Equally = 'Equally',
	Numbers = 'Numbers',
	Operators = 'Operators',
}

export class Element {
	name: ElementTypes;
	active: boolean = true;
	private position: Positions;

	constructor(position: Positions, name: ElementTypes) {
		this.position = position
		this.name = name;
	}
	public setPosition(position: Positions) {
		this.position = position
	}
	public setActive(boolean: boolean) {
		this.active = boolean;
	}
	public getPosition(): Positions {
		return this.position
	}
}