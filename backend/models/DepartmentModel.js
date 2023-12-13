import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Department = db.define('Departments', {
    DepartmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    DepartmentName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
}, {
    freezeTableName: true,
});

(async () => {
    await db.sync(); // Sync the model with the database
})();

export default Department;
