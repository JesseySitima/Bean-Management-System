import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Patients = db.define('patients', {
  id: {
    type: DataTypes.STRING, // Change the data type to STRING for custom IDs
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: () => {
      // Generate a custom patient ID with prefix 'bean' and leading zeros if needed
      const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 99
      const paddedNumber = randomNumber.toString().padStart(2, '0'); // Ensure two-digit number with leading zero if needed
      return `bean${paddedNumber}`;
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  age: {
    type: DataTypes.VIRTUAL,
    get() {
      const dob = this.getDataValue('dateOfBirth');
      if (dob instanceof Date && !isNaN(dob)) {
        const diffMs = Date.now() - dob.getTime();
        const ageDate = new Date(diffMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      return null;
    },
  },
  
  // Add more fields as needed for your hospital management system
}, {
  freezeTableName: true,
});

// Define any relationships, associations, or additional configuration here

(async () => {
  await Patients.sync(); // Sync the Patients model with the database
})();

export default Patients;
