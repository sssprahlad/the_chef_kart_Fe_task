import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderItems from './components/OrderItems/OrderItems';
import MainContainer from './components/MainContainer/MainContainer';
import { useDispatch } from 'react-redux';
import { setSelectedDishesListGlobal } from './redux/reducer/user';
import IngredientPage from './components/IngredientModal/IngredientModel';
import Signup from './components/SignUp/SignUp';
// import Login from './components/Login/Login';
import Login from "./components/Login/Login"
import { resetUsers, resetSelectedDishesListGlobal} from './redux/reducer/user';
import ProtectedRoute from './ProtactedRoute';



const App = () => {
  
  const [foodCategory, setFoodCategory] = useState('');
  const [switchStatus, setSwitchStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDishesList, setSelectedDishesList] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const dispatch = useDispatch();
  const [count, setCount] = useState({
    starter: 0,
    "main course": 0,
    desert: 0,
    sides: 0
  });
  const [tabCategory, setTabCategory] = useState('');

  useEffect(() => {
    if (selectedDishesList?.length === 0) {
      setTabCategory("");
    }
  }, [selectedDishesList]);

  useEffect(() => {
    // dispatch(resetUsers());
    dispatch(resetSelectedDishesListGlobal());
  }, []);




  return (
    <Router>
      <div className="app-container">
      <Routes>
 
  <Route element={<ProtectedRoute />}>
    <Route 
      path="/" 
      element={
        <MainContainer 
          foodCategory={foodCategory}
          setFoodCategory={setFoodCategory}
          switchStatus={switchStatus}
          setSwitchStatus={setSwitchStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDishesList={selectedDishesList}
          setSelectedDishesList={setSelectedDishesList}
          count={count}
          setCount={setCount}
          tabCategory={tabCategory}
          setTabCategory={setTabCategory}
        />
      } 
    />
    <Route 
      path="/summary" 
      element={
        <OrderItems 
          foodCategory={foodCategory}
          setFoodCategory={setFoodCategory}
          switchStatus={switchStatus}
          setSwitchStatus={setSwitchStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDishesList={selectedDishesList}
          setSelectedDishesList={setSelectedDishesList}
          count={count}
          setCount={setCount}
          tabCategory={tabCategory}
          setTabCategory={setTabCategory}
        />
      } 
    />
    <Route 
      path="/ingredients" 
      element={<IngredientPage />}
    />
  </Route>

  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
</Routes>
      </div>
    </Router>
  );
};

export default App;
