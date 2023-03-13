import { Calculator, NumberTypes, OperatorTypes, Positions } from "../../calculators";

export class CalculatorRuntime extends Calculator {
	private value: string = '';
	private previewValue: string = '';
	private operation: OperatorTypes | null = null;

	constructor() {
		super()
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
	public setValue(value: string) {
		this.getDisplay()?.setValue(value)
		this.value = value
	}
	public getValue() {
		return this.value
	}

	public clearValue(): void {
		this.getDisplay()?.setValue('')
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
	public getPreviewValue() {
		return this.previewValue
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
}