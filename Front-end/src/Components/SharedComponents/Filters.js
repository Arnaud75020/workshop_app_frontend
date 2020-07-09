import React from 'react';
import SearchBar from './SearchBar'
import './Filters.scss';

const WorkshopFilters = ({ handleSearch, seachValue, handleOption, optionsList, defaultOption, optionValue, optionKey}) => {


        return (  
            <div className="filters">
                <SearchBar handleChange={handleSearch} searchValue={seachValue} />
                <div className="filter-select">
                  <label>Filter by Date </label>
                  <select value={optionValue} onChange={handleOption}>
                      <option
                          value={defaultOption}>
                          {defaultOption}
                      </option>
                      {optionsList.map(option => {
                              return ( 
                              <option
                              key={option[optionKey]}
                              value={option[optionKey]}
                              >
                                  {option[optionKey]}
                              </option>
                              )
                      })}
                  </select>
                </div>
            </div>
        );
}

 
export default WorkshopFilters;