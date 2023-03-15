import React from 'react'
import './NodraggedArea.scss'

const NoDraggedArea = () => {
	return (
		<div className={'no-draggable-area'} draggable={false}></div>
	)
}

export default NoDraggedArea