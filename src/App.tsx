import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Layout from './components/layout/Layout';
import PackageDetailsForm from './components/forms/PackageDetailsForm';
import ShippingRatesResults from './components/results/ShippingRatesResults';
import { PackageDetails, PackageType, ShippingRate } from './types';
import { getShippingRates } from './services/mockShippingService';

const App = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [showResults, setShowResults] = useState(false);

  // Load shipping rates on component mount for testing
  useEffect(() => {
    const loadInitialRates = async () => {
      // Default package details for testing
      const defaultPackageDetails: PackageDetails = {
        weight: 1,
        length: 12,
        width: 12,
        height: 12,
        originZip: '12345',
        destinationZip: '67890',
        isResidential: true,
        packageType: PackageType.BOX
      };
      
      setIsLoading(true);
      setShowResults(true);
      
      try {
        console.log('Loading initial rates...');
        const response = await getShippingRates(defaultPackageDetails);
        console.log('Initial rates response:', response);
        
        if (response.success) {
          setRates(response.rates);
        } else {
          setError(response.errors?.[0] || 'Failed to fetch shipping rates');
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialRates();
  }, []); // Empty dependency array since defaultPackageDetails is now inside the effect

  const handleSubmit = async (packageDetails: PackageDetails) => {
    console.log('Form submitted with data:', packageDetails);
    
    setIsLoading(true);
    setError(undefined);
    setShowResults(true);
    
    try {
      console.log('Fetching shipping rates...');
      const response = await getShippingRates(packageDetails);
      console.log('Shipping rates response:', response);
      
      if (response.success) {
        setRates(response.rates);
      } else {
        setError(response.errors?.[0] || 'Failed to fetch shipping rates');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-lg-4 mb-4 mb-lg-0">
          <PackageDetailsForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
        </div>
        <div className="col-lg-8">
          {(showResults || isLoading) && (
            <ShippingRatesResults 
              rates={rates} 
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
