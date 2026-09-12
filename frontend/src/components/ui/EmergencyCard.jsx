function EmergencyCard({
  type,
  location,
  status,
  time,
}) {
  return (
    <div className="bg-white shadow rounded-xl p-5">

      <h2 className="font-bold text-xl">
        {type}
      </h2>

      <p className="mt-2">
        📍 {location}
      </p>

      <p className="text-red-600 mt-2">
        {status}
      </p>

      <p className="text-gray-500 mt-2">
        {time}
      </p>

    </div>
  );
}

export default EmergencyCard;