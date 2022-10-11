import Home from "./Pages/Home/Home";
import {BrowserRouter as Router,Routes,Route}from'react-router-dom'
import Write from "./Pages/Write/Write";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <div >
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/write' element={<Write/>}/>
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
