const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function getPosts(limit) {
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

async function getPost(id) {
  const retrievedPost = await prisma.post.findUnique({
    where: { id },
    include: {comments: true}
  })
  return retrievedPost;
}

async function main() {
  const post = await getPost('22d7af83-8158-4e64-832e-dc30b92cf2f1');
  console.log(post);
}

main()

module.exports = {
  getPosts,
  createPost,
  getPost,
}