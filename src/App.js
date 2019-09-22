import React from 'react';
import uuid from 'uuid';
import List from './components/List';

class Home extends React.Component{

  state = {
    lists: [],
    cards: [],
    task: ''
  }

  componentDidMount() {
    const defaultLists = [
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

    this.setState({lists: defaultLists});
  }

  onDragStart = (event, card) => {
    event.dataTransfer.setData("text/html", String(event.target.outerHTML));
    event.dataTransfer.setData("cardId", card.id);
  }

  onDrop = (e, targetList) => {
    
    const cardId = e.dataTransfer.getData("cardId");
    
    const cards = this.state.cards.map( i => {
      if(i.id === cardId){
        i.list_id = targetList.id;
      }
      return i;
    });
    this.setState({
      cards
    });

    // e.dataTransfer.clearData();
    e.preventDefault();
  }

  onDragOver = (event) => {
      event.preventDefault();
  }

  addTask = (listId, taskText) => {
    
    this.setState( prevState => {
      const {cards} = prevState;
      
      cards.push({
        id: uuid(),
        text: taskText,
        list_id: listId
      })
      return {
        cards,
        task: ''
      }
    })
  }

  render() {

    const {lists, cards} = this.state;

      return (
          <div className="App">

              {lists.length && 
              
              lists.map( list => {
                return (

                  <List
                    key={list.id}
                    list={list}
                    onAddTask={this.addTask} 
                    cards={cards.filter(i => i.list_id === list.id)}
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