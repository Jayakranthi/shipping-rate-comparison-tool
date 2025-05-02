import React, { useState } from 'react';
import { PackageDetails, PackageType } from '../../types';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import FormCheckbox from '../common/FormCheckbox';

type PackageDetailsFormProps = {
  onSubmit: (packageDetails: PackageDetails) => void;
  isLoading?: boolean;
};

const PackageDetailsForm = ({ 
  onSubmit,
  isLoading = false
}: PackageDetailsFormProps): React.ReactElement => {
  const [formData, setFormData] = useState<PackageDetails>({
    weight: 1,
    length: 12,
    width: 12,
    height: 12,
    originZip: '12345',
    destinationZip: '67890',
    isResidential: true,
    packageType: PackageType.BOX
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? parseFloat(value) 
          : value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate weight
    if (formData.weight <= 0) {
      newErrors.weight = 'Weight must be greater than 0';
    }
    
    // Validate dimensions
    if (formData.length <= 0) {
      newErrors.length = 'Length must be greater than 0';
    }
    if (formData.width <= 0) {
      newErrors.width = 'Width must be greater than 0';
    }
    if (formData.height <= 0) {
      newErrors.height = 'Height must be greater than 0';
    }
    
    // Validate ZIP codes
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(formData.originZip)) {
      newErrors.originZip = 'Please enter a valid 5-digit ZIP code';
    }
    if (!zipRegex.test(formData.destinationZip)) {
      newErrors.destinationZip = 'Please enter a valid 5-digit ZIP code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const packageTypeOptions = Object.values(PackageType).map(type => ({
    value: type,
    label: type
  }));

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Package Details</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <FormInput
                id="weight"
                label="Weight (lbs)"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                min={0.1}
                step={0.1}
                required
                error={errors.weight}
              />
            </div>
            <div className="col-md-6">
              <FormSelect
                id="packageType"
                label="Package Type"
                value={formData.packageType}
                onChange={handleChange}
                options={packageTypeOptions}
                required
                error={errors.packageType}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <FormInput
                id="length"
                label="Length (in)"
                type="number"
                value={formData.length}
                onChange={handleChange}
                min={0.1}
                step={0.1}
                required
                error={errors.length}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                id="width"
                label="Width (in)"
                type="number"
                value={formData.width}
                onChange={handleChange}
                min={0.1}
                step={0.1}
                required
                error={errors.width}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                id="height"
                label="Height (in)"
                type="number"
                value={formData.height}
                onChange={handleChange}
                min={0.1}
                step={0.1}
                required
                error={errors.height}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormInput
                id="originZip"
                label="Origin ZIP Code"
                type="zip"
                value={formData.originZip}
                onChange={handleChange}
                placeholder="12345"
                required
                error={errors.originZip}
              />
            </div>
            <div className="col-md-6">
              <FormInput
                id="destinationZip"
                label="Destination ZIP Code"
                type="zip"
                value={formData.destinationZip}
                onChange={handleChange}
                placeholder="67890"
                required
                error={errors.destinationZip}
              />
            </div>
          </div>

          <FormCheckbox
            id="isResidential"
            label="Residential Delivery"
            checked={formData.isResidential}
            onChange={handleCheckboxChange}
          />

          <div className="d-grid">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Calculating Rates...
                </>
              ) : (
                'Compare Shipping Rates'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageDetailsForm;