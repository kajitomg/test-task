import { Display } from "./display";
import { Equally } from "./equally";
import { Numbers, NumberTypes } from "./numbers";
import { Operators, OperatorTypes } from "./operators";
import { Element, ElementTypes } from "./element";

export enum Positions {
	first = 1,
	second = 2,
	third = 3,
	fourth = 4,
}

enum shiftDiretions {
	side = 0,
	up = 1,
	down = -1,
}


export class Calculator {
	value: string = '';
	previewValue: string = '';
	operation: OperatorTypes | null = null;
	elements: Element[] = [];
	display: Display;
	operators: Operators;
	numbers: Numbers;
	equally: Equally;
	private active: boolean = false;

	constructor() {
		this.display = new Display(Positions.first)
		this.numbers = new Numbers(Positions.second)
		this.operators = new Operators(Positions.third)
		this.equally = new Equally(Positions.fourth)

	}

	public addSymbol(value: string) {
		if (this.checkSplitter(this.value) && this.isSplitter(value)) {
			return
		}
		if (this.value.length >= 16) {
			return
		}
		this.value = [this.value, value].join('')
		if (this.value.length >= 15) {
			this.value = this.makeString(Math.ceil(this.makeNumber(this.value) * (10 ** 15)) / (10 ** 15))
		}
	}

	public addElement(element: Element, position?: Positions) {
		this.elements[element.getPosition() - 1] = element
		if (position) {
			this.shiftElement(element, position)
		}
	}
	public deleteElement(element: Element) {
		this.elements.splice(element.getPosition() - 1, 1)
	}

	private shiftDirection(element: Element, position: Positions): shiftDiretions {
		let shiftDirection: shiftDiretions = shiftDiretions.side
		if (element.getPosition() < position) {
			shiftDirection = shiftDiretions.down
		}
		if (element.getPosition() > position) {
			shiftDirection = shiftDiretions.up
		}
		if (element.getPosition() === position) {
			shiftDirection = shiftDiretions.side
		}

		return shiftDirection
	}

	public shiftElement(element: Element, position: Positions) {

		let shiftDirection = this.shiftDirection(element, position)

		if (element.name !== ElementTypes.Display && position === Positions.first) {
			this.elements.splice(element.getPosition() - 1, 1)
			return this.elements.splice(Positions.second - 1, 0, element)
		}
		if (element.name === ElementTypes.Display) {
			return
		}

		this.elements[position - 1].setPosition(position + shiftDirection)
		this.elements.splice(element.getPosition() - 1, 1)
		element.setPosition(position)
		this.elements.splice(position - 1, 0, element)
	}

	public setValue(value: string) {
		this.display.value = value
		this.value = value
	}

	public clearValue(): void {
		this.display.value = '';
		this.value = '';
	}

	private isSplitter(string: string): boolean {
		if (string === NumberTypes.Splitter || string === '.') {
			return true
		}
		return false

	}
	private checkSplitter(string: string): boolean {
		for (var i = 0; i < string.length; i++) {
			if (this.isSplitter(string.charAt(i))) {
				return true
			}
		}
		return false
	}

	private makeNumber(string: string): number {
		let tempvalue = ''
		for (var i = 0; i < string.length; i++) {
			if (this.isSplitter(string.charAt(i))) {
				tempvalue += '.'
			}
			if (!this.isSplitter(string.charAt(i))) {
				tempvalue += string.charAt(i)
			}
		}
		return +tempvalue
	}

	private makeString(number: number): string {
		let tempvalue = ''
		let string = (number).toString()
		for (var i = 0; i < string.length; i++) {
			if (this.isSplitter(string.charAt(i))) {
				tempvalue += ','
			}
			if (!this.isSplitter(string.charAt(i))) {
				tempvalue += string.charAt(i)
			}
		}
		return tempvalue
	}
	public setPreviewValue(value: string): void {
		this.previewValue = value
	}

	public MakeOperation(): void {
		const firstMember = this.makeNumber(this.previewValue)
		const secondMember = this.makeNumber(this.value)

		if (!firstMember) {
			this.setPreviewValue(this.value)
			return this.setValue('')
		}
		if (!secondMember) {
			this.setPreviewValue(this.previewValue)
			return this.setValue('')
		}

		if (firstMember && secondMember) {
			if (this.operation === OperatorTypes.division) {
				this.setPreviewValue(this.makeString(firstMember / secondMember))
				return this.setValue('')
			}
			if (this.operation === OperatorTypes.multiplication) {
				this.setPreviewValue(this.makeString(firstMember * secondMember))
				return this.setValue('')
			}
			if (this.operation === OperatorTypes.addition) {
				this.setPreviewValue(this.makeString(firstMember + secondMember))
				return this.setValue('')
			}
			if (this.operation === OperatorTypes.subtraction) {
				this.setPreviewValue(this.makeString(firstMember - secondMember))
				return this.setValue('')
			}
		}
	}

	public setOperation(operation: OperatorTypes | null): void {
		this.MakeOperation()
		this.operation = null
		this.clearValue()
		this.operation = operation
	}

	public setActive(boolean: boolean): void {
		this.active = boolean
	}

	public initDisplay(position: Positions.first) {
		this.display = new Display(position)
	}
	public initNumbers(position: Exclude<Positions, Positions.first>) {
		this.numbers = new Numbers(position)

	}
	public initOperators(position: Exclude<Positions, Positions.first>) {
		this.operators = new Operators(position)

	}
	public initEqually(position: Exclude<Positions, Positions.first>) {
		this.equally = new Equally(position)
	}
}