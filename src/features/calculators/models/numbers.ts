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
	private value: NumberTypes;

	constructor(value: NumberTypes) {
		this.value = value;
	}
	public getValue() {
		return this.value;
	}

}

export class Numbers extends Element {
	readonly examples: Number[] = [];
	position: Exclude<Positions, Positions.first> = Positions.third

	constructor(position: Exclude<Positions, Positions.first>, active: boolean = true) {
		super(position, ElementTypes.Numbers, active);
		this.setActive(true);
		this.initNumbers();
	}
	public getPosition(): Exclude<Positions, Positions.first> {
		return this.position
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

}