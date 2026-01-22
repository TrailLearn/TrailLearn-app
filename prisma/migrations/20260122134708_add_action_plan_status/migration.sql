-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "ActionPlan" ADD COLUMN     "status" "PlanStatus" NOT NULL DEFAULT 'DRAFT';
