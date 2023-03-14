import './CalculatorButton.scss'
import { Blue } from './instances/Blue';

export interface CalculatorButtonProps {

	children?: string;

	className?: string;

	onClick?: () => void;

	draggable?: boolean;

}

const CalculatorButton = ({ children, className, onClick }: CalculatorButtonProps) => {
	return (
		<button className={['calculator__button', className].join(' ')} onClick={onClick}>{children}</button>
	)
}

CalculatorButton.Blue = Blue

export { CalculatorButton }