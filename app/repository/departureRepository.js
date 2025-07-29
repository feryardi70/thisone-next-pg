import prisma from "../api/db";

export const getAllDepartures = async () => {
  const departures = await prisma.Departure.findMany();
  return departures;
};

export const getDeparturesByDate = async (date) => {
  const departures = await prisma.Departure.findMany({
    where: {
      departdate: date,
    },
    orderBy: {
      departtime: "asc",
    },
  });
  return departures;
};

export const getDepartureById = async (id) => {
  const departure = await prisma.Departure.findUnique({
    where: { id: parseInt(id) },
  });
  return departure;
};

export const createDeparture = async (data) => {
  const newDeparture = await prisma.Departure.create({
    data,
  });
  return newDeparture;
};

export const updateDeparture = async (id, data) => {
  const updatedDeparture = await prisma.Departure.update({
    where: { id: parseInt(id) },
    data,
  });
  return updatedDeparture;
};

export const deleteDeparture = async (id) => {
  const deletedDeparture = await prisma.Departure.delete({
    where: { id: parseInt(id) },
  });
  return deletedDeparture;
};
