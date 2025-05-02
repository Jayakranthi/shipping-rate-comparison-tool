import React from 'react';

const Header = (): React.ReactElement => {
  return (
    <header className="bg-dark text-white py-3 mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="mb-0">
              <i className="bi bi-box me-2"></i>
              Shipping Rate Comparison
            </h1>
            <p className="mb-0 text-light">Compare rates from USPS, FedEx, UPS, and DHL</p>
          </div>
          <div>
            <button className="btn btn-outline-light">
              <i className="bi bi-gear me-1"></i>
              Settings
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;