import React, { Component } from 'react';
import PropTypes from 'prop-types';

class KanbanCard extends Component {
  render() {
    return (
      <div className='kanban-card'>
        {this.props.task}
        <div className='actions'>
          <i className='material-icons'>edit</i>
          <i className='material-icons'>delete</i>
        </div>
      </div>
    );
  }
}

KanbanCard.propTypes = {
  task: PropTypes.string.isRequired
}

export default KanbanCard;
