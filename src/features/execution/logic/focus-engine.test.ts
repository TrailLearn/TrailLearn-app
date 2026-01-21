import { describe, it, expect } from "vitest";
import { getTopFocusTasks } from "./focus-engine";
import { type Task } from "@prisma/client";

// Mock helper
const createTask = (id: string, status: any, priority: any, dueDate?: Date): Task => ({
  id,
  status,
  priority,
  dueDate: dueDate || null,
  actionPlanId: "plan-1",
  title: "Task " + id,
  description: null,
  evidenceUrl: null,
  userFeedback: null,
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe("Focus Engine", () => {
  it("should filter out completed tasks", () => {
    const tasks = [
      createTask("1", "DONE", "HIGH"),
      createTask("2", "PENDING", "MEDIUM"),
    ];
    const result = getTopFocusTasks(tasks);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe("2");
  });

  it("should prioritize HIGH over MEDIUM", () => {
    const tasks = [
      createTask("1", "PENDING", "MEDIUM"),
      createTask("2", "PENDING", "HIGH"),
    ];
    const result = getTopFocusTasks(tasks);
    expect(result[0]!.id).toBe("2");
  });

  it("should limit to top 3", () => {
    const tasks = [
      createTask("1", "PENDING", "LOW"),
      createTask("2", "PENDING", "HIGH"),
      createTask("3", "PENDING", "MEDIUM"),
      createTask("4", "PENDING", "HIGH"),
    ];
    const result = getTopFocusTasks(tasks);
    expect(result).toHaveLength(3);
    // Should be HIGH, HIGH, MEDIUM
    expect(result.map(t => t.priority)).toEqual(["HIGH", "HIGH", "MEDIUM"]);
  });
});
