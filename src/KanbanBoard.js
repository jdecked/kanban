import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import KanbanList from './KanbanList';

class KanbanBoard extends Component {
  render() {
    return (
      <article className='kanban-board'>
        <KanbanList title='To Do' />
        <KanbanList title='Doing' />
        <KanbanList title='Done' />
      </article>
    );
  }
}

export default DragDropContext(HTML5Backend)(KanbanBoard);
