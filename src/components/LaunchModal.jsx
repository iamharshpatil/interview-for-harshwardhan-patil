import { X } from "lucide-react";

const LaunchModal = ({ launch, onClose }) => {
  const formattedDate = new Date(launch.date_utc).toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusBadge = () => {
    if (launch.success) return <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">Success</span>;
    if (launch.success === false) return <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">Failed</span>;
    if (launch.upcoming) return <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">Upcoming</span>;
    return <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">Pending</span>;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-1/3 relative overflow-auto max-h-[90vh]">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X />
        </button>

        {/* Header */}
        <div className="p-6 flex flex-col md:flex-row md:items-center gap-4">
          <img src={launch.links.patch.small || "https://via.placeholder.com/100"} alt="Patch" className="w-16 h-16 rounded-md bg-gray-100" />
          <div>
            <h2 className=" font-semibold flex items-center gap-3">{launch.name} 
              <div className="">{statusBadge()}</div>
            </h2>
            <p className="text-gray-500 text-sm">{launch.rocket?.name || "Falcon 9"}</p>
            
          </div>
        </div>
          <p className="text-sm px-5 text-gray-700">
            {launch.details || "No details available."}{" "}
            {launch.links?.wikipedia && (
              <a href={launch.links.wikipedia} target="_blank" rel="noreferrer" className="text-blue-500 underline ml-1">
                Wikipedia
              </a>
            )}
          </p>

        {/* Details */}
        <div className="p-6 space-y-4">

          {/* Info Table */}
          <div className="flex flex-col gap-4 text-sm">
            <div >
              <div className="flex items-center justify-start gap-10 ">
              <strong >Flight Number:</strong>
               <div>
               {launch.flight_number}
                 </div>
              </div>
              <div className="w-full bg-[#acacac44] mt-1 py-[0.1%]"></div>
            </div>
            <div >
              <div className="flex items-center justify-start gap-10 ">
              <strong >Mission Name:</strong>
               <div>
               {launch.name}
                 </div>
              </div>
              <div className="w-full bg-[#acacac44] mt-1 py-[0.1%]"></div>

            </div>
            <div >
              <div className="flex items-center justify-start gap-10 ">
              <strong >Rocket Name:</strong>
               <div>
               {launch.rocket?.name || "Falcon 9"}
                 </div>
              </div>
              <div className="w-full bg-[#acacac44] mt-1 py-[0.1%]"></div>

            </div>
            <div >
              <div className="flex items-center justify-start gap-10 ">
              <strong >Manufacturer:</strong>  <div
              >    SpaceX </div>
              </div>
              <div className="w-full bg-[#acacac44] mt-1 py-[0.1%]"></div>

            </div>
            <div >
              <div className="flex items-center justify-start gap-10 ">
              <strong >Launch Date:</strong>
               <div>
               {formattedDate}
                 </div>
              </div>
              <div className="w-full bg-[#acacac44] mt-1 py-[0.1%]"></div>

            </div>
            <div >
              <div className="flex items-center justify-start gap-10 ">
              <strong >Payload Type:</strong>
               <div>
               {launch.payloads?.[0]?.type || "N/A"}

                 </div>
              </div>
              <div className="w-full bg-[#acacac44] mt-1 py-[0.1%]"></div>

            </div>
            <div >
              <div className="flex items-center justify-start gap-10 ">
              <strong >Orbit:</strong>  <div className="text-center"
              > </div>
              {launch.payloads?.[0]?.orbit || "N/A"}
              </div>
              <div className="w-full bg-[#acacac44] mt-1 py-[0.1%]"></div>

            </div>
            <div >
              <div className="flex items-center justify-start gap-10 ">
              <strong >Launch Site:</strong>
               <div>
               {launch.launchpad || "N/A"}
                 </div>
              </div>
              <div className="w-full bg-[#acacac44] mt-1 py-[0.1%]"></div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchModal;
