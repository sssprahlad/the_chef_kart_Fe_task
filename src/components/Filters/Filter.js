import { CiSearch } from "react-icons/ci";
import { FaAngleLeft } from "react-icons/fa";
import { useState, useEffect } from "react";

import "./Filter.css"


const Filter = ({setFoodCategory,setSwitchStatus,setSearchQuery,searchQuery,setCount,count,selectedDishesList,setTabCategory,tabCategory}) => {

    const [isOnGreenSwitch, setIsOnGreenSwitch] = useState(false);
    const [isOnRedSwitch, setIsOnRedSwitch] = useState(false);
    // const [tabCategory, setTabCategory] = useState([])
    console.log(count,"count")


    const categories = ["Starter", "Main Course", "Desert", "Sides"];

    const handleToggleGreenSwitch = (category) => {
        setIsOnGreenSwitch(!isOnGreenSwitch);
        setIsOnRedSwitch(false)
        setFoodCategory(category)
        setSwitchStatus(isOnGreenSwitch)
      };

    const handleToggleRedSwitch = (category) => {
        setIsOnRedSwitch(!isOnRedSwitch);
        setIsOnGreenSwitch(false)
        setFoodCategory(category)
        setSwitchStatus(isOnRedSwitch)
      };



    useEffect(() => {
        const newCount = {
          starter: 0,
          "main course": 0,
          desert: 0,   
          sides: 0,
          other: 0
        };
      
        selectedDishesList?.forEach(dish => {
          switch (dish.mealType) {
            case "STARTER":
              newCount.starter += 1;
              break;
            case "MAIN COURSE":
              newCount["main course"] += 1;
              break;
            case "SIDES":
              newCount.sides += 1;
              break;
            case "DESSERT":
              newCount.desert += 1;
              break;
            default:
              newCount.other += 1;
              break;
          }
        });
      
        setCount(newCount);
      }, [selectedDishesList,setCount]);

  
      


    return (
        <div className="filter-main-container">
            <div className="search-container">
                <FaAngleLeft className="icon" />
                <input type="text" placeholder="Search dish your party....." className="search-input" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                <CiSearch className="search-icon" />
            </div>
            <div className="filter-container">
               {categories.map((category) => (
                <button className={tabCategory === category ? "btn active" : "btn"} key={category} onClick={() => {setTabCategory(category)}}>{category} {count[category.toLowerCase()]}</button>
               ))}
            </div>
            <div className="selected-items-container">
                <h3 className="selected-items-title">{tabCategory} Selected ({count[tabCategory?.toLowerCase()] || 0})</h3>
                <div className="switch-container">
                    {/* <button className="btn">All</button> */}
                <div className="main-switch-container">
                    <label className="switch">
                        <input
                        type="checkbox"
                        checked={isOnGreenSwitch}
                        onChange={()=>handleToggleGreenSwitch("VEG")}
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
                        onChange={()=>handleToggleRedSwitch("NON-VEG")}
                        />
                        <div className="red-toggle-track">
                        <span className="red-toggle-dot"></span>
                        </div>
                    </label>
                </div>
                </div>

            </div>
        </div>
    )
}

export default Filter
