-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "boyName" TEXT NOT NULL,
    "girlName" TEXT NOT NULL,
    "boyImage" TEXT NOT NULL,
    "girlImage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");
