const FilterBar = ({ filterMonth, setFilterMonth, filterStatus, setFilterStatus }) => {
  return (
    <div className="flex mt-15 px-20 justify-between mb-10 ">
      {/* 🔘 Filter by Months */}
      <div className="flex items-center gap-2">
        <i className="ri-calendar-line"></i>
        <select
          name="filter"
          id="filter"
          className="text-[#4B5563] font-semibold outline-none"
          value={filterMonth}
          onChange={(e) => setFilterMonth(Number(e.target.value))}
        >
          <option value="3">Past 3 Months</option>
          <option value="6">Past 6 Months</option>
          <option value="12">Past 12 Months</option>
        </select>
      </div>

      {/* 🔘 Filter by Status */}
      <div className="flex items-center gap-2">
        <i className="ri-filter-line"></i>
        <select
          className="text-[#4B5563] w-auto font-semibold outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Launches</option>
          <option value="upcoming">Upcoming Launches</option>
          <option value="success">Successful Launches</option>
          <option value="failed">Failed Launches</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
