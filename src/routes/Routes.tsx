import React from 'react';
import { Route, Routes } from 'react-router-dom';

// All layouts containers
import {
    publicProtectedFlattenRoutes,
    adminProtectedRoutes,
    memberFlatterRoutes,
    AuthProtectedFlattenRoutes,
    AuthpublicFlattenRoutes,
} from './index';
import { AuthProtected } from './PrivateRoute';
import DefaultLayout from 'public/layout';
import PageNotFound from 'sharedComponents/404Page';
import AuthLayout from 'admin/layout/index';
import { useUser } from 'hooks';

/* eslint-disable */
interface RoutesProps { }


const AllRoutes = (props: RoutesProps) => {

    const [loggedInUser] = useUser();

    let RoleStatus;
    if (loggedInUser?.roles?.includes('ROLE_ADMIN') && loggedInUser?.roles?.includes('ROLE_USER')) {
        RoleStatus = 'BOTH';
    } else if (loggedInUser?.roles?.includes('ROLE_ADMIN')) {
        RoleStatus = 'ROLE_ADMIN';
    } else if (loggedInUser?.roles?.includes('ROLE_USER')) {
        RoleStatus = 'ROLE_USER';
    }


    return (
        <Routes>
            <Route>
                {publicProtectedFlattenRoutes.map((route, idx) => (
                    <Route
                        path={route.path}
                        element={(
                            <DefaultLayout {...props} >
                                {route.element}
                            </DefaultLayout>
                        )}
                        key={idx}
                    />
                ))}
            </Route>

            <Route>
                {AuthpublicFlattenRoutes.map((route, idx) => (
                    <Route
                        path={route.path}
                        element={(
                            <DefaultLayout {...props} >
                                {route.element}
                            </DefaultLayout>
                        )}
                        key={idx}
                    />
                ))}
            </Route>

            {(RoleStatus === 'ROLE_USER' || RoleStatus === 'ROLE_ADMIN' || RoleStatus === 'BOTH') &&
                <Route>
                    {AuthProtectedFlattenRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected>
                                    <AuthLayout {...props}>{route.element}</AuthLayout>
                                </AuthProtected>
                            }
                            key={idx}
                        />
                    ))}
                </Route>
            }

            {(RoleStatus === 'ROLE_USER') &&
                <Route>
                    {memberFlatterRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected>
                                    <AuthLayout {...props}>{route.element}</AuthLayout>
                                </AuthProtected>
                            }
                            key={idx}
                        />
                    ))}
                </Route>
            }

            {(RoleStatus === 'ROLE_ADMIN') &&
                <Route>
                    {adminProtectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected>
                                    <AuthLayout {...props}>{route.element}</AuthLayout>
                                </AuthProtected>
                            }
                            key={idx}
                        />
                    ))}
                </Route>
            }

            {(RoleStatus === 'BOTH') &&
                <Route>
                    {adminProtectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected>
                                    <AuthLayout {...props}>{route.element}</AuthLayout>
                                </AuthProtected>
                            }
                            key={idx}
                        />
                    ))}
                    {memberFlatterRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected>
                                    <AuthLayout {...props}>{route.element}</AuthLayout>
                                </AuthProtected>
                            }
                            key={idx}
                        />
                    ))}
                </Route>
            }
            <Route
                path="*"
                element={
                    <PageNotFound />
                }
            />
        </Routes>
    );
};

export default React.memo(AllRoutes);
