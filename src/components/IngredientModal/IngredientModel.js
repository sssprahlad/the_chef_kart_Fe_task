import React from "react";
import { useParams, Link } from "react-router-dom";
import dishes from "../data/dishes.json";

const IngredientPage = () => {
  const { dishId } = useParams();
  const dish = dishes.find(d => d.id === parseInt(dishId));

  if (!dish) return <h2>Dish not found</h2>;

  const ingredients = [
    { name: "Paneer", qty: "200g" },
    { name: "Onion", qty: "2 pcs" },
    { name: "Capsicum", qty: "1 pc" }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ing, idx) => (
          <li key={idx}>{ing.name} - {ing.qty}</li>
        ))}
      </ul>
      <Link to="/"><button>Back</button></Link>
    </div>
  );
}

export default IngredientPage

