import { useState } from "react";
import "./DishCard.css"

const DishCard = ({dish,setSelectedDishes,selectedDishes,setButtonCategory}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const getShortDescription = (text) => {
        const words = text.split(' ');
        if (words.length <= 6) return text;
        return words.slice(0, 6).join(' ') + '...';
    };

    const handleAddRemoveDish = (buttonStatus) => {
        if (buttonStatus === "add") {
            setSelectedDishes([...selectedDishes, dish]);
        } else {
            setSelectedDishes(selectedDishes.filter((item) => item.id !== dish.id));
        }
    };

    return (
        <div className="dish-card">
            <div className="dish-info">
                <div className="dish-info-container">
                    <h1 className="dish-name">{dish.name}</h1>
                    <div className={dish.type === "VEG" ? "dish-type veg" : "dish-type non-veg"}>
                        <div className={dish.type === "VEG" ? "dish-type-container type-veg " : "dish-type-container type-non-veg"}></div>
                    </div>
                </div>
                <p className="dish-description">
                    {isExpanded ? dish.description : getShortDescription(dish.description)}
                    {dish.description.split(' ').length > 6 && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)} 
                            className="read-more-btn"
                        >
                            {isExpanded ? ' Read Less' : ' Read More'}
                        </button>
                    )}
                </p>
                <div className="dish-image">
                    <img src={"images/group.svg"} alt={"logo"} height={25} width={25} />
                    <p className="ingredient">Ingredient</p>
                </div>
            </div>
            <div className="category-img-container">
                <div className="category-image-cont">
                    <img src={dish?.category?.image} alt={dish?.category?.name}  className="cat-images" />
                </div>
                <button className={selectedDishes.includes(dish) ? "remove-btn" : "add-btn"} onClick={() => handleAddRemoveDish(selectedDishes.includes(dish) ? "remove" : "add")} >{selectedDishes.includes(dish) ? "Remove" : "Add +"}</button>
            </div>
        </div>
    )
}

export default DishCard;