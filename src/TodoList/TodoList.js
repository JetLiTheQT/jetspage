import "./TodoList.css"
import React, { useState } from 'react';
import moment from 'moment';
import { Card } from 'react-bootstrap';

const colors = {
  red: 'red',
  yellow: 'yellow',
  blue: 'blue',
};

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  const addTask = (task, category) => {
    setTasks([...tasks, task]);
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const markTaskComplete = taskId => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, isComplete: true };
      }
      return task;
    }));
  };

  const deleteTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  

  return (
    <div className="todo-container">
      <AddTaskForm addTask={addTask} />
      {categories.map(category => (
        <Category category={category}
        tasks={tasks.filter(task => task.category === category)}
        markTaskComplete={markTaskComplete}
        deleteTask={deleteTask}
      />
    ))}
  </div>
);
};

const AddTaskForm = ({ addTask }) => {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [dueDate, setDueDate] = useState('');
const [priority, setPriority] = useState(colors.blue);
const [category, setCategory] = useState('');

const handleSubmit = event => {
  event.preventDefault();
  addTask({
    title,
    description,
    dueDate,
    priority,
    category,
    id: Date.now(),
    isComplete: false,
  }, category);
  setTitle('');
  setDescription('');
  setDueDate('');
  setPriority(colors.blue);
  setCategory('');
};

return (
  <form onSubmit={handleSubmit}>
    <label>
      Title:
      <input
        type="text"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </label>
    <br />
    <label>
      Description:
      <input
        type="text"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
    </label>
    <br />
    <label>
      Due Date:
      <input
        type="date"
        value={dueDate}
        onChange={event => setDueDate(event.target.value)}
      />
    </label>
    <br />
    <label>
      Priority:
      <select value={priority} onChange={event => setPriority(event.target.value)}>
      <option value={colors.red}>High</option>
          <option value={colors.yellow}>Medium</option>
          <option value={colors.blue}>Low</option>
        </select>
      </label>
      <br />
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

const Category = ({ category, tasks, markTaskComplete, deleteTask }) => {
  return (
    <div>
      <h3>{category}</h3>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          markTaskComplete={markTaskComplete}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

const Task = ({ task, index, markTaskComplete, deleteTask }) => {
  return (
    <Card style={{ width: '18rem' }} className={`task task-${task.priority} ${task.isComplete ? 'task-complete' : ''}`}>
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{moment(task.dueDate).format('ll')}</Card.Subtitle>
        <Card.Text>
          {task.description}
        </Card.Text>
        <button onClick={() => markTaskComplete(task.id)}>Complete</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </Card.Body>
    </Card>
  );
};

export default TodoApp;