-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboardingStatus" "OnboardingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "onboardingVersion" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "BeingProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "values" JSONB NOT NULL DEFAULT '[]',
    "meaningScale" INTEGER,
    "complexityLevel" INTEGER,
    "psychologicalSafety" INTEGER,
    "vitalRenewalRate" INTEGER,
    "trvFrequency" INTEGER,
    "trvLabel" TEXT,
    "growthArchetype" TEXT,
    "kineticSignature" JSONB,
    "sabotagePatterns" JSONB NOT NULL DEFAULT '[]',
    "exposureTolerance" INTEGER,
    "shadowTriggers" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BeingProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BeingProfile_userId_key" ON "BeingProfile"("userId");

-- AddForeignKey
ALTER TABLE "BeingProfile" ADD CONSTRAINT "BeingProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
