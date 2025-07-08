const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function createComment({ content, userId, postId }) {
  const createdComment = await prisma.comment.create({
    data: { content, userId, postId }
  })
  return createdComment;
}

module.exports = {
  createComment,
}