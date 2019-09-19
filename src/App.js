import React from 'react';
import uuid from 'uuid';

class Home extends React.Component{

  state = {
    boards: [],
    cards: [],
    task: ''
  }

  componentDidMount() {
    const defaultBoards = [
      {
        id: uuid(),
        text: 'Todo'
      },
      {
        id: uuid(),
        text: 'Doing'
      },
      {
        id: uuid(),
        text: 'Done'
      }
    ];

    this.setState({boards: defaultBoards});
  }

  onDragStart = (event, card) => {
    event.dataTransfer.setData("text/html", String(event.target.outerHTML));
    event.dataTransfer.setData("cardId", card.id);
  }

  onDrop = (e, targetBoard) => {
    
    const cardId = e.dataTransfer.getData("cardId");
    
    const cards = this.state.cards.map( i => {
      if(i.id === cardId){
        i.board_id = targetBoard.id;
      }
      return i;
    });
    this.setState({
      cards
    });

    e.dataTransfer.clearData();
    e.preventDefault();
  }

  onDragOver = (event) => {
      event.preventDefault();
  }

  addTask = (boardId) => {
    this.setState( prevState => {
      console.log(prevState);
      const {cards} = prevState;
      console.log({cards});
      
      cards.push({
        id: uuid(),
        text: prevState.task,
        board_id: boardId
      })
      return {
        cards,
        task: ''
      }
    })
  }

  render() {

    const {boards, cards, task} = this.state;

      return (
          <div className="App">

              {boards.length && 
              
              boards.map( board => {
                return (
                  <div className="list" onDrop={(e) => this.onDrop(e, board)} key={board.id} onDragOver={this.onDragOver}>
                    <h5>{board.text}</h5>
                    <input type="text" placeholder="Add task..." value={task} onChange={(e) => this.setState({task: e.target.value})}/>
                    <button onClick={() => this.addTask(board.id)}>+</button>
                  {cards.length && cards.map( i => {
                      if(i.board_id === board.id) {
                        return (
                          // <div className="list-item" draggable onDragStart={this.onDragStart}>{i.text}</div>
                          <div className="list-item" draggable onDragStart={(e) => this.onDragStart(e, i)} key={i.id}>{i.text}</div>
                        )
                      }
                      return null;
                    })
                  }       
              </div>              
                )
              })

              }
          </div>
      );
  }

  
}

export default Home;