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

async function findUser(id = null, username = null) {
  const where = {};
  if (id) where.id = id;
  else if (username) where.username = username;
  const user = await prisma.user.findFirst({ where })
  return user;
}

async function makeAdmin(id) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      admin: true,
    }
  })
  return user;
}

module.exports = {
  createUser,
  findUser,
  makeAdmin,
}