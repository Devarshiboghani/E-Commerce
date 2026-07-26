"use client";

import "./FilterSort.css";

export default function FilterSort({
  search,
  setSearch,
  filterValue,
  setFilterValue,
  sortValue,
  setSortValue,
  categories = [],
}) {
  return (
    <div className="filter-sort-wrapper">
      <div className="filter-box">
        <label>Filter:</label>

        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="All">All Categories</option>

          {categories?.map((item, index) => (
            <option
              key={item._id || item.categoryName || index}
              value={item.categoryName}
            >
              {item.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="sort-box">
        <label>Sort By:</label>

        <select
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        >
          <option value="az">A-Z</option>

          <option value="za">Z-A</option>

          <option value="newest">Newest</option>

          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}
