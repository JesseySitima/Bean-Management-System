import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Department from "./DepartmentModel.js";

const { DataTypes } = Sequelize;

const Doctors = db.define('doctors', {
    doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    doctor_name: {
        type: DataTypes.STRING
    },
    specialization: {
        type: DataTypes.STRING
    },
    contact_number: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    department_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Department,
            key: 'DepartmentID'
        }
    }
}, {
    freezeTableName: true
});

// Define associations
Doctors.belongsTo(Department, { foreignKey: 'department_id' });

(async () => {
    await db.sync();
})();

export default Doctors;
