import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderItems from './components/OrderItems/OrderItems';
import MainContainer from './components/MainContainer/MainContainer';

const App = () => {
  const [foodCategory, setFoodCategory] = useState('');
  const [switchStatus, setSwitchStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDishesList, setSelectedDishesList] = useState([]);
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

  return (
    <Router>
      <div className="app-container">
        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
