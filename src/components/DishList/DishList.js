import "./DishList.css"
import { useEffect, useState } from "react";
import { dishes } from "../../data/mockDishes";
import DishCard from "../DishCard/DishCard";
import { useDispatch } from "react-redux";
import { setSelectedDishesListGlobal } from "../../redux/reducer/user";
import { useSelector } from "react-redux";


const DishList = ({foodCategory,switchStatus,searchQuery,setSelectedDishesList,tabCategory,selectedDishesList}) => {
    const [dishesList, setDishesList] = useState([])
    const [selectedDishes, setSelectedDishes] = useState([])
    const dispatch = useDispatch();
    const selectedDishesListGlobal = useSelector((state) => state.user.selectedDishesListGlobal);
    console.log(selectedDishesListGlobal,"selectedDishesListGlobal")   
    
    console.log(foodCategory,"foodCategory")
    console.log(tabCategory,"tabCategory")
    // console.log(switchStatus,"switchStatus")
    // console.log(searchQuery,"searchQuery")
    console.log(selectedDishesList,"selectedDishesList")
    console.log(dishesList,"dishesList")


    useEffect(() => {
        let filtered = dishes;
    
        if (!switchStatus) {
          filtered = filtered.filter(dish => dish.type === foodCategory);
        }

        if (searchQuery) {
          filtered = filtered.filter(dish =>
            dish?.name.toLowerCase().includes(searchQuery?.toLowerCase())
          );
        }
    
        setDishesList(filtered);
      }, [switchStatus, foodCategory, searchQuery]);

      useEffect(() => {
        setSelectedDishesList(selectedDishes);
        dispatch(setSelectedDishesListGlobal(selectedDishes));
      }, [selectedDishes, setSelectedDishesList]);

      useEffect(() => {
        if (tabCategory) {
          const selectedData = selectedDishesList?.filter((dish) => dish.mealType === tabCategory.toUpperCase());
          setDishesList(selectedData || []);
        } else if (selectedDishesList?.length === 0) {
          setDishesList(dishes);
        }
      }, [tabCategory, selectedDishesList]);

      useEffect(() => {
        if (selectedDishesList?.length === 0) {
          setDishesList(dishes);
        }
      }, [selectedDishesList?.length === 0]);

    return (
        <div>
            <h1>DishList</h1>
            <div className="dish-list-container">
            {dishesList.length === 0 ? <p>No dishes found</p> : null}
            {dishesList.map((dish) => {
                console.log(dish)
            return(
                
                <div key={dish.id} className="dish-list">
                   <DishCard dish={dish} setSelectedDishes={setSelectedDishes} selectedDishes={selectedDishes} />
                </div>
            )})}
            </div>
            
        </div>
    )
}

export default DishList
