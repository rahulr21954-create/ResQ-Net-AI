function AlertBox({
  type = "success",
  message,
}) {
  const colors = {
    success:
      "bg-green-100 text-green-700 border-green-500",

    error:
      "bg-red-100 text-red-700 border-red-500",

    warning:
      "bg-yellow-100 text-yellow-700 border-yellow-500",

    info:
      "bg-blue-100 text-blue-700 border-blue-500",
  };

  return (
    <div
      className={`
        border-l-4
        p-4
        rounded-lg
        ${colors[type]}
      `}
    >
      {message}
    </div>
  );
}

export default AlertBox;