import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]); // Original list
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // Filtered list
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=29.9141069&lng=78.1535928&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!data.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await data.json();
      console.log(json);

      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setRestaurantList(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const searchHandler = () => {
    const filteredList = restaurantList.filter(
      (res) =>
        res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
        res.info.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(searchText.toLowerCase())
        )
    );
    setFilteredRestaurants(filteredList);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchHandler();
    }
  };

  const filterTopRated = () => {
    const filteredList = restaurantList.filter((res) => res.info.avgRating > 4);
    setFilteredRestaurants(filteredList);
  };

  const resetFilters = () => {
    setSearchText("");
    setFilteredRestaurants(restaurantList);
  };

  return filteredRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center w-full max-w-xl mx-auto space-y-4">
        <div className="search flex w-full space-x-4 m-2 ">
          <input
            type="text"
            placeholder="Search food or restaurant"
            value={searchText}
            onChange={handleSearchTextChange}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 rounded-full p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
          />
          <button
            onClick={searchHandler}
            className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 focus:outline-none transition-all duration-200"
          >
            Search
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-700 focus:outline-none transition-all duration-200"
          >
            Reset
          </button>
        </div>
        <button
          className="bg-green-500 text-white px-6 py-3 m-2 rounded-full shadow-md hover:bg-green-700 focus:outline-none transition-all duration-200"
          onClick={filterTopRated}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            <RestaurantCard resList={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
