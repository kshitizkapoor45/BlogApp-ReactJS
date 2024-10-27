
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import { UserDashBoard } from './userRoutes/UserDashBoard';
import PrivateRoute from './components/PrivateRoute';
import Profile from './userRoutes/Profile';
import Services from './pages/Services';
import PostPage from './pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';


function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signin' element={<SignUp/>} />
      <Route path='/services' element={<Services />} />
      <Route path='/posts/:postId' element={<PostPage />} />
      <Route path='/categories/:categoryId' element={<Categories/>}/>
      
      <Route path='/user' element={<PrivateRoute />}>
        <Route path='dashboard' element={<UserDashBoard/>} />
        <Route path='profile' element={<Profile />} />
      </Route>
     
    </Routes>
    </BrowserRouter>
    </UserProvider>
  
  );
}

export default App;
