import { Calculator, NumberTypes, OperatorTypes, Positions } from "../../calculators";

export class CalculatorRuntime extends Calculator {
	private value: string = '0';
	private previewValue: string = '';
	private operation: OperatorTypes | null = null;

	constructor() {
		super()
	}

	public addSymbol(value: string) {
		this.isNan()
		this.isZero(value)
		if (this.checkSplitter(this.value) && this.isSplitter(value)) {
			return
		}
		if (this.value.length >= 16) {
			return
		}
		this.value = [this.value, value].join('')
	}
	public setValue(value: string) {
		this.getDisplay()?.setValue(value)
		this.value = value
	}
	private isZero(value: string) {
		if (this.getValue() === '0' && value !== ',') {
			this.setValue('')
		}
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
	private isNan() {
		if (isNaN(this.makeNumber(this.getPreviewValue())) || isNaN(this.makeNumber(this.getValue()))) {
			this.setValue('')
			this.setPreviewValue('')
			this.operation = null
		}
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
		if (number === Infinity) {
			return 'Не определено'
		}
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
	private roundingString(value: string, number: number): string {
		return value = this.makeString(Math.ceil(this.makeNumber(value) * (10 ** number)) / (10 ** number))
	}
	public setPreviewValue(value: string): void {
		this.previewValue = value
		if (value.length >= 15) {
			this.previewValue = this.roundingString(value, 15)
		}
	}
	public getPreviewValue() {
		return this.previewValue
	}

	public MakeOperation(): void {
		this.isNan()
		const firstMember = this.makeNumber(this.previewValue)
		const secondMember = this.makeNumber(this.value)

		if (!this.previewValue) {
			this.setPreviewValue(this.value)
			return this.setValue('')
		}
		if (!this.value) {
			this.setPreviewValue(this.previewValue)
			return this.setValue('')
		}

		if (this.previewValue && this.value) {
			if (this.operation === OperatorTypes.division) {
				this.setPreviewValue(this.makeString(firstMember / secondMember))
				this.operation = null
				return this.setValue('')
			}
			if (this.operation === OperatorTypes.multiplication) {
				this.setPreviewValue(this.makeString(firstMember * secondMember))
				this.operation = null
				return this.setValue('')
			}
			if (this.operation === OperatorTypes.addition) {
				this.setPreviewValue(this.makeString(firstMember + secondMember))
				this.operation = null
				return this.setValue('')
			}
			if (this.operation === OperatorTypes.subtraction) {
				this.setPreviewValue(this.makeString(firstMember - secondMember))
				this.operation = null
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