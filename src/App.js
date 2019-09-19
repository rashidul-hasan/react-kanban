import React from 'react';
import uuid from 'uuid';
import List from './components/List';

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

  addTask = (boardId, taskText) => {

    console.log('here', boardId + taskText);
    
    this.setState( prevState => {
      console.log(prevState);
      const {cards} = prevState;
      console.log({cards});
      
      cards.push({
        id: uuid(),
        text: taskText,
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

                  <List
                    onDragOver={this.onDragOver}
                    list={board}
                    onAddTask={this.addTask} 
                    cards={cards}
                    onDragStart={this.onDragStart}
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}/>            
                )
              })

              }
          </div>
      );
  }

  
}

export default Home;