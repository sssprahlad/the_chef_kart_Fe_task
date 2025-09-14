import { CiSearch } from "react-icons/ci";
import { dishes } from "../../data/mockDishes";
import { FaAngleLeft } from "react-icons/fa";
import { useState,useEffect } from "react";
import DishCard from "../DishCard/DishCard";
import "../DishCard/DishCard.css"
import "../DishList/DishList.css"
import "./OrderItems.css"
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDishesListGlobal,setCount } from "../../redux/reducer/user";
import IngredientPopup from "../IngredientPopup/IngredientPopup";
import { Link } from "react-router-dom";

// import "../Filter/Filter.css"


const OrderItems = ({
  // setFoodCategory,
  // setSwitchStatus,
  // setSearchQuery,
  // searchQuery,
  // setCount,
  // count,
  // selectedDishesList,
  // setTabCategory,
  // tabCategory,
  // isSummaryView = false,
  // maxItemsPerCategory = 8
}) => {

    const [isOnGreenSwitch, setIsOnGreenSwitch] = useState(false);
    const [isOnRedSwitch, setIsOnRedSwitch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dishesList, setDishesList] = useState([]);
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [expandedDishes, setExpandedDishes] = useState({});
    const [selectedDish, setSelectedDish] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [buttonStatus,setButtonStatus] = useState()
    const dispatch = useDispatch();
    
    const selectedDishesFromRedux = useSelector((state) => state.user.selectedDishesListGlobal || []);
    //   const selectedDishesList = useSelector((state) => state.user.selectedDishesListGlobal);

    const categories = ["Starter", "Main Course", "Desert", "Sides"];


    const getCategoryCounts = () => {
      return selectedDishesFromRedux.reduce((acc, dish) => {
        const category = dish.mealType.toLowerCase();
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
    };

    const categorySavedCounts = getCategoryCounts();
    console.log('Category Saved Counts:', categorySavedCounts);

    // const getCountForCategory = (category) => {
    //   const categoryKey = category.toLowerCase();
    //   return categoryCounts[categoryKey] || 0;
    // };

    const getTotalCount = () => {
      return dishes?.reduce((acc, dish) => {
        const category = dish.mealType.toLowerCase();
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
    };
    const totalCategoryCount = getTotalCount();
    // console.log(getTotalCount(),"getTotalCount")

    const handleToggleGreenSwitch = (category) => {
        setIsOnGreenSwitch(!isOnGreenSwitch);
        setIsOnRedSwitch(false)

       if(!isOnGreenSwitch){
        const filteredDishes = dishes?.filter(dish => 
            dish.type === category
        );
        setDishesList(filteredDishes);
       }else{
        setDishesList(dishes)
       }
      };

    const handleToggleRedSwitch = (category) => {
        setIsOnRedSwitch(!isOnRedSwitch);
        setIsOnGreenSwitch(false)

       if(!isOnRedSwitch){
        const filteredDishes = dishes?.filter(dish => 
            dish.type === category
        );
        setDishesList(filteredDishes);
       }else{
        setDishesList(dishes)
       }
      };



  useEffect(() => {
    setDishesList(dishes)
  }, []);

  useEffect(() => {
    setSelectedDishes(selectedDishesFromRedux);
  }, [selectedDishesFromRedux]);  

  useEffect(() => {
    const initialQuantities = {};
    selectedDishes.forEach(dish => {
        initialQuantities[dish.id] = 1; 
    });
    // setDishQuantities(prev => ({
    //     ...prev,
    //     ...initialQuantities
    // }));
  }, [selectedDishes]);

  
  const getShortDescription = (text) => {
    const words = text.split(' ');
    if (words.length <= 6) return text;
    return words.slice(0, 6).join(' ') + '...';
  };

  const toggleExpand = (dishId) => {
    setExpandedDishes(prev => ({
        ...prev,
        [dishId]: !prev[dishId]
    }));
  };

  const handleAddRemoveDish = (dish) => {
    const isSelected = selectedDishes.some(item => item.id === dish.id);
    let newSelectedDishes;
    
    if (isSelected) {
        newSelectedDishes = selectedDishes.filter(item => item.id !== dish.id);
    } else {
        const dishWithQuantity = { ...dish, quantity: 1 };
        newSelectedDishes = [...selectedDishes, dishWithQuantity];
        
        const updatedDishes = dishesList.map(item => 
            item.id === dish.id 
                ? { ...item, quantity: 1 }
                : item
        );
        setDishesList(updatedDishes);
    }
    
    setSelectedDishes(newSelectedDishes);
    dispatch(setSelectedDishesListGlobal(newSelectedDishes));
  };

  const handleIncrement = (dish) => {
    const isSelected = selectedDishes.some(item => item.id === dish.id);
    if (!isSelected) return;

    const updatedDishes = dishesList.map(item => 
        item.id === dish.id 
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
    );
    setDishesList(updatedDishes);
    
    const updatedSelectedDishes = selectedDishes.map(item => 
        item.id === dish.id 
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
    );
    dispatch(setSelectedDishesListGlobal(updatedSelectedDishes));
  };

  const handleDecrement = (dish) => {
    const isSelected = selectedDishes.some(item => item.id === dish.id);
    if (!isSelected) return;
    
    const currentQty = dish.quantity || 0;
    
    if (currentQty > 1) {
        const updatedDishes = dishesList.map(item => 
            item.id === dish.id 
                ? { ...item, quantity: currentQty - 1 }
                : item
        );
        setDishesList(updatedDishes);
        
        const updatedSelectedDishes = selectedDishes.map(item => 
            item.id === dish.id 
                ? { ...item, quantity: currentQty - 1 }
                : item
        );
        dispatch(setSelectedDishesListGlobal(updatedSelectedDishes));
    } else {
        handleAddRemoveDish(dish);
    }
  };

  useEffect(() => {
   if(searchQuery){
    const filteredDishes = dishesList?.filter(dish => 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDishesList(filteredDishes);
   }else{
    setDishesList(dishes)
    setIsOnGreenSwitch(false)
    setIsOnRedSwitch(false)
   }
  }, [searchQuery])

  const handleButtonStatus = (category) => {
    console.log(category,"category")
    setButtonStatus(category)


   if(isOnGreenSwitch === false && isOnRedSwitch === false){
    const filteredDishes = selectedDishesFromRedux?.filter(dish => 
      dish.mealType === category.toUpperCase()
    );
    setDishesList(filteredDishes);
   }else{
    setDishesList(dishes)
   }
  }

  const handleIngredientClick = (dish) => {
    setSelectedDish(dish);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  console.log(selectedDish,"selectedDish")

    return (
        <div className="order-items-wrapper">
            <div className="filter-main-container">
                <div className="search-container">
                    <FaAngleLeft className="icon" />
                    <input type="text" placeholder="Search dish your party....." className="search-input" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                    <CiSearch className="search-icon" />
                </div>
                <div className="filter-container">
                    {categories.map((category) => {
                      

                    return(
                        <button 
                            className={"btn"} 
                            key={category} onClick={() => handleButtonStatus(category)}
                        >
                            {category} {categorySavedCounts[category.toLowerCase()] || 0} / {totalCategoryCount[category.toLowerCase()] || 0}
                        </button>
                    )
                  }
                    )}
                </div>
                <div className="switch-container">
                    <p>{`${buttonStatus} Needed`} {totalCategoryCount[buttonStatus?.toLowerCase()] || 0} </p>
                    <div className="main-switch-container">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isOnGreenSwitch}
                                onChange={() => handleToggleGreenSwitch("VEG")}
                            />
                            <div className="toggle-container">
                                <div>
                                    <span className="dot-container"></span>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="red-switch">
                        <label className="red-switch-label">
                            <input
                                type="checkbox"
                                checked={isOnRedSwitch}
                                onChange={() => handleToggleRedSwitch("NON-VEG")}
                            />
                            <div className="red-toggle-track">
                                <span className="red-toggle-dot"></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="selected-items-container-order-items">
                    <div className="dish-list-container">
                        {dishesList.length === 0 ? (
                            <p>No dishes found</p>
                        ) : (
                            dishesList.map((dish) => {
                              const isDishSelected = selectedDishes.some(item => item.id === dish.id);
                              return(
                              
                                <div key={dish.id} className="dish-list">
                                    <div className="dish-card">
                                        <div className="dish-info">
                                            <div className="dish-info-container">
                                                <h1 className="dish-name">{dish.name}</h1>
                                                <div className={dish.type === "VEG" ? "dish-type veg" : "dish-type non-veg"}>
                                                    <div className={dish.type === "VEG" ? "dish-type-container type-veg" : "dish-type-container type-non-veg"}></div>
                                                </div>
                                            </div>
                                            <p className="dish-description">
                                                {expandedDishes[dish.id] ? dish.description : getShortDescription(dish.description)}
                                                {dish.description.split(' ').length > 6 && (
                                                    <button 
                                                        onClick={() => toggleExpand(dish.id)} 
                                                        className="read-more-btn"
                                                    >
                                                        {expandedDishes[dish.id] ? ' Read Less' : ' Read More'}
                                                    </button>
                                                )}
                                            </p>
                                            <div className="dish-image">
                                                {/* <img src={"images/group.svg"} alt={"logo"} height={25} width={25} /> */}
                                                <p 
                                                  className="ingredient" 
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleIngredientClick(dish);
                                                  }}
                                                >
                                                  Ingredient
                                                </p>
                                                <div className="quantity-controls">
                                                    <button 
                                                    // disabled={dishQuantities[dish.id] === 0}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDecrement(dish);   
                                                        }}
                                                        className="quantity-btn"
                                                        disabled={!isDishSelected}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="quantity">
                                                        {isDishSelected ? (dishesList.find(d => d.id === dish.id)?.quantity || 0) : 0}
                                                    </span>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleIncrement(dish);
                                                        }}
                                                        className="quantity-btn"
                                                        disabled={!isDishSelected}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="category-img-container">
                                            <div className="category-image-cont">
                                                <img src={dish?.category?.image} alt={dish?.category?.name} className="cat-images" />
                                            </div>
                                            <button className={isDishSelected ? "remove-btn" : "add-btn"} onClick={() => handleAddRemoveDish(dish)}>
                                                {isDishSelected ? "Remove" : "Added +"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                            }
                          )
                        )}
                    </div>
                </div>
            </div>
            <IngredientPopup 
              isOpen={isPopupOpen}
              onClose={closePopup}
              ingredients={selectedDish?.ingredients || []}
              selectedDish={selectedDish}
              handleAddRemoveDish={handleAddRemoveDish}
              dishesList={dishesList}
              
            />
        
        </div>
    );
}

export default OrderItems
