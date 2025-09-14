import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { FaChevronLeft } from "react-icons/fa";
import "./IngredientModel.css"
import { useNavigate } from "react-router-dom";

const IngredientPage = () => {
  const dispatch = useDispatch();
  const ingredientsList = useSelector((state) => state.user.ingredients);
  // const { dishId } = useParams();
  // const dish = dishes.find(d => d.id === parseInt(dishId));
  const navigator = useNavigate();

  console.log(ingredientsList,"ingredientsList")

  // if (!dish) return <h2>Dish not found</h2>;

  const handleBackClick = () => {
    navigator("/summary");
    console.log("back clicked")
  }

  return (
    <div className="ingredient-page">
      <div className="ingredient-page-header">
        
        <button onClick={handleBackClick}>  <FaChevronLeft /></button>
        <h3>Ingredients list</h3>
      </div>
      <div style={{display: "flex", alignItems: "center", gap: "10px", width:"100%"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", width:"40%"}}>
          <h3 className='ingredient-text'>{ingredientsList?.name}</h3>
          <p>{ingredientsList?.description}</p>
        </div>
        <div style={{width:"50%"}}>
          <img src={ingredientsList?.category?.image} alt={ingredientsList?.category?.name} height={175} width={250} />
        </div>
      </div>
      <div>
        <h3>Ingredients</h3>
        <p>For 2 peoples</p>
        <hr/>
      </div>
      <div>
      <ul style={{listStyleType: "none", padding: "0", margin: "0", gap: "15px", display: "flex", flexDirection: "column"}}>
        {Object.entries(ingredientsList?.ingredients).map(([key, value]) =>
          key !== "img" ? <li key={key} style={{display: "flex",justifyContent: "space-between", alignItems: "center", width:"100%"}}><p style={{margin: "0", padding: "0"}}>{key}</p><p style={{margin: "0", padding: "0"}}>{value}</p></li> : null
        )}
      </ul> 
      </div>




    
    </div>
  );
}

export default IngredientPage

