import React from 'react';

export default (props) => {

    return (
        <div className="card item-card" draggable 
            onDragOver={props.onDragOver}  
            onDragStart={(e) => props.onDragStart(e)} key={props.card.id}>
        <div className="card-body">
            <p className="card-text">{props.card.text}</p>
        </div>
        </div>
    )
}