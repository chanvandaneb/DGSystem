import { Router } from 'express'
import { listBookmarks, bookmarkCategories, createBookmark, deleteBookmark } from '../repositories/bookmarks.js'

export const bookmarksRouter = Router()

bookmarksRouter.get('/', (_req, res) => {
  res.json(listBookmarks())
})

bookmarksRouter.get('/categories', (_req, res) => {
  const all = listBookmarks()
  const summary = bookmarkCategories.map((c) => {
    const items = all.filter((b) => b.categorySlug === c.slug)
    return { ...c, count: items.length, items }
  })
  res.json(summary)
})

bookmarksRouter.post('/', (req, res) => {
  res.status(201).json(createBookmark(req.body))
})

bookmarksRouter.delete('/:id', (req, res) => {
  if (!deleteBookmark(req.params.id)) {
    res.status(404).json({ error: 'Bookmark not found' })
    return
  }
  res.status(204).end()
})
