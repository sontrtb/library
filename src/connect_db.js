const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('freedb_library_sontrtb', 'freedb_library_root', 'rsuxA?4@rGY!p9S', {
  host: "sql.freedb.tech",
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