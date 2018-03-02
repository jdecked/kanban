import React, { Component } from 'react';
import PropTypes from 'prop-types';

class KanbanList extends Component {
  render() {
    return (
      <section className='kanban-list'>
        <h2 className='kanban-list-title'>
          {this.props.title}
          <i className='material-icons'>add_circle_outline</i>
        </h2>
        {this.props.cards}
      </section>
    );
  }
}

KanbanList.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.object
}

export default KanbanList;
