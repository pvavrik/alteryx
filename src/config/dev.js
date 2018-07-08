const host = process.env.DB_HOST || 'localhost';

module.exports = {
  server: {
    port: 9000
  },
  key: {
    privateKey: '37LvDSm4XvjYOh9Y',
    tokenExpireInMinutes: 1440
  }
};