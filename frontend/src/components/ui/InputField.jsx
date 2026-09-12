function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          border
          rounded-lg
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-red-500
        "
      />
    </div>
  );
}

export default InputField;