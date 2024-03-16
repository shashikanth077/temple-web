import React from 'react';
import { RouteProps } from 'react-router-dom';

// components
const AdminDashboard = React.lazy(() => import('admin/features/dashboard'));
const ProductManage = React.lazy(() => import('admin/features/products'));
const AdminGod = React.lazy(() => import('admin/features/godmaster'));
const Services = React.lazy(() => import('admin/features/services'));
const Addproduct = React.lazy(() => import('admin/features/products/addProduct'));
const EditProduct = React.lazy(() => import('admin/features/products/EditProduct'));
const AdminEvents = React.lazy(() => import('admin/features/events/events'));
const AddEvent = React.lazy(() => import('admin/features/events/addEvent'));
const EditEvent = React.lazy(() => import('admin/features/events/editEvent'));
const AdminUsers = React.lazy(() => import('admin/features/users'));
const Adduser = React.lazy(() => import('admin/features/users/addUser'));
const EditUser = React.lazy(() => import('admin/features/users/editUser'));
const AddGods = React.lazy(() => import('admin/features/godmaster/addGod'));
const EditGod = React.lazy(() => import('admin/features/godmaster/editGod'));
const Addservice = React.lazy(() => import('admin/features/services/addService'));
const Editservice = React.lazy(() => import('admin/features/services/editService'));
const AdminGroceries = React.lazy(() => import('admin/features/grocery'));
const AddGrocerys = React.lazy(() => import('admin/features/grocery/addGrocery'));
const EditGrocerys = React.lazy(() => import('admin/features/grocery/EditGrocery'));
const IncomeReports = React.lazy(() => import('admin/features/reports/reports'));
const BookingTypes = React.lazy(() => import('admin/features/bookings'));
const EditBookingTypes = React.lazy(() => import('admin/features/bookings/editBooking'));
const AddBookingTypes = React.lazy(() => import('admin/features/bookings/addBooking'));
const DonationTypes = React.lazy(() => import('admin/features/donations'));
const AddDonationType = React.lazy(() => import('admin/features/donations/addDonation'));
const EditDonationType = React.lazy(() => import('admin/features/donations/editDonation'));
const SiteManage = React.lazy(() => import('admin/features/sitemanager/siteManager'));
const AdminVolunteersList = React.lazy(() => import('admin/features/volunteers'));
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

const productRoutes: RoutesProps = {
    path: '/admin/products',
    name: 'Products',

    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/admin/products/list',
            name: 'Products',
            element: <ProductManage />,

        },
        {
            path: '/admin/products/add',
            name: 'AddProduct',
            element: <Addproduct />,

        },
        {
            path: '/admin/products/edit/:id',
            name: 'EditProduct',
            element: <EditProduct />,

        },
        {
            path: '/dashboard',
            name: 'dashboard',
            element: <Dashboard />,
        },
    ],
};

const SiteManagerRoutes:RoutesProps = {
    path: '/admin/site-manager',
    name: 'Site Manager',
    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/admin/site-manager/manage',
            name: 'Site Manager',
            element: <SiteManage />,
        },
    ],

};

const VolunteersRoutes:RoutesProps = {
    path: '/admin/volunteers',
    name: 'Volunteers',
    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/admin/volunteers/list',
            name: 'Volunteers',
            element: <AdminVolunteersList />,
        },
    ],
};

const dashboardRoutes:RoutesProps = {
    path: '/dashboard',
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
    name: 'dashboard',
    element: <AdminDashboard />,
};

const eventsRoutes: RoutesProps = {
    path: '/admin/events',
    name: 'Events',

    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/admin/events/list',
            name: 'Events',
            element: <AdminEvents />,

        },
        {
            path: '/admin/events/add',
            name: 'AddEvent',
            element: <AddEvent />,

        },
        {
            path: '/admin/events/edit/:id',
            name: 'EditEvent',
            element: <EditEvent />,

        },
    ],
};

const groceryRoutes: RoutesProps = {
    path: '/admin/groceries',
    name: 'Events',

    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/admin/groceries/list',
            name: 'Grocery',
            element: <AdminGroceries />,

        },
        {
            path: '/admin/groceries/addGrocery',
            name: 'AddGrocery',
            element: <AddGrocerys />,

        },
        {
            path: '/admin/groceries/editGrocery/:id',
            name: 'EditGrocery',
            element: <EditGrocerys />,

        },
    ],
};

const GodsRoutes: RoutesProps = {
    path: '/admin/gods',
    name: 'Gods',

    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/admin/gods/list',
            name: 'Events',
            element: <AdminGod />,

        },
        {
            path: '/admin/gods/add',
            name: 'addGod',
            element: <AddGods />,

        },
        {
            path: '/admin/gods/god/edit/:id',
            name: 'editGod',
            element: <EditGod />,

        },
    ],
};

const ServicesRoutes: RoutesProps = {
    path: '/admin/services',
    name: 'Services',
    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/admin/services/list',
            name: 'ServicesList',
            element: <Services />,

        },
        {
            path: '/admin/services/add',
            name: 'addGod',
            element: <Addservice />,

        },
        {
            path: '/admin/services/edit/:id',
            name: 'editGod',
            element: <Editservice />,

        },
    ],
};

const donationTypesRoutes: RoutesProps = {
    path: '/admin/donationtypes',
    name: 'DonationTypes',
    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/admin/donationtypes/list',
            name: 'ServicesList',
            element: <DonationTypes />,

        },
        {
            path: '/admin/donationtypes/add',
            name: 'addGod',
            element: <AddDonationType />,

        },
        {
            path: '/admin/donationtypes/edit/:id',
            name: 'editGod',
            element: <EditDonationType />,

        },
    ],
};

const bookingAdminRoutes: RoutesProps = {
    path: '/admin/bookingtypes',
    name: 'Bookings',

    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/admin/bookingtypes/list',
            name: 'ServicesList',
            element: <BookingTypes />,

        },
        {
            path: '/admin/bookingtypes/add',
            name: 'addGod',
            element: <AddBookingTypes />,

        },
        {
            path: '/admin/bookingtypes/edit/:id',
            name: 'editGod',
            element: <EditBookingTypes />,

        },
    ],
};

const UsersRoutes: RoutesProps = {
    path: '/admin/users',
    name: 'Users',

    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/admin/users/list',
            name: 'Users',
            element: <AdminUsers />,

        },
        {
            path: '/admin/users/add',
            name: 'Adduser',
            element: <Adduser />,

        },
        {
            path: '/admin/users/edit/:id',
            name: 'Edituser',
            element: <EditUser />,

        },
    ],
};

const incomeReportsRoutes: RoutesProps = {
    path: '/incomereports/',
    name: 'InComeReports',
    roles: ['ROLE_ADMIN'],
    children: [
        {
            path: '/incomereports/list',
            name: 'InComeReports',
            element: <IncomeReports />,
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

const authProtectedRoutes = [
    productRoutes,
    VolunteersRoutes,
    SiteManagerRoutes,
    eventsRoutes,
    groceryRoutes,
    GodsRoutes,
    ServicesRoutes,
    UsersRoutes,
    incomeReportsRoutes,
    bookingAdminRoutes,
    donationTypesRoutes,
    dashboardRoutes,
];

const adminProtectedRoutes = flattenRoutes([...authProtectedRoutes]);

export {
    adminProtectedRoutes,
};
