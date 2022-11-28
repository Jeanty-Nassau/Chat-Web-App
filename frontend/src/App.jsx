import './App.css'
import socketIO from 'socket.io-client';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';

const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (
    <Router>
        <Routes>
          <Route  path='/chat' element={<ChatPage socket={socket}/>}/>
          <Route  path='/' element={<Home socket={socket}/>}/>
        </Routes>
    </Router>
  );
}

export default App
