import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Diagnosis = db.define('Diagnosis', {
    DiagnosisID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    DiseaseICD: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true, // Assuming each ICD code uniquely identifies a disease
    },
    DiseaseName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // Other relevant details for diagnosis
    // ...
}, {
    freezeTableName: true,
});

(async () => {
    await db.sync(); // Sync the model with the database
})();

export default Diagnosis;
