import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TaskContainer from './components/TaskContainer';
import UserSelector from './components/UserSelector';

function App() {
  const [users, setUsers] = useState([])
  const[currentUser, setCurrentUser] = useState("none")
  const [headerText, setHeaderText] = useState("To Do Lister")
  const baseURL = "http://localhost:9393"

  return (
    <div className="App">
      <Header header={headerText} />
      <UserSelector users={users} currentUser={currentUser} setCurrentUser={setCurrentUser} setHeaderText={setHeaderText} />
      <TaskContainer baseURL={baseURL} setUsers={setUsers} users={users} currentUser={currentUser} />
    </div>
  );
}

export default App;
