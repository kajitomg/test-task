import { Positions } from "./calculator";

export enum ElementTypes {
	Display = 'Display',
	Equally = 'Equally',
	Numbers = 'Numbers',
	Operators = 'Operators',
}

export class Element {
	public name: ElementTypes;
	private active: boolean;
	position: Positions;

	constructor(position: Positions, name: ElementTypes, active: boolean = true) {
		this.active = active;
		this.position = position
		this.name = name;
	}
	public setPosition(position: Positions) {
		this.position = position
	}
	public getPosition(): Positions {
		return this.position
	}
	public setActive(boolean: boolean) {
		this.active = boolean;
	}
	public getActive() {
		return this.active
	}
}