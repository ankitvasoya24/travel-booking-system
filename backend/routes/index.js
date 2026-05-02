const express = require('express');
const packagecontroller = require('../controller/packageController');
const destinations = require('../controller/Destinationcontroller');
const hotelcontroller = require('../controller/Hotelscontroller');
const flightController = require("../controller/Flightscontroller");
const userController = require('../controller/userController');
const adminController = require("../controller/admincontroller");
const router = express.Router();
const authMiddleware = require("../middleware/userMiddleware");
const verifyAdminToken = require('../middleware/adminMiddleware');
const bookingController = require("../controller/Bookingcon");
const bookingDestination = require("../controller/Bookingdestination");

//admin
router.post("/admin/create", adminController.createAdmin);
router.post('/admin/adminlogin', adminController.adminLogin);
router.get('/admin/getadmin', verifyAdminToken, adminController.getadmin);
router.delete('/admin/delete/:id', verifyAdminToken, adminController.deleteAdmin);

//user
router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);
router.get('/user/getuser',authMiddleware, userController.getUsers);

router.get('/admin/getuser',verifyAdminToken, userController.getUsers);
router.get('/admin/getadmin', verifyAdminToken, userController.getUsers);

router.delete('/user/delete/:id', authMiddleware, userController.deleteUser);

//Package
router.post('/package/create', verifyAdminToken,packagecontroller.createPackage);
router.get('/package/getall', packagecontroller.getAllPackages);
router.get('/package/:id', packagecontroller.getPackageById);
router.put('/package/update/:id', verifyAdminToken, packagecontroller.updatePackage);
router.delete('/package/delete/:id', verifyAdminToken, packagecontroller.deletePackage);

//Destination
router.post("/destination/create", verifyAdminToken, destinations.createDestination);
router.get("/destination/getall", destinations.getAllDestination);
router.get("/destination/book/:id", destinations.getPackageById);
router.put("/destination/update/:id", verifyAdminToken,destinations.updateDestination);
router.delete("/destination/delete/:id", verifyAdminToken, destinations.deleteDestination);

//Book destination
router.post("/booking/create", bookingDestination.createBooking);
router.get("/booking/alldestination", bookingDestination.getAllDestinationBookings);

//Hotels
router.post("/hotel/create",verifyAdminToken, hotelcontroller.createHotel);
router.get("/hotel/getall", hotelcontroller.getAllHotels);
router.get("/hotel/:id", hotelcontroller.getHotelById);
router.put("/hotel/update/:id",verifyAdminToken, hotelcontroller.updateHotel);
router.delete("/hotel/delete/:id",verifyAdminToken, hotelcontroller.deleteHotel);

//Flights
router.get("/flight/getall",flightController.getAllFlights);
router.get("/flight/:id", flightController.getFlightById);
router.post("/flight/create",verifyAdminToken, flightController.createFlight);
router.put("/flight/update/:id",verifyAdminToken, flightController.updateFlight);
router.delete("/flight/delete/:id",verifyAdminToken, flightController.deleteFlight);

//Booking :-
// USER
router.post("/booking/create", authMiddleware, bookingController.createBooking);
router.get("/booking/my-bookings",authMiddleware, bookingController.getUserBookings);
// ADMIN
router.get("/booking/all", verifyAdminToken, bookingController.getAllBookings);

module.exports = router;
