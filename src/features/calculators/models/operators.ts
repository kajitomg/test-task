import { Positions } from "./calculator";
import { Element, ElementTypes } from "./element";

export enum OperatorTypes {
	division = '/',
	multiplication = 'X',
	subtraction = '-',
	addition = '+',
}

export class Operator {
	private value: OperatorTypes;
	constructor(value: OperatorTypes) {
		this.value = value
	}
	setValue(value: OperatorTypes) {
		this.value = value;
	}
	getValue() {
		return this.value
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
	readonly examples: Operator[] = [];
	position: Exclude<Positions, Positions.first> = Positions.second

	constructor(position: Exclude<Positions, Positions.first>, active: boolean = true) {
		super(position, ElementTypes.Operators, active);
		this.setActive(true)
		this.initOperators();
	}
	public getPosition(): Exclude<Positions, Positions.first> {
		return this.position
	}

	private initOperators(): void {
		this.examples.push(new Division())
		this.examples.push(new Multiplication())
		this.examples.push(new Subtraction())
		this.examples.push(new Addition())
	}

}