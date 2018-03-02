import React, { Component } from 'react';
import Header from './Header';
import KanbanBoard from './KanbanBoard';

class App extends Component {
  render() {
    return (
      <div className='full-container'>
        <Header title={'kanban'} />
        <KanbanBoard />
      </div>
    );
  }
}

export default App;
