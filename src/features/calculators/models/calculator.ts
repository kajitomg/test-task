import { Display } from "./display";
import { Equally } from "./equally";
import { Numbers } from "./numbers";
import { Operators } from "./operators";
import { Element } from "./element";

export enum Positions {
	first = 1,
	second = 2,
	third = 3,
	fourth = 4,
}

export class Calculator {
	private elements: Element[] = [];
	private display: Display;
	private operators: Operators;
	private numbers: Numbers;
	private equally: Equally;

	constructor() {
		this.display = new Display(Positions.first)
		this.operators = new Operators(Positions.second)
		this.numbers = new Numbers(Positions.third)
		this.equally = new Equally(Positions.fourth)
	}


	public addElement(element?: Element) {
		if (element) {
			this.elements[element.getPosition() - 1] = element
		}
	}
	public addElements(elements: Element[]) {
		this.elements = elements
	}
	public getElements() {
		return this.elements
	}


	public initDisplay(position: Positions.first, active: boolean = true) {
		this.display = new Display(position, active)
	}
	public initNumbers(position: Exclude<Positions, Positions.first>, active: boolean = true) {
		this.numbers = new Numbers(position, active)

	}
	public initOperators(position: Exclude<Positions, Positions.first>, active: boolean = true) {
		this.operators = new Operators(position, active)

	}
	public initEqually(position: Exclude<Positions, Positions.first>, active: boolean = true) {
		this.equally = new Equally(position, active)
	}
	public getDisplay() {
		return this.display
	}
	public getNumbers() {
		return this.numbers

	}
	public getOperators() {
		return this.operators

	}
	public getEqually() {
		return this.equally
	}
}