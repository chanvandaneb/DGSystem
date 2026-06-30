import db from '../db.js'
import { bookmarks as seedBookmarks, bookmarkCategories, type BookmarkItem } from '../data/bookmarks.js'

export { bookmarkCategories }

const count = (db.prepare('SELECT COUNT(*) as count FROM bookmarks').get() as { count: number }).count
if (count === 0) {
  const insert = db.prepare('INSERT INTO bookmarks (id, title, url, categorySlug, category) VALUES (@id, @title, @url, @categorySlug, @category)')
  const insertMany = db.transaction((rows: BookmarkItem[]) => rows.forEach((r) => insert.run(r)))
  insertMany(seedBookmarks)
}

export function listBookmarks(): BookmarkItem[] {
  return db.prepare('SELECT * FROM bookmarks ORDER BY rowid DESC').all() as BookmarkItem[]
}

export function createBookmark(input: Partial<BookmarkItem>): BookmarkItem {
  const category = bookmarkCategories.find((c) => c.slug === input.categorySlug)
  const bookmark: BookmarkItem = {
    id: String(Date.now()),
    title: input.title ?? '',
    url: input.url ?? '',
    categorySlug: input.categorySlug ?? bookmarkCategories[0]?.slug ?? '',
    category: category?.name ?? input.category ?? '',
  }
  db.prepare('INSERT INTO bookmarks (id, title, url, categorySlug, category) VALUES (@id, @title, @url, @categorySlug, @category)').run(bookmark)
  return bookmark
}

export function deleteBookmark(id: string): boolean {
  return db.prepare('DELETE FROM bookmarks WHERE id = ?').run(id).changes > 0
}
