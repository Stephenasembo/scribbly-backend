const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function createComment({ content, userId, postId }) {
  const createdComment = await prisma.comment.create({
    data: { content, userId, postId }
  })
  return createdComment;
}

async function updateComment(id, content) {
  const updatedComment = await prisma.comment.update({
    where: { id },
    data: {
      content,
      updatedAt: new Date()
    }
  });
  return updatedComment;
}

async function deleteComment(id) {
  const deletedComment = await prisma.comment.delete({
    where: { id }
  });
  return deletedComment;
}

module.exports = {
  createComment,
  updateComment,
  deleteComment,
}