import React from 'react';

const DataNotFound = () => (
    <div className="container text-center mt-5 mb-6">
        <div className="card">
            <div className="card-body">
                <h1 className="card-title display-4 text-danger">No data Found</h1>
                <p className="card-text lead">Sorry, no data are available at the moment.</p>
                {/* You can add a button or link here to redirect the user to another page if needed */}
            </div>
        </div>
    </div>
);

export default DataNotFound;
