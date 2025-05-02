import React from 'react';

type FormCheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
};

const FormCheckbox = ({
  id,
  label,
  checked,
  onChange,
  required = false,
  error,
  className = '',
}: FormCheckboxProps): React.ReactElement => {
  return (
    <div className={`form-check mb-3 ${className}`}>
      <input
        id={id}
        name={id}
        type="checkbox"
        className={`form-check-input ${error ? 'is-invalid' : ''}`}
        checked={checked}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={id} className="form-check-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormCheckbox;