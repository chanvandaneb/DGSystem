import db from '../db.js'
import { tasks as seedTasks, type Task, type TaskScore } from '../data/tasks.js'

const count = (db.prepare('SELECT COUNT(*) as count FROM tasks').get() as { count: number }).count
if (count === 0) {
  const insert = db.prepare(
    `INSERT INTO tasks (id, subject, priority, category, progress, start, end, viewable, author, assignee)
     VALUES (@id, @subject, @priority, @category, @progress, @start, @end, @viewable, @author, @assignee)`,
  )
  const insertMany = db.transaction((rows: Task[]) => rows.forEach((r) => insert.run(r)))
  insertMany(seedTasks)
}

export function listTasks(): Task[] {
  return db.prepare('SELECT * FROM tasks ORDER BY rowid DESC').all() as Task[]
}

export function listTaskScores(): TaskScore[] {
  return listTasks().map((t) => ({
    id: t.id,
    taskId: t.id,
    subject: t.subject,
    assignee: t.assignee,
    category: t.category,
    month: t.start ? `${Number(t.start.slice(5, 7))}/${t.start.slice(0, 4)}` : '',
    authorScore: null,
    leaderScore: null,
    average: null,
  }))
}

export function createTask(input: Partial<Task>): Task {
  const task: Task = {
    id: String(Date.now()),
    subject: input.subject ?? '',
    priority: input.priority ?? 'Medium',
    category: input.category ?? '',
    progress: input.progress ?? 'Todo',
    start: input.start ?? '',
    end: input.end ?? '',
    viewable: input.viewable ?? 'TEAM: DES',
    author: input.author ?? '',
    assignee: input.assignee ?? '',
  }
  db.prepare(
    `INSERT INTO tasks (id, subject, priority, category, progress, start, end, viewable, author, assignee)
     VALUES (@id, @subject, @priority, @category, @progress, @start, @end, @viewable, @author, @assignee)`,
  ).run(task)
  return task
}

export function updateTask(id: string, input: Partial<Task>): Task | undefined {
  const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as Task | undefined
  if (!existing) return undefined
  const updated: Task = { ...existing, ...input, id }
  db.prepare(
    `UPDATE tasks SET subject=@subject, priority=@priority, category=@category, progress=@progress,
     start=@start, end=@end, viewable=@viewable, author=@author, assignee=@assignee WHERE id=@id`,
  ).run(updated)
  return updated
}

export function deleteTask(id: string): boolean {
  return db.prepare('DELETE FROM tasks WHERE id = ?').run(id).changes > 0
}

export function deleteTasks(ids: string[]): number {
  const del = db.prepare('DELETE FROM tasks WHERE id = ?')
  const delMany = db.transaction((list: string[]) => list.reduce((n, id) => n + del.run(id).changes, 0))
  return delMany(ids)
}
