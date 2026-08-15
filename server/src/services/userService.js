const prisma = require("../config/database");

async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

module.exports = {
  findUserByEmail,
};