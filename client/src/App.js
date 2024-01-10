import logo from './logo.svg';
import './App.css';
import {Route,Routes,useRoutes} from 'react-router-dom'
import Home from './pages/home';
import CreateRecipie from './pages/create-recipie';
import SavedRecipie from './pages/saved-recipie';
import Auth from './pages/auth';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-recipie" element={<CreateRecipie/>}/>
        <Route path="/saved-recipie" element={<SavedRecipie/>}/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
      
    
    </div>
  );
}

export default App;
