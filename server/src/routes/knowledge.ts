import { Router } from 'express'
import { knowledgeArticles, knowledgeCategories } from '../data/knowledge.js'

export const knowledgeRouter = Router()

knowledgeRouter.get('/', (_req, res) => {
  res.json(knowledgeArticles)
})

knowledgeRouter.get('/categories', (_req, res) => {
  const summary = knowledgeCategories.map((c) => {
    const articles = knowledgeArticles.filter((a) => a.categorySlug === c.slug)
    return {
      ...c,
      count: articles.length,
      articles: articles.slice(0, 5),
    }
  })
  res.json(summary)
})

knowledgeRouter.get('/categories/:slug', (req, res) => {
  const category = knowledgeCategories.find((c) => c.slug === req.params.slug)
  if (!category) {
    res.status(404).json({ error: 'Category not found' })
    return
  }
  const articles = knowledgeArticles.filter((a) => a.categorySlug === req.params.slug)
  res.json({ ...category, articles })
})
