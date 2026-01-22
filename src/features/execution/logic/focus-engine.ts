import { type Task } from "@prisma/client";

/**
 * Focus Engine: Filters tasks to return only the Top 3 priorities.
 * Logic:
 * 1. Filter out DONE/SKIPPED tasks.
 * 2. Sort by Priority (HIGH > MEDIUM > LOW).
 * 3. Sort by Due Date (Earliest first).
 * 4. Take Top 3.
 */
export function getTopFocusTasks(tasks: Task[]): Task[] {
  const activeTasks = tasks.filter(t => t.status === "PENDING");

  activeTasks.sort((a, b) => {
    // 1. Priority (High=0, Medium=1, Low=2 logic if we mapped enums, but strings sort alphabetically H/M/L is not correct)
    // Custom priority map
    const priorityScore = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    const scoreA = priorityScore[a.priority] || 0;
    const scoreB = priorityScore[b.priority] || 0;

    if (scoreA !== scoreB) return scoreB - scoreA; // Descending score

    // 2. Due Date (Ascending - closer dates first)
    if (a.dueDate && b.dueDate) return a.dueDate.getTime() - b.dueDate.getTime();
    if (a.dueDate) return -1; // Has date comes first
    if (b.dueDate) return 1;

    return 0;
  });

  return activeTasks.slice(0, 3);
}
