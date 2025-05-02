import React from 'react';

const Footer = (): React.ReactElement => {
  return (
    <footer className="bg-light py-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Shipping Rate Comparison Tool
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              <small className="text-muted">
                Rates are estimates and may vary. Not affiliated with any carrier.
              </small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;