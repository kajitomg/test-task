import { Calculator, Display, Element, ElementTypes, Equally, Numbers, Operators, OperatorTypes, Positions } from "../../calculators";


enum shiftDirections {
	side = 0,
	up = 1,
	down = -1,
}


export class CalculatorConstructor extends Calculator {
	private active: boolean = false;

	constructor() {
		super()

	}
	public addElement(element: Element, position?: Positions) {
		this.getElements()[element.getPosition() - 1] = element
		if (position) {
			this.shiftElement(element, position)
		}
	}
	public deleteElement(element: Element) {
		this.getElements().splice(element.getPosition() - 1, 1)
	}

	private shiftDirection(element: Element, position: Positions): shiftDirections {
		let shiftDirection: shiftDirections = shiftDirections.side
		if (element.getPosition() < position) {
			shiftDirection = shiftDirections.down
		}
		if (element.getPosition() > position) {
			shiftDirection = shiftDirections.up
		}
		if (element.getPosition() === position) {
			shiftDirection = shiftDirections.side
		}

		return shiftDirection
	}

	public shiftElement(element: Element, position: Positions) {
		let shiftDirection = this.shiftDirection(element, position)

		if (element.name !== ElementTypes.Display && position === Positions.first) {
			this.getElements().splice(element.getPosition() - 1, 1)
			return this.getElements().splice(Positions.second - 1, 0, element)
		}
		if (element.name === ElementTypes.Display) {
			return
		}

		this.getElements()[position - 1].setPosition(position + shiftDirection)
		this.getElements().splice(element.getPosition() - 1, 1)
		element.setPosition(position)
		this.getElements().splice(position - 1, 0, element)

	}

	public setActive(boolean: boolean): void {
		this.active = boolean
	}
}