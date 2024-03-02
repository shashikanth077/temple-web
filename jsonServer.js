const express = require('express');
var cors = require('cors');

const menuitems = require('./mock/menu/menu.mock.json');
const bookingTypes = require('./mock/booking/booking.mock.json');
const adminMenu = require('./mock/menu/adminmenu.mock.json');
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

server.all('/api/getmenuItems', getJson(menuitems));
server.all('/api/getbookinglist', getJson(bookingTypes));
server.all('/api/getadminMenu', getJson(adminMenu));
server.all('/api/groceries', getJson(getGroceries));
server.all('/api/mydonations', getJson(mydonations));
server.all('/api/mybookings', getJson(mybookings));
server.all('/api/incomereports', getJson(incomeReports));
server.all('/api/bookingtypes', getJson(adminbookingTypes));
server.all('/api/donationtypes', getJson(admindonationTypes));

server.listen(4000);
