import Home from "./Pages/Home/Home";
import {BrowserRouter as Router,Routes,Route}from'react-router-dom'
import Write from "./Pages/Write/Write";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div >
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/write' element={<Write/>}/>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
