-- CreateTable
CREATE TABLE "departures" (
    "id" SERIAL NOT NULL,
    "airline" TEXT NOT NULL,
    "flightnumber" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departdate" TEXT NOT NULL,
    "departtime" TEXT NOT NULL,
    "gate" TEXT NOT NULL,
    "remark" TEXT NOT NULL,

    CONSTRAINT "departures_pkey" PRIMARY KEY ("id")
);
