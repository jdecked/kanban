import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './Constants';
import { flow } from 'lodash';

const cardSource = {
  beginDrag(props) {
    return {
      task: props.task,
      index: props.index,
      handleDeleteTask: props.handleDeleteTask,
      handleEditTask: props.handleEditTask,
      moveTask: props.moveTask
    };
  }
};

// Modified from the react-dnd sortable list example available at
// https://github.com/react-dnd/react-dnd/blob/master/examples/04%20Sortable/Simple/Card.js
const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveTask(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
};

class KanbanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      task: this.props.task
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      task: e.target.value
    });
  }

  requestEditTask = (e) => {
    e.preventDefault();
    this.setState({
      editing: true
    });
  }

  cancelEditTask = (e) => {
    e.preventDefault();
    this.setState({
      editing: false
    });
  }

  handleEditTask = (e) => {
    e.preventDefault();
    this.props.handleEditTask(e, this.props.task, this.state.task);
    this.setState({
      editing: false
    });
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      connectDropTarget,
      handleDeleteTask
    } = this.props;
    const { task } = this.state;

    return connectDragSource(connectDropTarget(
      this.state.editing ? (
        <form style={{ isDragging ? 0 : 1 }} className='kanban-card'>
          <input
            type='text'
            className='new-task'
            onChange={(e) => this.handleChange(e)}
            autoFocus
            value={this.state.task}
          />
          <div className='actions'>
            <i
              className='material-icons done'
              onClick={(e) => this.handleEditTask(e)}
              type='submit'
            >done</i>
            <i
              className='material-icons cancel'
              onClick={(e) => this.cancelEditTask(e)}
            >clear</i>
          </div>
        </form>
      ) : (
        <div style={{ isDragging ? 0 : 1 }} className='kanban-card'>
          <span>{task}</span>
          <div className='actions'>
            <i
              className='material-icons'
              onClick={(e) => this.requestEditTask(e)}
            >edit</i>
            <i
              className='material-icons'
              onClick={(e) => handleDeleteTask(e, this.props.task)}
            >
              delete
            </i>
          </div>
        </div>
      )
    ));
  }
}

KanbanCard.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handleEditTask: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  task: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default flow([
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
])(KanbanCard);
