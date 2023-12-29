import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

// components

const Home = React.lazy(() => import('../features/home/Home'));
const About = React.lazy(() => import('../features/about/about'));
const Contact = React.lazy(() => import('../features/contact/contact'));
const ShopLayout = React.lazy(() => import('../features/shop/shopLayout'));
const Checkout = React.lazy(() => import('../features/shop/checkout/checkout'));
const ViewCart = React.lazy(() => import('../features/shop/cart/cart'));
const ResetPassword = React.lazy(() => import('../features/auth/login/forgotpassword/resetPassword'));
const Events = React.lazy(() => import('../features/events/pages/event'));
const EventDetails = React.lazy(() => import('../features/events/pages/eventDetails/eventDetails'));
const AdminDashboard = React.lazy(() => import('../admin/features/dashboard'));
const ProductManage = React.lazy(() => import('../admin/features/products'));
const Login = React.lazy(() => import('../features/auth/login/login'));
const Register = React.lazy(() => import('../features/auth/register/register'));
const Confirm = React.lazy(() => import('../features/auth/register/confirm'));
const ForgetPassword = React.lazy(() => import('../features/auth/login/forgotpassword/forgotpassword'));
const Myprofile = React.lazy(() => import('../admin/features/myprofile/myprofile'));
const EditMyproile = React.lazy(() => import('../admin/features/myprofile/editProfile'));
const AdminGod = React.lazy(() => import('../admin/features/godmaster'));
const Services = React.lazy(() => import('../admin/features/services'));
const AddFamily = React.lazy(() => import('../admin/features/myprofile/family/addFamily'));
const EditFamily = React.lazy(() => import('../admin/features/myprofile/family/editFamily'));
const AddDeceased = React.lazy(() => import('../admin/features/myprofile/deceased/addDeceased'));
const EditDeceased = React.lazy(() => import('../admin/features/myprofile/deceased/editDeceased'));
const Addproduct = React.lazy(() => import('../admin/features/products/addProduct'));
const EditProduct = React.lazy(() => import('../admin/features/products/EditProduct'));
const AdminEvents = React.lazy(() => import('../admin/features/events/events'));
const AddEvent = React.lazy(() => import('../admin/features/events/addEvent'));
const EditEvent = React.lazy(() => import('../admin/features/events/editEvent'));
const Logout = React.lazy(() => import('../features/auth/logout'));
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
const GroceryList = React.lazy(() => import('features/donations/grocery/donateGrocery'));
const GroceryCheckout = React.lazy(() => import('features/donations/grocery/groceryCheckout'));
const MyDonations = React.lazy(() => import('features/donations/mydonations/mydonations'));
const UnAuth = React.lazy(() => import('features/UnAuth'));
const MyBookings = React.lazy(() => import('features/bookings/reports/Reports'));

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
        path: '/viewcart',
        name: 'Viewcart',
        element: <ViewCart />,
        route: Route,
    },
    {
        path: '/Checkout',
        name: 'Checkout',
        element: <Checkout />,
        route: Route,
    },
    {
        path: '/events',
        name: 'Events',
        element: <Events />,
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
        path: '/ResetPassword',
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
];

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
    ],
};

const dashboardRoutes:RoutesProps = {
    path: '/dashboard',
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
    name: 'dashboard',
    element: <AdminDashboard />,

};

const logoutRoutes:RoutesProps = {
    path: '/auth/logout',
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
    name: 'logout',
    element: <Logout />,

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

// Member routes
const profileRoutes: RoutesProps = {
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
    eventsRoutes,
    groceryRoutes,
    GodsRoutes,
    ServicesRoutes,
    UsersRoutes,
];

const bothMemberAdminRoutes = [
    dashboardRoutes,
    logoutRoutes,
    profileRoutes,
];

const noAdminProtectedRoutes = [
    userGroceryRoutes,
    userDonationReportsRoutes,
    bookingsReportRoutes,
];

const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
const noAdminProtectedFlattenRoutes = flattenRoutes([...noAdminProtectedRoutes]);
const bothMemberAdminFlattenRoutes = flattenRoutes([...bothMemberAdminRoutes]);

export {
    authProtectedFlattenRoutes,
    publicProtectedFlattenRoutes,
    noAdminProtectedFlattenRoutes,
    bothMemberAdminFlattenRoutes,
};
