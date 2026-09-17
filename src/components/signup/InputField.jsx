export default function InputField({
  label,
  placeholder,
  type = "text",
  name,
  register,
  error,
  animationDelay = "0s",
}) {
  return (
    <div className="form-field stagger-item" style={{ "--animation-delay": animationDelay }}>
      <label htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${name}-error` : undefined
        }
      />

      {error && (
        <span
          id={`${name}-error`}
          className="field-error"
        >
          {error.message}
        </span>
      )}
    </div>
  );
}