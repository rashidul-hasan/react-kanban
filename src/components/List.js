import React , {useState} from 'react';
import Card from './Card';

export default (props) => {

    const [taskText, setTask] = useState('');

    const onAddTaskButtonClick = () => {
        props.onAddTask(props.list.id, taskText);
        setTask('');
    }
    return (
        <div className="card border-info" onDrop={(e) => props.onDrop(e, props.list)} onDragOver={props.onDragOver}>
            <div className="card-header">
                {props.list.text}
            </div>
            <div className="card-body">
                <input type="text" className="form-control" placeholder="Add task..." value={taskText} onChange={(e) => setTask(e.target.value)}/>
                <button onClick={onAddTaskButtonClick} className="btn btn-outline-secondary">Add</button>
                {props.cards.length && props.cards.filter( i => i.board_id === props.list.id).map( i => {
                    return (
                            <Card className="list-item" draggable 
                                card={i}
                                onDragStart={(e) => props.onDragStart(e, i)} key={i.id} />
                        )
                    })
                } 
            </div>
        </div>
    )
}