import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../settings';
import VinhomesLogo from '../../image/Vinhomes.png';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              <img alt="ảnh logo" src={VinhomesLogo} style={{ width: "4rem" }} />
            </Link>
          </h3>
        </div>
      ) : (
          <h3>
            <Link to="/dashboard">
              <img alt="ảnh logo" src={VinhomesLogo} style={{ width: "6rem" }} />
            </Link>
          </h3>
        )}
    </div>
  );
};
