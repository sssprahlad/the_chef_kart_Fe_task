import Filter from "../Filters/Filter";
import "./OrderItems.css";

const OrderItems = ({
  foodCategory,
  setFoodCategory,
  switchStatus,
  setSwitchStatus,
  searchQuery,
  setSearchQuery,
  selectedDishesList,
  setSelectedDishesList,
  count,
  setCount,
  tabCategory,
  setTabCategory
}) => {
    return (
        <div className="order-items-container">
            <h1>Order Summary</h1>
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
                isSummaryView={true}  
                maxItemsPerCategory={8} 
            />
           
        </div>
    );
};

export default OrderItems;
