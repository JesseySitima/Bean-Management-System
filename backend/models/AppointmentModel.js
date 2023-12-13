import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Patients from './PatientModel.js';
import Doctors from './DoctorModel.js';


const { DataTypes } = Sequelize;

const Appointments = db.define('appointments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patientId: {
    type: DataTypes.STRING, // Change the type to STRING to match the Patients model
    allowNull: false,
    references: {
      model: Patients,
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Doctors, // Reference to the Doctors model
      key: 'doctor_id',
    },
  },
  appointmentDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Scheduled', 'Canceled', 'Completed', 'Rescheduled', 'Pending'),
    defaultValue: 'Scheduled',
  },
  reason: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  createdTimestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedTimestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  freezeTableName: true,
});

// Define relationships with Patients and Doctors models
Appointments.belongsTo(Patients, { foreignKey: 'patientId' });
Appointments.belongsTo(Doctors, { foreignKey: 'doctorId' });

// Sync the Appointments model with the database
(async () => {
  await Appointments.sync();
})();

export default Appointments;
