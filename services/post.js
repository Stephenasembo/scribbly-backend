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
  const posts = await prisma.post.findMany({
    where: {published: true},
    take: numberOfPosts,
  })
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

async function togglePublish(id) {
  let retrievedPost = await prisma.post.findUnique({
    where: { id }
  });
  if(!retrievedPost) {
    throw new Error('Post not found.')
  }
  if(!retrievedPost.published) {
    retrievedPost = await prisma.post.update({
      where: { id },
      data: {
        published: true,
        publishedAt: new Date(),
      }
    })
    return {
      retrievedPost,
      message: 'Post successfully published.'
    };
  } else {
    retrievedPost = await prisma.post.update({
      where: { id },
      data: {
        published: false,
        publishedAt: null,
      }
    })
    return {
      retrievedPost,
      message: 'Post successfuly unpublished.'
    };
  }
}

async function deletePost(id) {
  const retrievedPost = await prisma.post.delete({
    where: { id }
  });
  return retrievedPost;
}

async function updatePost(id, postData) {
  const retrievedPost = await getPost(id);
  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      title: postData.title || retrievedPost.title,
      content: postData.content || retrievedPost.content,
      updatedAt: new Date(),
    }
  });
  return updatedPost;
}

module.exports = {
  getPosts,
  createPost,
  getPost,
  togglePublish,
  deletePost,
  updatePost,
}