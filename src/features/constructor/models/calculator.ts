import { Calculator, Element, ElementTypes, Positions } from "../../calculators";


export enum Modes {
	constructor = 1,
	runtime = 2
}


export class CalculatorConstructor extends Calculator {
	private active: boolean = false;

	constructor() {
		super()

	}
	public addElement(element: Element, position?: Positions) {
		if (position === Positions.end) {
			if (element.name === ElementTypes.Display) {
				return this.unshiftElement(element)
			}
			return this.pushElement(element)
		}
		if (position) {
			return this.shiftElement(element, position)
		}
		if (!position) {
			this.getElements()[element.getPosition() - 1] = element
			return this.shiftAll()
		}
	}
	private unshiftElement(element: Element) {
		this.getElements().unshift(element)
		return this.shiftAll()
	}
	private pushElement(element: Element) {
		this.getElements().push(element)
		return this.shiftAll()
	}

	public deleteElement(element: Element, position?: Positions) {
		if (position) {
			this.getElements().splice(position - 1, 1)
			return this.shiftAll()
		}
		if (!position) {
			this.getElements().splice(element.getPosition() - 1, 1)
			return this.shiftAll()
		}
	}

	private shiftAll() {
		this.getElements().map((element, index) => {
			element.setPosition(index + 1)
		})
	}

	private shiftElement(element: Element, position: Positions) {
		let isItElement = false
		if (element.name === ElementTypes.Display) {
			return this.unshiftElement(element)
		}
		this.getElements().forEach((thisElement) => {
			if (thisElement.name === element.name) {
				isItElement = true
			}
		})
		if (isItElement) {
			this.getElements().splice(element.getPosition() - 1, 1)
			this.getElements().splice(position - 1, 0, element)
			return this.shiftAll()
		}
		if (!isItElement) {
			this.getElements().splice(position - 1, 0, element)
			return this.shiftAll()
		}

	}

	public setActive(boolean: boolean): void {
		this.active = boolean
	}
}