import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

// components
const ResetPassword = React.lazy(() => import('public/features/auth/login/forgotpassword/resetPassword'));
const Login = React.lazy(() => import('public/features/auth/login/login'));
const Register = React.lazy(() => import('public/features/auth/register/register'));
const Confirm = React.lazy(() => import('public/features/auth/register/confirm'));
const ForgetPassword = React.lazy(() => import('public/features/auth/login/forgotpassword/forgotpassword'));
const UserActivation = React.lazy(() => import('public/features/auth/register/activation'));
const OtpVerifY = React.lazy(() => import('public/features/auth/register/otpverification'));

// profile
const Myprofile = React.lazy(() => import('admin/features/myprofile/myprofile'));
const EditMyproile = React.lazy(() => import('admin/features/myprofile/editProfile'));
const AddFamily = React.lazy(() => import('admin/features/myprofile/family/addFamily'));
const EditFamily = React.lazy(() => import('admin/features/myprofile/family/editFamily'));
const AddDeceased = React.lazy(() => import('admin/features/myprofile/deceased/addDeceased'));
const EditDeceased = React.lazy(() => import('admin/features/myprofile/deceased/editDeceased'));
const Logout = React.lazy(() => import('public/features/auth/logout'));

export interface RoutesProps {
    path: RouteProps['path'];
    name?: string;
    element?: RouteProps['element'];
    route?: any;
    userRole?:string;
    allowedRoles?:string[];
    exact?: boolean;
    icon?: string;
    header?: string;
    roles?: string[];
    children?: RoutesProps[];
}

const authRoutes: RoutesProps[] = [
    {
        path: '/login',
        name: 'Login',
        element: <Login />,
        route: Route,
    },
    {
        path: '/passwordReset',
        name: 'ResetPassword',
        element: <ResetPassword />,
        route: Route,
    },
    {
        path: '/signup',
        name: 'Register',
        element: <Register />,
        route: Route,
    },
    {
        path: '/confirm',
        name: 'Confirm',
        element: <Confirm />,
        route: Route,
    },
    {
        path: '/forget-password',
        name: 'ForgetPassword',
        element: <ForgetPassword />,
        route: Route,
    },
    {
        path: '/useractivation/:id',
        name: 'UserActivation',
        element: <UserActivation />,
        route: Route,
    },
    {
        path: '/verifyOTP/:num/:code',
        name: 'DonationDetails',
        element: <OtpVerifY />,
        route: Route,
    },
];

// Member routes
const profileRoutes: RoutesProps[] = [{
    path: '/myprofile',
    name: 'Profile',

    roles: ['ROLE_USER'],
    children: [
        {
            path: '/myprofile/profileview',
            name: 'Myprofile',
            element: <Myprofile />,

        },
        {
            path: '/myprofile/edit-profile',
            name: 'EditProfile',
            element: <EditMyproile />,

        },
        {
            path: '/myprofile/addfamily',
            name: 'AddFamily',
            element: <AddFamily />,

        },
        {
            path: '/myprofile/editfamily/:id',
            name: 'EditFamly',
            element: <EditFamily />,

        },
        {
            path: '/myprofile/add-deceased',
            name: 'AddDeceased',
            element: <AddDeceased />,

        },
        {
            path: '/myprofile/edit-deceased/:id',
            name: 'EditDeased',
            element: <EditDeceased />,
        },
        {
            path: '/auth/logout',
            name: 'Logout',
            element: <Logout />,
        },
    ],
}];

const flattenRoutes = (routes: RoutesProps[]) => {
    let flatRoutes: RoutesProps[] = [];

    routes = routes || [];
    routes.forEach((item: RoutesProps) => {
        flatRoutes.push(item);
        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

const AuthPublic = [...authRoutes];
const AuthPrivate = [...profileRoutes];

const AuthpublicFlattenRoutes = flattenRoutes([...AuthPublic]);
const AuthProtectedFlattenRoutes = flattenRoutes([...AuthPrivate]);

export {
    AuthpublicFlattenRoutes,
    AuthProtectedFlattenRoutes,
};
