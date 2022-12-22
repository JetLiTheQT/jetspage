import './App.css'

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import TodoList from './TodoList/TodoList';
import Calendar from './Calendar';
import FinancialTracking from './FinancialTracking';
import PomodoroTimer from './PomodoroTimer/PomodoroTimer';
import Home from './Home/Home';

function App() {
  return (
    <Router>
      <nav>
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pomodoro-timer">Pomodoro Timer</Link>
          </li>
          <li>
            <Link to="/todo-list">Todo List</Link>
          </li>
          <li>
            <Link to="/calendar"><strike>Calendar</strike></Link>
          </li>
          <li>
            <Link to="/financial-tracking"><strike>Financial Tracking</strike></Link>
          </li>


        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="todo-list" element={<TodoList />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="financial-tracking" element={<FinancialTracking />} />
        <Route path="pomodoro-timer" element={<PomodoroTimer />} />
      </Routes>
    </Router>
  );
}

export default App;