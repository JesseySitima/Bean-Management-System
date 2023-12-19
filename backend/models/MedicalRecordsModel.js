import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Doctors from './DoctorModel.js';
import Patients from './PatientModel.js';

const { DataTypes } = Sequelize;

const MedicalRecords = db.define('medical_records', {
  recordID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  patientID: {
    type: DataTypes.STRING, // Assuming patientID is a string type
    allowNull: false,
    // Add foreign key constraint to link with Patients table
    references: {
      model: 'patients',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  dateRecorded: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  diagnosisID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Add foreign key constraint to link with Diagnosis table
    references: {
      model: 'Diagnoses', // Assuming your Diagnosis model is named 'Diagnoses'
      key: 'DiagnosisID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  treatment: {
    type: DataTypes.STRING,
  },
  doctorID: {
    type: DataTypes.INTEGER, // Assuming doctorID is an integer type
    allowNull: true,
    // Add foreign key constraint to link with Doctors table
    references: {
      model: 'doctors',
      key: 'doctor_id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  notes: {
    type: DataTypes.TEXT,
  },
  prescription: {
    type: DataTypes.STRING,
  },
  testResults: {
    type: DataTypes.TEXT,
  },
}, {
  freezeTableName: true,
});

// Define associations
MedicalRecords.belongsTo(Patients, { foreignKey: 'patientID' });


(async () => {
  await MedicalRecords.sync(); // Sync the MedicalRecords model with the database
})();

export default MedicalRecords;
