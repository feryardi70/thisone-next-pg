import prisma from "../api/db";

export const getUserbyUsername = async (username) => {
  const user = await prisma.User.findFirst({
    where: {
      username: username,
    },
  });
  return user;
}

export const createUser = async (username, password) => {
  const newUser = await prisma.User.create({
    data: {
      username,
      password,
    },
  });

  return null;
}

export const updateUser = async (id, data) => {
  const updatedUser = await prisma.User.update({
    where: { id: parseInt(id) },
    data,
  });

  return null;
}