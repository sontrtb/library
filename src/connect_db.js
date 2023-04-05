const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('library', 'root', '123456', {
  host: "localhost",
  dialect: "mysql"
});

const connectionDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connectionDatabase();