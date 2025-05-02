import React from 'react';

type Option = {
  value: string;
  label: string;
};

type FormSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
};

const FormSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required = false,
  error,
  className = '',
}: FormSelectProps): React.ReactElement => {
  return (
    <div className={`form-group mb-3 ${className}`}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <select
        id={id}
        name={id}
        className={`form-select ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormSelect;