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

		const isAvailabilityElement = this.checkAvailabilityElement(element)

		if (!isAvailabilityElement) {
			if (element.name === ElementTypes.Display) {
				return this.unshiftElement(element)
			}
			if (position === Positions.end) {
				return this.pushElement(element)
			}
			if (position) {
				return this.shiftElement(element, position)
			}
			if (!position) {
				return this.insertElement(element, element.getPosition())
			}
		}
		if (isAvailabilityElement) {
			if (position) {
				if (this.checkIsItPosition(element, position)) {
					return
				}
				return this.shiftElement(element, position)
			}
		}
	}
	public deleteElement(element: Element, position?: Positions) {
		if (element.name === ElementTypes.Display) {
			return
		}
		if (position) {
			this.getElements().splice(position - 1, 1)
			return this.shiftAll()
		}
		if (!position) {
			this.getElements().splice(element.getPosition() - 1, 1)
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
	private insertElement(element: Element, position: Positions) {
		this.getElements()[position - 1] = element
		return this.shiftAll()

	}
	private checkAvailabilityElement(element: Element): boolean {
		let available = false
		this.getElements().map((thisElement) => {
			if (thisElement.name === element.name) {
				available = true
			}
		})
		return available
	}

	private checkIsItPosition(element: Element, position: Positions): boolean {
		if (element.getPosition() === position) {
			return true
		}
		return false
	}

	private shiftAll() {
		this.getElements().map((element, index) => {
			element.setPosition(index + 1)
		})
	}

	private shiftElement(element: Element, position: Positions) {
		if (element.name === ElementTypes.Display) {
			return
		}

		const isAvailabilityElement = this.checkAvailabilityElement(element)

		if (isAvailabilityElement) {
			this.getElements().splice(element.getPosition() - 1, 1)
			this.getElements().splice(position - 1, 0, element)
			return this.shiftAll()
		}

		if (!isAvailabilityElement) {
			this.getElements().splice(position - 1, 0, element)
			return this.shiftAll()
		}

	}

	public setActive(boolean: boolean): void {
		this.active = boolean
	}
	public getActive(): boolean {
		return this.active
	}
}