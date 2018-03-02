import React, { Component } from 'react';
import KanbanList from './KanbanList';
import KanbanCard from './KanbanCard';

export default class KanbanBoard extends Component {
  render() {
    return (
      <article className='kanban-board'>
        <KanbanList
          title='To Do'
          cards={
            <section className='kanban-cards'>
              <KanbanCard task='Call mom' />
              <KanbanCard task='Call dad' />
            </section>
          }
        />
        <KanbanList
          title='Doing'
          cards={
            <section className='kanban-cards'>
              <KanbanCard task='Finish homework' />
              <KanbanCard task='Go to sleep' />
            </section>
          }
        />
        <KanbanList
          title='Done'
          cards={
            <section className='kanban-cards'>
              <KanbanCard task='Eat dinner' />
              <KanbanCard task='Hope' />
            </section>
          }
        />
      </article>
    );
  }
}
