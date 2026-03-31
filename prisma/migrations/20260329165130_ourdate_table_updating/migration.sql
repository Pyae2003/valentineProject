-- CreateTable
CREATE TABLE "ourDate" (
    "id" TEXT NOT NULL,
    "years" TEXT NOT NULL,
    "months" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ourDate_pkey" PRIMARY KEY ("id")
);
