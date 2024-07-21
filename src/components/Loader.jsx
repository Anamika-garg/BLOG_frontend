import React from 'react';
import load from '../../public/load.gif';

const Loader = () => {
  return (
    <div className="center loader">
        <div className="loader loader_image">
            <img src={load} alt="Loading..." />
        </div>
    </div>
  )
}

export default Loader