import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

// components
const Checkout = React.lazy(() => import('member/features/shop/checkout/checkout'));
const ViewCart = React.lazy(() => import('member/features/shop/cart/cart'));
const GroceryList = React.lazy(() => import('member/features/donations/grocery/donateGrocery'));
const GroceryCheckout = React.lazy(() => import('member/features/donations/grocery/groceryCheckout'));
const MyDonations = React.lazy(() => import('member/features/donations/mydonations/mydonations'));
const MyBookings = React.lazy(() => import('member/features/reports'));
const ServiceBook = React.lazy(() => import('member/features/services/serviceBook'));
const ServiceSuccess = React.lazy(() => import('member/features/services/serviceSuccess'));
const ServiceConfirm = React.lazy(() => import('member/features/services/serviceConfirm'));
const SevaBook = React.lazy(() => import('member/features/bookings/sevaBook'));
const DonateForm = React.lazy(() => import('member/features/donations/donateForm'));
const DonateConfirm = React.lazy(() => import('member/features/donations/donationConfirm'));
const DonatePaymentPage = React.lazy(() => import('member/features/donations/paymentPage'));
const ConfirmSevaBook = React.lazy(() => import('member/features/bookings/sevaConfirm'));
const EventBook = React.lazy(() => import('member/features/events/eventBook'));
const EventPaymentPage = React.lazy(() => import('member/features/events/eventPayment'));
const OtherDonations = React.lazy(() => import('member/features/donations/Otherdonation'));
const MemberStore = React.lazy(() => import('member/features/shop/memberView'));
const MemberServices = React.lazy(() => import('member/features/services/memberview/serviceList'));
const MemberSevas = React.lazy(() => import('member/features/bookings/memberview/sevaList'));
const MemberEvents = React.lazy(() => import('member/features/events/memberview/eventList'));
const Dashboard = React.lazy(() => import('admin/features/dashboard'));

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

const CartRoutes : RoutesProps = {
    path: '/cart/',
    name: 'Cart',
    roles: ['ROLE_USER'],
    children: [
        {
            path: '/cart/view-cart',
            name: 'Cart',
            element: <ViewCart />,
        },
    ],
};

const bookingsReportRoutes: RoutesProps = {
    path: '/mybookings/',
    name: 'MyBookings',
    roles: ['ROLE_USER'],
    children: [
        {
            path: '/mybookings/lists',
            name: 'Mydonations',
            element: <MyBookings />,
        },
        {
            path: '/service-book/:id',
            name: 'ServiceBook',
            element: <ServiceBook />,
        },
        {
            path: '/confirm-booking-details',
            name: 'ServiceBook',
            element: <ServiceConfirm />,
        },
        {
            path: '/payment-booking',
            name: 'ServiceBook',
            element: <ServiceSuccess />,
        },
        {
            path: '/seva-book/:id',
            name: 'SevaBook',
            element: <SevaBook />,
        },
        {
            path: '/confirm-seva-details',
            name: 'SevaBook',
            element: <ConfirmSevaBook />,
        },
        {
            path: '/event-book/:id',
            name: 'EventBook',
            element: <EventBook />,
        },
        {
            path: '/event-payment/:id',
            name: 'Event payment',
            element: <EventPaymentPage />,
        },
        {
            path: '/Checkout',
            name: 'Checkout',
            element: <Checkout />,
        },
        {
            path: '/otherdonations',
            name: 'donationtypes',
            element: <OtherDonations />,
        },
        {
            path: '/online-store',
            name: 'store',
            element: <MemberStore />,
        },
        {
            path: '/online-booking/services',
            name: 'onlineservices',
            element: <MemberServices />,
        },
        {
            path: '/online-booking/sevas',
            name: 'onlinesevas',
            element: <MemberSevas />,
        },
        {
            path: '/online-booking/events',
            name: 'onlineevents',
            element: <MemberEvents />,
        },
    ],
};

const userDonationReportsRoutes: RoutesProps = {
    path: '/mydonations/',
    name: 'DonateGrocry',
    roles: ['ROLE_USER'],
    children: [
        {
            path: '/mydonations/list',
            name: 'Mydonations',
            element: <MyDonations />,
        },
        {
            path: '/donation-confirm/:id',
            name: 'DonationDetails',
            element: <DonateForm />,
            route: Route,
        },
        {
            path: '/confirm-donation-details',
            name: 'DonationDetails',
            element: <DonateConfirm />,
            route: Route,
        },
        {
            path: '/donation-payment/:param1/:param2',
            name: 'DonationDetails',
            element: <DonatePaymentPage />,
            route: Route,
        },
    ],
};

const userGroceryRoutes: RoutesProps = {
    path: '/donation/grocery',
    name: 'DonateGrocry',

    roles: ['ROLE_USER'],
    children: [
        {
            path: '/donation/grocery/list',
            name: 'Events',
            element: <GroceryList />,

        },
        {
            path: '/donation/grocery/checkout',
            name: 'Checkout',
            element: <GroceryCheckout />,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            element: <Dashboard />,
        },
    ],
};

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

const noAdminProtectedRoutes = [
    userGroceryRoutes,
    userDonationReportsRoutes,
    bookingsReportRoutes,
    CartRoutes,
];

const memberFlatterRoutes = flattenRoutes([...noAdminProtectedRoutes]);

export {
    memberFlatterRoutes,
};
