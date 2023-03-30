import './CalculatorButton.scss'
import { Blue } from './instances/Blue';
import cn from 'classnames'

export interface CalculatorButtonProps {

	children?: string;

	className?: string;

	onClick?: () => void;

	draggable?: boolean;

}

const CalculatorButton = ({ children, className, onClick }: CalculatorButtonProps) => {
	const buttonClass = cn('calculator__button', className)
	return (
		<button className={buttonClass} onClick={onClick}>{children}</button>
	)
}

CalculatorButton.Blue = Blue

export { CalculatorButton }