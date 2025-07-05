import { useEffect, useState } from "react";
import { fetchLaunches } from "../utils/spacexAPI";
import LaunchCard from "../components/LaunchCard";
import FilterBar from "../components/FilterBar";
import LaunchModal from "../components/LaunchModal";
import Topbanner from "../components/Topbanner";
import Pagination from "../components/Pagination";



const Home = () => {
  const [launches, setLaunches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [filter, setFilter] = useState("all");
const [currentPage, setCurrentPage] = useState(1); 
const launchesPerPage = 10;
const [filterMonth, setFilterMonth] = useState(6);
const [filterStatus, setFilterStatus] = useState("all"); 

useEffect(() => {
  const now = new Date();
  const filteredByMonth = launches.filter((launch) => {
    const launchDate = new Date(launch.date_utc);
    const diffInMonths = (now - launchDate) / (1000 * 60 * 60 * 24 * 30);
    return diffInMonths <= filterMonth;
  });

  let finalFilter = filteredByMonth;

  if (filterStatus === "upcoming") {
    finalFilter = finalFilter.filter((l) => l.upcoming);
  } else if (filterStatus === "success") {
    finalFilter = finalFilter.filter((l) => l.success);
  } else if (filterStatus === "failed") {
    finalFilter = finalFilter.filter((l) => l.success === false);
  }

  setFiltered(finalFilter);
  setCurrentPage(1); // Reset page when filter changes
}, [filterMonth, filterStatus, launches]);

 

  useEffect(() => {
    const getLaunches = async () => {
      const data = await fetchLaunches();
      setLaunches(data);
      setFiltered(data);
      setLoading(false);
    };
    getLaunches();
  }, []);

  useEffect(() => {
    setCurrentPage(1); 
    if (filter === "all") {
      setFiltered(launches);
    } else if (filter === "upcoming") {
      setFiltered(launches.filter((l) => l.upcoming));
      
    } else if (filter === "past") {
      setFiltered(launches.filter((l) => !l.upcoming));
    }
  }, [filter, launches]);

  // ✅ Pagination logic
  const indexOfLast = currentPage * launchesPerPage;
  const indexOfFirst = indexOfLast - launchesPerPage;
  const currentLaunches = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / launchesPerPage);

  return (
    <div className=" min-h-screen">
      {/* 🚀 Top Banner */}
      <Topbanner />
      <div className="max-w-7xl  mx-auto px-4  py-10 space-y-6">
        {/* 🎛 Filter Bar */}
       <FilterBar
  filterMonth={filterMonth}
  setFilterMonth={setFilterMonth}
  filterStatus={filterStatus}
  setFilterStatus={setFilterStatus}
/>


        {/* 📦 Launch Data */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">🚀 Launch data is loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No launches found for this filter.</p>
        ) : (
          <div className="px-20 ">
            {/* 📊 Table Header */}
            <ul
              style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}
              className=" rounded-t-xl  bg-[#F4F5F7] md:grid grid-cols-7 gap-4 text-xs text-gray-500 font-semibold p-4"
            >
              <li>No.</li>
              <li>Launched (UTC)</li>
              <li>Location</li>
              <li>Mission</li>
              <li>Orbit</li>
              <li>Launch Status</li>
              <li>Rocket</li>
            </ul>

            {/* 🛰 Launch List */}
            <div
              style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}
              className=""
            >
              {currentLaunches.map((launch) => (
                <LaunchCard
                  key={launch.id}
                  launch={launch}
                  onClick={() => setSelectedLaunch(launch)}
                />
              ))}
            </div>

            {/* 🔢 Pagination Controls */}
           <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(page) => setCurrentPage(page)}
/>
          </div>
        )}

        {/* 🔍 Modal */}
        {selectedLaunch && (
          <LaunchModal
            launch={selectedLaunch}
            onClose={() => setSelectedLaunch(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
