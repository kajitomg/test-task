import { Positions } from "./calculator";
import { Element, ElementTypes } from "./element";

export enum OperatorTypes {
	division = '/',
	multiplication = 'X',
	subtraction = '-',
	addition = '+',
}

export class Operator {
	value: OperatorTypes;
	constructor(value: OperatorTypes) {
		this.value = value
	}
	setValue(value: OperatorTypes) {
		this.value = value;
	}
}

class Division extends Operator {

	constructor() {
		super(OperatorTypes.division);
	}
}
class Multiplication extends Operator {

	constructor() {
		super(OperatorTypes.multiplication);
	}
}
class Subtraction extends Operator {

	constructor() {
		super(OperatorTypes.subtraction);
	}

}
class Addition extends Operator {

	constructor() {
		super(OperatorTypes.addition);
	}

}

export class Operators extends Element {
	active: boolean = false;
	readonly examples: Operator[] = [];

	constructor(position: Exclude<Positions, Positions.first>) {
		super(position, ElementTypes.Operators)
		this.initOperators();
	}

	private initOperators(): void {
		this.examples.push(new Division())
		this.examples.push(new Multiplication())
		this.examples.push(new Subtraction())
		this.examples.push(new Addition())
	}
	public setActive(boolean: boolean): void {
		this.active = boolean
	}

}