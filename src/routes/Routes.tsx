import React from 'react';
import { Route, Routes } from 'react-router-dom';

// All layouts containers
import {
    authProtectedFlattenRoutes,
    publicProtectedFlattenRoutes,
    noAdminProtectedFlattenRoutes,
    bothMemberAdminFlattenRoutes,

} from './index';
import { AuthProtected } from './PrivateRoute';
import PageNotFound from 'features/404Page';
import AuthLayout from 'admin/layout/index';
import DefaultLayout from 'layout/index';
import { useUser } from 'hooks';

/* eslint-disable */
interface RoutesProps { }


const AllRoutes = (props: RoutesProps) => {

    const [loggedInUser] = useUser();

    let RoleStatus;
    if (loggedInUser?.roles?.includes('ROLE_ADMIN')) {
        RoleStatus = 'ROLE_ADMIN';
    }

    if (loggedInUser?.roles?.includes('ROLE_USER') && !loggedInUser?.roles?.includes('ROLE_ADMIN')) {
        RoleStatus = 'ROLE_USER';
    }

    if (loggedInUser?.roles?.includes('ROLE_USER') && loggedInUser?.roles?.includes('ROLE_ADMIN')) {
        RoleStatus = 'BOTH';
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
                {bothMemberAdminFlattenRoutes.map((route, idx) => (
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

            {(RoleStatus === 'ROLE_ADMIN' || RoleStatus === 'BOTH') &&
                <Route>
                    {authProtectedFlattenRoutes.map((route, idx) => (
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

            <Route>
                {noAdminProtectedFlattenRoutes.map((route, idx) => (
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
