import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./OrderItems.css";
import Filter from "../Filters/Filter";
import DishList from "../DishList/DishList";
import { dishes } from "../../data/mockDishes";
import { CgLayoutGrid } from "react-icons/cg";

const OrderItems = ({
  selectedDishesList,
}) => {
  const navigate = useNavigate();
  const selectedDishes = useSelector((state) => state.user.selectedDishesListGlobal || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [count, setCount] = useState({
    starter: 0,
    "main course": 0,
    desert: 0,
    sides: 0,
    other: 0
  });
  const [tabCategory, setTabCategory] = useState("");
  // const [switchStatus, setSwitchStatus] = useState(false);
  

  useEffect(() => {
    // if (selectedDishes && selectedDishes.length > 0) {
      let filtered = [...dishes];
      
      if (searchQuery) {
        filtered = filtered.filter(dish =>
          dish.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (tabCategory) {
        filtered = filtered.filter(dish => 
          dish.mealType === tabCategory.toUpperCase()
        );
      }
      
      setFilteredDishes(filtered);
    // } else {
    //   setFilteredDishes([]);
    // }
  }, [searchQuery, selectedDishes, tabCategory]);

  const handleContinue = () => {
    navigate("/summary", { replace: true });
  };

  console.log(filteredDishes,"filteredDishes in orderItem")

  return (
    <div className="order-items-container">
      <h1>Order Summary</h1>
      <Filter 
        setFoodCategory={() => {}} 
        setSwitchStatus={() => {}} 
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        setCount={setCount}
        count={count}
        selectedDishesList={selectedDishesList}
        setTabCategory={setTabCategory}
        tabCategory={tabCategory}
        isSummaryView={true}
        maxItemsPerCategory={8}
      />

      <DishList 
        foodCategory={""} 
        switchStatus={false} 
        searchQuery={searchQuery} 
        setSelectedDishesList={() => {}} 
        count={count} 
        // selectedDishesList={filteredDishes.length > 0 ? filteredDishes : selectedDishes} 
        selectedDishesList={filteredDishes}
        tabCategory={tabCategory}
      />
      <div className="selected-dishes">
        {selectedDishes.length === 0 ? (
          <p>No dishes selected</p>
        ) : (
          selectedDishes.map((dish) => (
            <div key={dish.id} className="selected-dish">
              <h3>{dish.name}</h3>
              <p>{dish.type} • {dish.mealType}</p>
            </div>
          ))
        )}
      </div>
      <button className="continue-btn" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default OrderItems;
