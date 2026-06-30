import db from '../db.js'
import { kpiRules as seedRules, type KpiRule } from '../data/kpi.js'

const count = (db.prepare('SELECT COUNT(*) as count FROM kpi_rules').get() as { count: number }).count
if (count === 0) {
  const insert = db.prepare('INSERT INTO kpi_rules (id, name, category, points, description) VALUES (@id, @name, @category, @points, @description)')
  const insertMany = db.transaction((rows: KpiRule[]) => rows.forEach((r) => insert.run(r)))
  insertMany(seedRules)
}

export function listKpiRules(): KpiRule[] {
  return db.prepare('SELECT * FROM kpi_rules ORDER BY rowid DESC').all() as KpiRule[]
}

export function createKpiRule(input: Partial<KpiRule>): KpiRule {
  const rule: KpiRule = {
    id: String(Date.now()),
    name: input.name ?? '',
    category: input.category ?? '',
    points: input.points ?? 0,
    description: input.description ?? '',
  }
  db.prepare('INSERT INTO kpi_rules (id, name, category, points, description) VALUES (@id, @name, @category, @points, @description)').run(rule)
  return rule
}

export function updateKpiRule(id: string, input: Partial<KpiRule>): KpiRule | undefined {
  const existing = db.prepare('SELECT * FROM kpi_rules WHERE id = ?').get(id) as KpiRule | undefined
  if (!existing) return undefined
  const updated: KpiRule = { ...existing, ...input, id }
  db.prepare('UPDATE kpi_rules SET name=@name, category=@category, points=@points, description=@description WHERE id=@id').run(updated)
  return updated
}

export function deleteKpiRule(id: string): boolean {
  return db.prepare('DELETE FROM kpi_rules WHERE id = ?').run(id).changes > 0
}
