module.exports = {
  HOST: "localhost",
  USER: "boq",
  PASSWORD: "12345678",
  DB: "boq",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
