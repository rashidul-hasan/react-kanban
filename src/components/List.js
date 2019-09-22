import React , {useState} from 'react';
import Card from './Card';

export default (props) => {

    const [taskText, setTask] = useState('');

    const onAddTaskButtonClick = () => {
        props.onAddTask(props.list.id, taskText);
        setTask('');
    }
    return (
        <div className="card border-info card-custom" onDrop={(e) => props.onDrop(e, props.list)} onDragOver={props.onDragOver}>
            <div className="card-header">
                {props.list.text}
            </div>
            <div className="card-body">
                <form class="form-inline">
                    <div class="form-group mx-sm-3 mb-2">
                        <input type="text" className="form-control" placeholder="Add task..." 
                            value={taskText} onChange={(e) => setTask(e.target.value)}/>
                    </div>
                    <button type="button" onClick={onAddTaskButtonClick} className="btn btn-outline-secondary">Add</button>
                </form>
                
                {(props.cards.length) ? props.cards.map( i => {
                    return (
                            <Card className="list-item" draggable 
                                card={i}
                                onDragStart={(e) => props.onDragStart(e, i)} key={i.id} />
                        )
                    })
                 : null} 
            </div>
        </div>
    )
}