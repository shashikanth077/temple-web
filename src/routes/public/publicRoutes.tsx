import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

// components
const Home = React.lazy(() => import('public/features/home/Home'));
const About = React.lazy(() => import('public/features/about/about'));
const Contact = React.lazy(() => import('public/features/contact/contact'));
const ShopLayout = React.lazy(() => import('public/features/products/shopLayout'));
const ResetPassword = React.lazy(() => import('public/features/auth/login/forgotpassword/resetPassword'));
const Events = React.lazy(() => import('public/features/events/event'));
const EventDetails = React.lazy(() => import('public/features/events/eventDetails/eventDetails'));
const Login = React.lazy(() => import('public/features/auth/login/login'));
const Register = React.lazy(() => import('public/features/auth/register/register'));
const Confirm = React.lazy(() => import('public/features/auth/register/confirm'));
const ForgetPassword = React.lazy(() => import('public/features/auth/login/forgotpassword/forgotpassword'));
const UnAuth = React.lazy(() => import('sharedComponents/UnAuth'));
const ProductDetails = React.lazy(() => import('public/features/products/products/Details/Product'));
const DonationList = React.lazy(() => import('public/features/donations/userdonations'));
const UserActivation = React.lazy(() => import('public/features/auth/register/activation'));
const SevaTypes = React.lazy(() => import('public/features/bookings/bookingList'));
const UserServiceList = React.lazy(() => import('public/features/services/serviceList'));
const UserServiceDetails = React.lazy(() => import('public/features/services/serviceDetails'));
const Voluteers = React.lazy(() => import('public/features/volunteers/volunteers'));
const SevaDetails = React.lazy(() => import('public/features/bookings/bookingDetails'));
const DonationDetails = React.lazy(() => import('public/features/donations/donationDetails'));
const OtpVerifY = React.lazy(() => import('public/features/auth/register/otpverification'));
const GodList = React.lazy(() => import('public/features/services/godList'));
const GodDetails = React.lazy(() => import('public/features/services/godDetails'));

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

// public routes
const otherPublicRoutes: RoutesProps[] = [
    {
        path: '/',
        name: 'Home',
        element: <Home />,
        route: Route,
    },
    {
        path: '/permission-access-denied',
        name: 'unAuth',
        element: <UnAuth />,
        route: Route,
    },
    {
        path: '/home',
        name: 'Home',
        element: <Home />,
        route: Route,
    },
    {
        path: '/about',
        name: 'About',
        element: <About />,
        route: Route,
    },
    {
        path: '/contact',
        name: 'Contact',
        element: <Contact />,
        route: Route,
    },
    {
        path: '/purchase',
        name: 'Purchase',
        element: <ShopLayout />,
        route: Route,
    },
    {
        path: '/events',
        name: 'Events',
        element: <Events />,
        route: Route,
    },
    {
        path: '/events/eventsdetails/:id',
        name: 'EventDetails',
        element: <EventDetails />,
        route: Route,
    },
    {
        path: '/donations/types/',
        name: 'DonationsTypes',
        element: <DonationList />,
        route: Route,
    },
    {
        path: '/products/details/:id',
        name: 'Products',
        element: <ProductDetails />,
        route: Route,
    },
    {
        path: '/seva-types',
        name: 'Seva types',
        element: <SevaTypes />,
        route: Route,
    },
    {
        path: '/service-list/:id',
        name: 'Service types',
        element: <UserServiceList />,
        route: Route,
    },
    {
        path: '/service-details/:id',
        name: 'Service Details',
        element: <UserServiceDetails />,
        route: Route,
    },
    {
        path: '/volunteers',
        name: 'Voluteers',
        element: <Voluteers />,
        route: Route,
    },
    {
        path: '/seva-details/:id',
        name: 'SevaDetails',
        element: <SevaDetails />,
        route: Route,
    },
    {
        path: '/donation-details/:id',
        name: 'DonationDetails',
        element: <DonationDetails />,
        route: Route,
    },
    {
        path: '/verifyOTP/:num/:code',
        name: 'DonationDetails',
        element: <OtpVerifY />,
        route: Route,
    },
    {
        path: '/gods',
        name: 'Godlist',
        element: <GodList />,
        route: Route,
    },
    {
        path: '/god-details/:id',
        name: 'GodDetails',
        element: <GodDetails />,
        route: Route,
    },
];

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
];

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

const publicRoutes = [...otherPublicRoutes];

const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
const publicAuthFlattenRoutes = flattenRoutes([...authRoutes]);

export {
    publicProtectedFlattenRoutes,
    publicAuthFlattenRoutes,
};
