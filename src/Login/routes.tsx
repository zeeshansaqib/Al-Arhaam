


// Then in your ROUTES definition
import Login from "./Login";
import Dashboard from "../Dashboard/Dashboard";
import AddNewMember from "../AddNewMember/AddNewMember";
import BookNewAppointment from "../BookNewAppointment/BookNewAppointment";
import DisableDays from "../DisableDays/DisableDays";
import Logs from "../Logs/Logs";
import AllAppointments from "../AllAppointments/AllAppointments";

export const ROUTES = [
  {
    component: Login,
    isPublic: true,
    isProtected: false,
    path: "/login",
    slug: "login",
    title: "login",
    redirectTo: "/dashboard",
  },
  {
    component: Dashboard,
    isPublic: false,
    isProtected: true,
    path: "/dashboard",
    slug: "dashboard",
    title: "Dashboard",
    redirectTo: "/login",
  },
  {
    component: AddNewMember,
    isPublic: false,
    isProtected: true,
    path: "/admin-booking",
    slug: "Admin Booking",
    title: "Admin Booking",
    redirectTo: "/login",
  },
  {
    component: BookNewAppointment,
    isPublic: false,
    isProtected: true,
    path: "/book-appointment",
    slug: "Book New Appointment",
    title: "Book New Appointment",
    redirectTo: "/login",
  },
  {
    component: DisableDays,
    isPublic: false,
    isProtected: true,
    path: "/disable-dates",
    slug: "Disable Days",
    title: "Disable Days",
    redirectTo: "/login",
  },
  {
    component: Logs,
    isPublic: false,
    isProtected: true,
    path: "/logs",
    slug: "Logs",
    title: "Logs",
    redirectTo: "/login",
  },
  {
    component: AllAppointments,
    isPublic: false,
    isProtected: true,
    path: "/appointments",
    slug: "All Appointments",
    title: "All Appointments",
    redirectTo: "/login",
  }
  // Another example with userGuard
  

];
