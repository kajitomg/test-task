import { Positions } from "./calculator";
import { Element, ElementTypes } from "./element";

export enum NumberTypes {
	One = '1',
	Two = '2',
	Three = '3',
	Four = '4',
	Five = '5',
	Six = '6',
	Seven = '7',
	Eight = '8',
	Nine = '9',
	Zero = '0',
	Splitter = ',',
}

export class Number {
	value: NumberTypes;

	constructor(value: NumberTypes) {
		this.value = value;
	}

}

export class Numbers extends Element {
	active: boolean = false;
	readonly examples: Number[] = [];

	constructor(position: Exclude<Positions, Positions.first>) {
		super(position, ElementTypes.Numbers);
		this.initNumbers();
	}

	private initNumbers(): void {
		this.examples.push(new Number(NumberTypes.One))
		this.examples.push(new Number(NumberTypes.Two))
		this.examples.push(new Number(NumberTypes.Three))
		this.examples.push(new Number(NumberTypes.Four))
		this.examples.push(new Number(NumberTypes.Five))
		this.examples.push(new Number(NumberTypes.Six))
		this.examples.push(new Number(NumberTypes.Seven))
		this.examples.push(new Number(NumberTypes.Eight))
		this.examples.push(new Number(NumberTypes.Nine))
		this.examples.push(new Number(NumberTypes.Zero))
		this.examples.push(new Number(NumberTypes.Splitter))
	}

	public setActive(boolean: boolean): void {
		this.active = boolean
	}

}