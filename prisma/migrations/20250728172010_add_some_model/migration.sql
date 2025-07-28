-- CreateTable
CREATE TABLE "departures" (
    "id" SERIAL NOT NULL,
    "airline" TEXT NOT NULL,
    "flightnumber" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departdate" TEXT NOT NULL,
    "departtime" TEXT NOT NULL,
    "gate" TEXT,
    "remark" TEXT,

    CONSTRAINT "departures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arrivals" (
    "id" SERIAL NOT NULL,
    "airline" TEXT NOT NULL,
    "flightnumber" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "arrivedate" TEXT NOT NULL,
    "arrivetime" TEXT NOT NULL,
    "baggage" TEXT NOT NULL,
    "remark" TEXT,

    CONSTRAINT "arrivals_pkey" PRIMARY KEY ("id")
);
