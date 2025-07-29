import prisma from "../api/db";

export const getAllArrivals = async () => {
  const arrivals = await prisma.Arrival.findMany();
  return arrivals;
};

export const getArrivalsByDate = async (date) => {
  const arrivals = await prisma.Arrival.findMany({
    where: {
      arrivedate: date,
    },
    orderBy: {
      arrivetime: "asc",
    },
  });
  return arrivals;
};

export const getArrivalById = async (id) => {
  const arrival = await prisma.Arrival.findUnique({
    where: { id: parseInt(id) },
  });
  return arrival;
};

export const createArrival = async (data) => {
  const newArrival = await prisma.Arrival.create({
    data,
  });
  return newArrival;
};

export const updateArrival = async (id, data) => {
  const updatedArrival = await prisma.Arrival.update({
    where: { id: parseInt(id) },
    data,
  });
  return updatedArrival;
};

export const deleteArrival = async (id) => {
  const deletedArrival = await prisma.Arrival.delete({
    where: { id: parseInt(id) },
  });
  return deletedArrival;
};
