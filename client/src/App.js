import Home from "./Pages/Home/Home";
import {BrowserRouter as Router,Routes,Route}from'react-router-dom'
import Write from "./Pages/Write/Write";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Pages/Login/Login";
import FullPost from "./Components/FullPost/FullPost";

function App() {
  return (
    <div >
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/write' element={<Write/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/post/:id" element={<FullPost/>}/>
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
