const LaunchModal = ({ launch, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-2">{launch.name}</h2>
        <p>Details: {launch.details || "No details available."}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LaunchModal;
