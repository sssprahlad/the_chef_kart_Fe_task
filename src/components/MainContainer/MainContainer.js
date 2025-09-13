import "./MainContainer.css"
import Filter from "../Filters/Filter"
import DishList from "../DishList/DishList"
import Summary from "../Summar/Summary"

const MainContainer = ({
  setFoodCategory,
  setSwitchStatus,
  setSearchQuery,
  searchQuery,
  setCount,
  count,
  selectedDishesList,
  setTabCategory,
  tabCategory,
  foodCategory,
  switchStatus,
  setSelectedDishesList
}) => {
    return (
        <div className="main-container">
            <Filter 
              setFoodCategory={setFoodCategory} 
              setSwitchStatus={setSwitchStatus} 
              setSearchQuery={setSearchQuery} 
              searchQuery={searchQuery} 
              setCount={setCount} 
              count={count} 
              selectedDishesList={selectedDishesList}  
              setTabCategory={setTabCategory} 
              tabCategory={tabCategory}
              isSummaryView={false}  
            />
            <DishList 
              foodCategory={foodCategory} 
              switchStatus={switchStatus} 
              searchQuery={searchQuery} 
              setSelectedDishesList={setSelectedDishesList} 
              count={count} 
              selectedDishesList={selectedDishesList} 
              tabCategory={tabCategory}
            />
            <Summary selectedDishesList={selectedDishesList} />
        </div>
    )
}

export default MainContainer
