import { Sequelize } from "sequelize";
 
const db = new Sequelize('bean_mis_database', 'root', 'code', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;