import React from 'react';

type FormInputProps = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'zip';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  className?: string;
};

const FormInput = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder = '',
  required = false,
  min,
  max,
  step,
  error,
  className = '',
}: FormInputProps): React.ReactElement => {
  // For zip code inputs, use text type with pattern
  const inputType = type === 'zip' ? 'text' : type;
  const inputPattern = type === 'zip' ? '[0-9]{5}' : undefined;
  
  return (
    <div className={`form-group mb-3 ${className}`}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={inputType}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        pattern={inputPattern}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormInput;