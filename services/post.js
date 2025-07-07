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

async function createPost(post) {
  const { title, content, userId } = post;
  const createdPost = await prisma.post.create({
    data: { title, content, userId }
  })
  return createdPost;
}

module.exports = {
  getPosts,
  createPost,
}