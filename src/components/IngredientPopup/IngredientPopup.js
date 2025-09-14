import React from 'react';
import './IngredientPopup.css';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {setIngredients} from '../../redux/reducer/user';

const IngredientPopup = ({ isOpen, onClose, ingredients, selectedDish, handleAddRemoveDish,dishsList }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  //  const ingredientsList = useSelector((state) => state.user.ingredients);

  if (!isOpen) return null;

  const handleRemoveDish = () => {
    handleAddRemoveDish(selectedDish);
    onClose();
    dispatch(setIngredients(selectedDish));
  };

  const handleIngredients = () => {
    dispatch(setIngredients(selectedDish));
    navigator("/ingredients");
  };

 

//   const buttonStatus = dishsList?.map((eachItem) => eachItem?.selectedDish.some((item) => item.id === selectedDish.id));

const buttonStatus = dishsList?.some((eachItem) =>
    eachItem?.selectedDish?.some((item) => item.id === selectedDish.id)
  );
console.log(buttonStatus,"buttonStatus")

  return (
    <div className="ingredient-popup-overlay">
      <div className="ingredient-popup">
        <div className="ingredient-popup-header">
          <h3>Ingredients</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="ingredient-list">
            <div className='category-image-container' >
            <   img src={selectedDish?.category?.image} alt={selectedDish?.category?.name} height={175} width={250} />
            </div>
            <div className='category-image' style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <h3>{selectedDish?.name}</h3>
                    <div className={selectedDish.type === "VEG" ? "dish-type veg" : "dish-type non-veg"}>
            <div className={selectedDish.type === "VEG" ? "dish-type-container type-veg" : "dish-type-container type-non-veg"}></div>
          </div>
                </div>
                <div>
                    {/* <button className='remove' onClick={handleRemoveDish}>Remove</button> */}
                    <button className={buttonStatus ? "add" : "remove"}  onClick={handleRemoveDish}>
                                                {buttonStatus ? "Added +" : "Remove"}
                                            </button>
                </div>
            </div>
            <p className='description'>{selectedDish?.description}</p>
            <div style={{display: "flex", alignItems: "center",gap: "10px", cursor: "pointer"}} onClick={handleIngredients}>
               <img src="images/cart1.svg" height={25} width={25} alt='logo'/>
                <h3 className='ingredient-text'>Ingredients</h3>
            </div>
            <div>

            </div>

            
         
        </div>
      </div>
    </div>
  );
};

export default IngredientPopup;
