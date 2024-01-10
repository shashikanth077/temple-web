const express = require("express");
const jsonServer = require("json-server");
var cors = require('cors');

const content = require('./mock/content.mock.json');
const contacts = require('./mock/contact/contact.mock.json');
const banners = require('./mock/banner/banner.mock.json');
const menuitems = require('./mock/menu/menu.mock.json');
const services = require('./mock/services/service.mock.json');
const events = require('./mock/events/events.mock.json');
const bookingTypes = require('./mock/booking/booking.mock.json');
const Staffs = require('./mock/staffs/staff.mock.json');
const adversiments = require('./mock/adverstiments/adversiments.mock.json');
const about = require('./mock/about/about.mock.json');
const login = require('./mock/auth/login.mock.json');
const sendcontact = require('./mock/contact/sendcontact.mock.json');
const Cart = require('./mock/cart/cart.mock.json');
const Products = require('./mock/products/product.mock.json');
const AddCart = require('./mock/cart/cartres.mock.json');
const deleteCart = require('./mock/cart/deletecart.mock.json');
const descreaseQty = require('./mock/cart/descreasecart.mock.json');
const eventList = require('./mock/events/eventnew.mock.json');
const adminMenu = require('./mock/menu/adminmenu.mock.json');
const myProfile = require('./mock/myprofile/userdata.mock.json');
const Gods = require('./mock/services/gods.mock.json');
const AdminServices = require('./mock/services/adminservice.mock.json');
const addFamily = require('./mock/myprofile/addfamily.mock.json');
const GetFamilyById = require('./mock/myprofile/getFamily.mock.json');
const Contents = require('./mock/content.mock.json');
const Users = require('./mock/myprofile/users.mock.json');
const getUser = require('./mock/myprofile/getuser.mock.json');
const getGod = require('./mock/services/getGod.mock.json');
const getService = require('./mock/services/getService.mock.json');
const getGroceries = require('./mock/grocery/groceries.mock.json');
const mydonations = require('./mock/donations/mydonations.mock.json');
const mybookings = require('./mock/booking/adminbook.mock.json');
const incomeReports = require('./mock/reports/incomereports.mock.json');
const adminbookingTypes = require('./mock/booking/adminbooking.mock.json');
const admindonationTypes = require('./mock/donations/donationmaster.mock.json');


const server = express();

server.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);
server.options('*', cors());

const getJson = (node) => (req, res) => res.json(node);

server.all("/api/getContacts", getJson(contacts));
server.all("/api/getbanners", getJson(banners));
server.all("/api/content", getJson(content));
server.all("/api/getmenuItems", getJson(menuitems));
server.all("/api/getServices", getJson(services));
server.all("/api/getEvents", getJson(events));
server.all("/api/getbookinglist", getJson(bookingTypes));
server.all("/api/getStaffs", getJson(Staffs));
server.all("/api/getAdversiments", getJson(adversiments));
server.all("/api/getaboutImages", getJson(about));
server.all("/api/checkLogin", getJson(login));
server.all("/api/sendEnquiry", getJson(sendcontact));
server.all("/api/getCartDetails", getJson(Cart));
server.all("/api/getProducts", getJson(Products));
server.all("/api/Addtocart", getJson(AddCart));
server.all("/api/deletefromcart", getJson(deleteCart));
server.all("/api/decreaseqty", getJson(descreaseQty));
server.all("/api/events", getJson(eventList));
server.all("/api/getadminMenu", getJson(adminMenu));
server.all("/api/getMyprofileDetails", getJson(myProfile));
server.all("/api/getGodDetails", getJson(Gods));
server.all("/api/getServiceDetails", getJson(AdminServices));
server.all("/api/addfamily", getJson(addFamily));
server.all("/api/getFamilyByid", getJson(GetFamilyById));
server.all("/api/getStaticContent", getJson(Contents));
server.all("/api/users", getJson(Users));
server.all("/api/getuser/:id", getJson(getUser));
server.all("/api/getGod/:id", getJson(getGod));
server.all("/api/getService/:id", getJson(getService));
server.all("/api/getuser/:id", getJson(getUser));
server.all("/api/groceries", getJson(getGroceries));
server.all("/api/mydonations", getJson(mydonations));
server.all("/api/mybookings", getJson(mybookings));
server.all("/api/incomereports", getJson(incomeReports));
server.all("/api/bookingtypes", getJson(adminbookingTypes));
server.all("/api/donationtypes", getJson(admindonationTypes));

server.listen(4000);
