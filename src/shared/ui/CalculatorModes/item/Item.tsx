import React, { FC } from 'react'
import './Item.scss'

interface ItemProps {

	children: React.ReactNode;

	className?: string;

	available: boolean;

	onClick: () => void;

}

const Item: FC<ItemProps> = ({ children, className, available, onClick }) => {
	return (
		<button className={['modes__item', className, available && 'available'].join(' ')} onClick={() => onClick()}>
			{children}
		</button>
	)
}

export { Item }