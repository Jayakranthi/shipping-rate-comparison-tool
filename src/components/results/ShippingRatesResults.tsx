import React, { useState, useEffect } from 'react';
import { ShippingRate } from '../../types';

type ShippingRatesResultsProps = {
  rates: ShippingRate[];
  isLoading: boolean;
  error?: string;
};

const ShippingRatesResults = ({
  rates,
  isLoading,
  error
}: ShippingRatesResultsProps): React.ReactElement => {
  const [sortBy, setSortBy] = useState<'price' | 'time'>('price');
  const [filterCarrier, setFilterCarrier] = useState<string>('all');
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);

  // Debug: Log props on mount and when they change
  useEffect(() => {
    console.log('ShippingRatesResults props:', { rates, isLoading, error });
    console.log('Rates length:', rates.length);
    if (rates.length > 0) {
      console.log('First rate:', rates[0]);
    }
  }, [rates, isLoading, error]);

  // Get unique carriers for filter dropdown
  const carriers = Array.from(new Set(rates.map(rate => rate.carrierId)));

  // Sort and filter rates
  const sortedAndFilteredRates = [...rates]
    .filter(rate => filterCarrier === 'all' || rate.carrierId === filterCarrier)
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else {
        return a.estimatedDeliveryDays - b.estimatedDeliveryDays;
      }
    });

  const handleSelectRate = (rate: ShippingRate) => {
    console.log('Selected rate:', rate);
    setSelectedRate(rate);
    alert(`Selected ${rate.carrierName} ${rate.methodName} for $${rate.price.toFixed(2)}`);
    // In a real application, you would likely:
    // 1. Save the selected rate to state
    // 2. Navigate to the next step in the checkout process
    // 3. Or pass the selected rate to a parent component via a callback
  };

  // Debug: Render a simple message if no rates
  if (rates.length === 0 && !isLoading && !error) {
    return (
      <div className="alert alert-warning" role="alert">
        No shipping rates available. This is likely a bug since rates should be loaded automatically.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Fetching shipping rates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (rates.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No shipping rates available. Please check your package details and try again.
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Shipping Rates</h3>
        <div className="d-flex">
          <div className="me-2">
            <select 
              className="form-select form-select-sm" 
              value={filterCarrier} 
              onChange={(e) => setFilterCarrier(e.target.value)}
              aria-label="Filter by carrier"
            >
              <option value="all">All Carriers</option>
              {carriers.map(carrier => (
                <option key={carrier} value={carrier}>
                  {rates.find(r => r.carrierId === carrier)?.carrierName || carrier}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="btn-group btn-group-sm" role="group" aria-label="Sort options">
              <button 
                type="button" 
                className={`btn ${sortBy === 'price' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => setSortBy('price')}
              >
                Sort by Price
              </button>
              <button 
                type="button" 
                className={`btn ${sortBy === 'time' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => setSortBy('time')}
              >
                Sort by Time
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Carrier</th>
                <th>Service</th>
                <th>Transit Time</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredRates.map((rate, index) => (
                <tr key={`${rate.carrierId}-${rate.methodId}-${index}`} 
                    className={selectedRate && selectedRate.carrierId === rate.carrierId && 
                              selectedRate.methodId === rate.methodId ? 'table-primary' : ''}>
                  <td>
                    <strong>{rate.carrierName}</strong>
                  </td>
                  <td>
                    {rate.methodName}
                    {rate.guaranteedDelivery && (
                      <span className="badge bg-success ms-2">Guaranteed</span>
                    )}
                  </td>
                  <td>
                    {rate.estimatedDeliveryDays === 1 
                      ? '1 day' 
                      : `${rate.estimatedDeliveryDays} days`}
                  </td>
                  <td>
                    <strong className="text-primary">${rate.price.toFixed(2)}</strong>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleSelectRate(rate)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedRate && (
        <div className="card-footer bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Selected: </strong> 
              {selectedRate.carrierName} {selectedRate.methodName} - ${selectedRate.price.toFixed(2)}
            </div>
            <button className="btn btn-success">
              Continue with Selected Rate
            </button>
          </div>
        </div>
      )}
      {!selectedRate && (
        <div className="card-footer bg-light">
          <small className="text-muted">
            * Rates are estimates and may change at the time of shipping
          </small>
        </div>
      )}
    </div>
  );
};

export default ShippingRatesResults;