import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Filter from './components/Filters/Filter';
import DishList from './components/DishList/DishList';
import { useEffect, useState } from 'react';
import Summary from './components/Summar/Summary';
import OrderItems from './components/OrderItems/OrderItems';

const App = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [switchStatus, setSwitchStatus] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [selectedDishesList, setSelectedDishesList] = useState([]);
  const [count, setCount] = useState({
    starter: 0,
    "main course": 0,
    desert: 0,
    sides: 0
  });
  const [tabCategory, setTabCategory] = useState();

  useEffect(() => {
    if (selectedDishesList?.length === 0) {
      setTabCategory("");
    }
  }, [selectedDishesList]);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Filter 
                  setFoodCategory={setFoodCategory} 
                  setSwitchStatus={setSwitchStatus} 
                  setSearchQuery={setSearchQuery} 
                  searchQuery={searchQuery} 
                  setCount={setCount} 
                  count={count} 
                  selectedDishesList={selectedDishesList}  
                  setTabCategory={setTabCategory} 
                  tabCategory={tabCategory} 
                />
                <DishList 
                  foodCategory={foodCategory} 
                  switchStatus={switchStatus} 
                  searchQuery={searchQuery} 
                  setSelectedDishesList={setSelectedDishesList} 
                  count={count} 
                  selectedDishesList={selectedDishesList} 
                  tabCategory={tabCategory}
                />
                <Summary selectedDishesList={selectedDishesList} />
              </>
            } 
          />
          <Route path="/summary" element={<OrderItems />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
