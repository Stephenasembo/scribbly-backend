const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient();

async function createUser({ username, password, email }) {
  const user = await prisma.user.create({
    data: {
      username, password, email
    }
  })
  return user;
}

module.exports = {
  createUser,
}