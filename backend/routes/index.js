import express from "express";
import { getUsers, Register, Login, Logout, getDashboardContent } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { createPatient, getPatients, getPatientById, updatePatient, deletePatient, countPatients, getRecentPatients } from "../controllers/Patients.js";
import { checkAdminRole } from "../middleware/CheckRoles.js";
import { createDoctor, getDoctors, countDoctors, getDoctorById, updateDoctor, deleteDoctor, getRecentDoctors } from "../controllers/Doctors.js";
import { getDepartments } from "../controllers/Departments.js";
import { getAppointments, createAppointment, getAppointmentById, updateAppointment, deleteAppointment, getRecentAppointments, countAppointments, countActiveAppointments, countCancelledAppointments, countCompletedAppointments, } from '../controllers/Appointments.js';
import { getMedicalRecords, createMedicalRecord, getMedicalRecordById, updateMedicalRecord, deleteMedicalRecord } from '../controllers/MedicalRecords.js';

 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/dashboard', verifyToken, checkAdminRole, getDashboardContent);



// Routes for Patients
router.post('/patients', createPatient); // Create a new patient
router.get('/patients', getPatients); // Get all patients
router.get('/countPatients', countPatients); // Get all patients
router.get('/recentPatients', getRecentPatients); // Get all patients
router.get('/patients/:id', getPatientById); // Get a specific patient by ID
router.put('/patients/:id', updatePatient); // Update a specific patient by ID
router.delete('/patients/:id', deletePatient); // Delete a specific patient by ID

// Routes for Doctors
router.post('/doctors', createDoctor); // Create a new doctor
router.get('/doctors', getDoctors); // Get all doctors
router.get('/countDoctors', countDoctors); // Get count of all doctors
router.get('/recentDoctors', getRecentDoctors); // Get recent doctors
router.get('/doctors/:doctorId', getDoctorById); // Get a specific doctor by ID
router.put('/doctors/:doctorId', updateDoctor); // Update a specific doctor by ID
router.delete('/doctors/:doctorId', deleteDoctor); // Delete a specific doctor by ID

// Routes for Appointsments
router.post('/appointments', createAppointment); // Create a new appointment
router.get('/appointments', getAppointments); // Get all appointments
router.get('/countAppointments', countAppointments); // Get count of all appointments
router.get('/recentAppointments', getRecentAppointments); // Get recent appointments
router.get('/appointments/:appointmentId', getAppointmentById); // Get a specific appointment by ID
router.put('/appointments/:appointmentId', updateAppointment); // Update a specific appointment by ID
router.delete('/appointments/:appointmentId', deleteAppointment); // Delete a specific appointment by ID
router.get('/appointments/count/active', countActiveAppointments);
router.get('/appointments/count/cancelled', countCancelledAppointments);
router.get('/appointments/count/completed', countCompletedAppointments);


// Routes for Departments
router.get('/departments', getDepartments); // Get all doctors

// Routes for Medical Records
router.post('/medical-records', createMedicalRecord); // Create a new medical record
router.get('/medical-records', getMedicalRecords); // Get all medical records
router.get('/medical-records/:id', getMedicalRecordById); // Get a specific medical record by ID
router.put('/medical-records/:id', updateMedicalRecord); // Update a specific medical record by ID
router.delete('/medical-records/:id', deleteMedicalRecord); // Delete a specific medical record by ID



export default router;