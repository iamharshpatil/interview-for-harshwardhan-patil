import { useEffect, useState } from "react";
import axios from "axios";

const LaunchCard = ({ launch, onClick }) => {
  const [rocketName, setRocketName] = useState("Loading...");
  const [launchpadName, setLaunchpadName] = useState("Loading...");
  const [orbit, setOrbit] = useState("—");

  const formattedDate = new Date(launch.date_utc).toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [rocketRes, padRes] = await Promise.all([
          axios.get(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`),
          axios.get(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`),
        ]);

        setRocketName(rocketRes.data.name);
        setLaunchpadName(padRes.data.name);

        if (launch.payloads.length > 0) {
          const payloadRes = await axios.get(
            `https://api.spacexdata.com/v4/payloads/${launch.payloads[0]}`
          );
          setOrbit(payloadRes.data.orbit || "—");
        }
      } catch (error) {
        console.error("Failed to fetch launch details:", error);
      }
    };

    fetchDetails();
  }, [launch]);

  const getStatus = () => {
    if (launch.success === true) return "Success";
    if (launch.success === false) return "Failed";
    if (launch.upcoming) return "Upcoming";
    return "Pending";
  };

  const getStatusColor = () => {
    if (launch.success === true) return "bg-green-100 text-green-700";
    if (launch.success === false) return "bg-red-100 text-red-700";
    if (launch.upcoming) return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-500";
  };

  return (
    <div
      onClick={onClick}
      className="p-4 cursor-pointer transition bg-white"
    >
      <ul className="grid grid-cols-7 gap-4 text-sm rounded-b-xl text-gray-800 items-center">
        <li className="font-medium">{launch.flight_number}</li>
        <li>{formattedDate}</li>
        <li>{launchpadName}</li>
        <li>{launch.name}</li>
        <li>{orbit}</li>
        <li>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor()}`}
          >
            {getStatus()}
          </span>
        </li>
        <li>{rocketName}</li>
      </ul>
    </div>
  );
};

export default LaunchCard;
