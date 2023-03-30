import React, { FC } from 'react'
import './Item.scss'
import cn from 'classnames'

interface ItemProps {

	children: React.ReactNode;

	className?: string;

	available: boolean;

	onClick: () => void;

}

const Item: FC<ItemProps> = ({ children, className, available, onClick }) => {
	const itemClass = cn('modes__item', className, { available: available })
	return (
		<button className={itemClass} onClick={() => onClick()}>
			{children}
		</button>
	)
}

export { Item }