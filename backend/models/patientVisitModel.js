import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Patients from './PatientModel.js';// Assuming you have Patients model defined in a separate file
import Doctors from './DoctorModel.js';

const { DataTypes } = Sequelize;

const Visit = db.define('visit', {
  visitId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  patientId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Patients,
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER, // Assuming doctors have their own ID field of type INTEGER
    allowNull: false,
 
     references: {
       model: Doctors,
       key: 'doctor_id',
     },
  },
  visitDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  consultationFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  labFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  otherFees: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  totalFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  freezeTableName: true,
  hooks: {
    // Before creating a visit record, calculate and set the totalFee
    beforeCreate: async (visit) => {
      visit.totalFee = calculateTotalFee(visit);
    },
    // Before updating a visit record, recalculate and set the totalFee
    beforeUpdate: async (visit) => {
      visit.totalFee = calculateTotalFee(visit);
    },
  },
});

// Define associations (relationships) between Visit and Patients models
Visit.belongsTo(Patients, {
  foreignKey: 'patientId',
});

// Function to calculate totalFee based on consultationFee, labFee, and otherFees
function calculateTotalFee(visit) {
  const consultationFee = parseFloat(visit.consultationFee) || 0;
  const labFee = parseFloat(visit.labFee) || 0;
  const otherFees = parseFloat(visit.otherFees) || 0;

  // Check if all fees are valid numbers before performing addition and formatting
  if (!isNaN(consultationFee) && !isNaN(labFee) && !isNaN(otherFees)) {
    const totalFee = consultationFee + labFee + otherFees;
    return totalFee.toFixed(2); // Convert totalFee to a fixed decimal format
  }

  return '0.00'; // Return a default value if any fee is not a valid number
}

(async () => {
  await Visit.sync(); // Sync the Visit model with the database
})();

export default Visit;