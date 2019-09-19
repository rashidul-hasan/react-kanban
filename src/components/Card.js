import React , {useState} from 'react';

export default (props) => {

    const [taskText, setTask] = useState('');

    const onAddTaskButtonClick = () => {
        props.onAddTask(props.list.id, taskText);
        setTask('');
    }

    return (
        <div className="card item-card" draggable 
            onDragOver={props.onDragOver}  
            onDragStart={(e) => props.onDragStart(e)} key={props.card.id}>
        <div className="card-body">
            <p className="card-text">{props.card.text}</p>
            {/* <a href="#" class="card-link">Card link</a> */}
            {/* <a href="#" class="card-link">Another link</a> */}
        </div>
        </div>
    )
}