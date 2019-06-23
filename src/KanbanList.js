import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KanbanCard from './KanbanCard';
import update from 'immutability-helper';

// const listTarget = {
//   drop(props, monitor) {
//
//   }
// }

class KanbanList extends Component {
  constructor(props) {
    super(props);
    this.moveTask = this.moveTask.bind(this);
    this.state = {
      tasks: [],
      currentTask: '',
      addingTask: false
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      currentTask: e.target.value
    });
  }

  requestAddTask = (e) => {
    e.preventDefault();
    this.setState({
      addingTask: true
    });
  }

  handleAddTask = (e) => {
    e.preventDefault();
    if (this.state.currentTask) {
      this.setState(prevState => ({
        tasks: [...prevState.tasks, prevState.currentTask],
        currentTask: '',
        addingTask: false
      }));
    } else {
      this.setState({
        addingTask: false
      });
    }
  }

  handleEditTask = (e, oldTask, newTask) => {
    e.preventDefault();
    this.setState(prevState => ({
      tasks: prevState.tasks.map((task) => task === oldTask ? newTask : task)
    }));
  }

  handleDeleteTask = (e, deletedTask) => {
    e.preventDefault();
    this.setState(prevState => ({
      tasks: prevState.tasks.filter((task) => task !== deletedTask)
    }));
  }

  moveTask = (dragIndex, hoverIndex) => {
    const { tasks } = this.state;
    const dragCard = tasks[dragIndex];

    this.setState(update(this.state, {
      tasks: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      }
    }));
  }

  render() {
    const { tasks, addingTask } = this.state;

    return (
      <section className='kanban-list'>
        <h2 className='kanban-list-title'>
          <span>{this.props.title}</span>
          <i
            className='material-icons'
            onClick={(e) => this.requestAddTask(e)}
          >add_circle_outline</i>
        </h2>
        <section className='kanban-cards'>
          {tasks.map((task, index) => (
            <KanbanCard
              task={task}
              key={`${task}-${index}`}
              index={index}
              handleEditTask={this.handleEditTask}
              handleDeleteTask={this.handleDeleteTask}
              moveTask={this.moveTask}
            />
          ))}
        </section>
        {
          addingTask ? (
            <form className='add-task'>
              <input
                type='text'
                className='new-task'
                onChange={(e) => this.handleChange(e)}
                autoFocus
              />
              <i
                className='material-icons done'
                onClick={(e) => this.handleAddTask(e)}
                type='submit'
              >done</i>
            </form>
          ) : null
        }
      </section>
    );
  }
}

KanbanList.propTypes = {
  title: PropTypes.string.isRequired
}

export default KanbanList;
