import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const loading = () => <div className="" />;

const Main = () => (
    <main className="main">
        <Suspense fallback={loading()}>
            <Outlet />
        </Suspense>
    </main>
);

export default React.memo(Main);
