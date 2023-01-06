import Home from "./Pages/Home/Home";
import {QueryClientProvider, QueryClient}from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {BrowserRouter as Router,Routes,Route, UNSAFE_RouteContext}from'react-router-dom'
import Write from "./Pages/Write/Write";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Pages/Login/Login";
import FullPost from "./Pages/FullPost/FullPost";
import User from "./Pages/User/User";
import Edit from "./Pages/Edit/Edit";
import Footer from "./Components/Footer/Footer";
import Allpost from "./Pages/allposts/Allpost";
import { UserContext } from './Context/UserContext';
const queryClient = new QueryClient()

function App() {
  return (
    <div >
    <QueryClientProvider client={queryClient}>
    <Router>
     <UserContext>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/write' element={<Write/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/post/:id" element={<FullPost/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/posts" element={<Allpost/>}/>
      </Routes>
      <Footer/>
      </UserContext>  
    </Router>
     <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
     </QueryClientProvider>
    
    </div>
    
  );
}

export default App;
