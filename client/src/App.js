import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import './index.css'

import Home from './Pages/Home'
import About from './Pages/About'
import Login from './Pages/Login'

import Navbar from './components/Header/Navbar'


function App() {
  return (
   
    < BrowserRouter >
       <Navbar/>
       <Routes>

         <Route path="/" element={ <Home/> } />
         <Route path="/about" element={ <About/> } />
         <Route path="/login" element={ <Login/> } />


       </Routes>
           

    </BrowserRouter>   

  );
}

export default App;
