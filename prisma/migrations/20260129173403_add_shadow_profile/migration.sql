-- CreateTable
CREATE TABLE "ShadowProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fears" TEXT,
    "vulnerabilities" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShadowProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShadowProfile_userId_key" ON "ShadowProfile"("userId");

-- AddForeignKey
ALTER TABLE "ShadowProfile" ADD CONSTRAINT "ShadowProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
