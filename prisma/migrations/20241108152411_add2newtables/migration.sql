-- CreateTable
CREATE TABLE "arrivals" (
    "id" SERIAL NOT NULL,
    "airline" TEXT NOT NULL,
    "flightnumber" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departdate" TEXT NOT NULL,
    "departtime" TEXT NOT NULL,
    "gate" TEXT NOT NULL,
    "remark" TEXT NOT NULL,

    CONSTRAINT "arrivals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
