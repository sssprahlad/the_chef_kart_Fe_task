import "./DishList.css"
import { useEffect, useState } from "react";
import { dishes } from "../../data/mockDishes";
import DishCard from "../DishCard/DishCard";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDishesListGlobal } from "../../redux/reducer/user";

const DishList = ({
  foodCategory,
  switchStatus,
  searchQuery,
  setSelectedDishesList,
  tabCategory,
  // selectedDishesList = []
  selectedDishesList
}) => {
  const [dishesList, setDishesList] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const dispatch = useDispatch();
  const selectedDishesFromRedux = useSelector((state) => state.user.selectedDishesListGlobal || []);
  console.log(dishesList,"dishList")
  console.log(selectedDishesList,"selectedDishesList in dishList")
  console.log(foodCategory,"foodCategory")
  console.log(tabCategory,"tabCategory")
  console.log(switchStatus,"switchStatus")

  useEffect(() => {
    if (selectedDishesFromRedux.length > 0) {
      setSelectedDishes(selectedDishesFromRedux);
      setSelectedDishesList(selectedDishesFromRedux);
    }
  }, [selectedDishesFromRedux, setSelectedDishesList]);


  useEffect(() => {
    if (selectedDishes.length > 0 || selectedDishesFromRedux.length > 0) {
      setSelectedDishesList(selectedDishes);
      dispatch(setSelectedDishesListGlobal(selectedDishes));
    }
  }, [selectedDishes, dispatch, setSelectedDishesList, selectedDishesFromRedux]);

  useEffect(() => {
    if (!dishes) return;
    
    let filtered = [...dishes];
    
    // Apply search filter if there's a search query
    if (searchQuery) {
      filtered = filtered.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply food category filter if switch is off and foodCategory is set
    // if (!switchStatus && foodCategory) {
    //   if(selectedDishesList?.length > 0){
    //     filtered = selectedDishesList?.filter(dish => dish.type === foodCategory && dish.mealType === tabCategory.toUpperCase())
    //   }
      
    // }

    if (!switchStatus && foodCategory) {
      // First filter by food category from either selected items or all dishes
      const sourceList = selectedDishesList?.length > 0 ? selectedDishesList : dishes;
      filtered = sourceList.filter(dish => dish.type === foodCategory);
      
      // Then apply tab category filter if a tab is selected
      if (tabCategory) {
          filtered = filtered.filter(dish => 
              dish.mealType === tabCategory.toUpperCase()
          );
      }
  }


    
    setDishesList(filtered);
  }, [dishes, searchQuery, switchStatus, foodCategory]);

  useEffect(() => {
    if (tabCategory) {
      const filteredDishes = selectedDishesList?.filter(dish => 
        dish.mealType === tabCategory.toUpperCase()
      );
      setDishesList(filteredDishes);
    }
  }, [tabCategory]);

  useEffect(() => {
   setTimeout(() => {
    setDishesList(dishes)
   }, 100);
  }, []);

  return (
    <div>
      <h1>DishList</h1>
      <div className="dish-list-container">
        {dishesList.length === 0 ? (
          <p>No dishes found</p>
        ) : (
          dishesList.map((dish) => (
            <div key={dish.id} className="dish-list">
              <DishCard 
                dish={dish} 
                selectedDishes={selectedDishes}
                setSelectedDishes={setSelectedDishes}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DishList