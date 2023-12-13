import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    role: {
        type: DataTypes.ENUM('admin', 'user', 'moderator'),
        defaultValue: 'user'
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Users;
