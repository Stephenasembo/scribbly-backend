const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function getPosts(limit = null) {
  const count = await prisma.post.count();
  let numberOfPosts;
  if(!limit) {
    numberOfPosts = count;
  } else if (Number(limit) > count){
    numberOfPosts = count;
  } else {
    numberOfPosts = Number(limit)
  }
  const posts = await prisma.post.findMany({ take: numberOfPosts })
  return posts;
}

module.exports = {
  getPosts
}