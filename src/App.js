import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TaskContainer from './components/TaskContainer';
import UserSelector from './components/UserSelector';

function App() {
  const [users, setUsers] = useState([])
  const[currentUser, setCurrentUser] = useState("none")
  const baseURL = "http://localhost:9393"

  return (
    <div className="App">
      <Header />
      <UserSelector users={users} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <TaskContainer baseURL={baseURL} setUsers={setUsers} users={users} currentUser={currentUser} />
    </div>
  );
}

export default App;
