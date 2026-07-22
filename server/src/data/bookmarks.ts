export interface BookmarkItem {
  id: string
  title: string
  url: string
  category: string
  categorySlug: string
}

export interface BookmarkCategory {
  slug: string
  name: string
}

export const bookmarkCategories: BookmarkCategory[] = [
  { slug: 'vnmarket', name: 'VNMarket' },
  { slug: 'library', name: 'Library' },
  { slug: 'chrome-extensions', name: 'Chrome Extensions' },
  { slug: 'softskill-channels', name: 'Softskill Channels' },
  { slug: 'study-links', name: 'Study Links' },
  { slug: 'ai-tools', name: 'AI Tools' },
]

export const bookmarks: BookmarkItem[] = [
  { id: '1', title: 'OM Company', url: 'https://om-company.example.com', category: 'VNMarket', categorySlug: 'vnmarket' },
  { id: '2', title: 'Chat Company', url: 'https://chat-company.example.com', category: 'VNMarket', categorySlug: 'vnmarket' },
  { id: '3', title: 'OM Team', url: 'https://om-team.example.com', category: 'VNMarket', categorySlug: 'vnmarket' },

  { id: '4', title: 'Voicemod - Sound Effects Library (FREE)', url: 'https://voicemod.net', category: 'Library', categorySlug: 'library' },

  { id: '5', title: 'LOC Extension (Facebook Personal Tools)', url: 'https://chrome.google.com/webstore', category: 'Chrome Extensions', categorySlug: 'chrome-extensions' },
  { id: '6', title: '9Push', url: 'https://chrome.google.com/webstore', category: 'Chrome Extensions', categorySlug: 'chrome-extensions' },

  { id: '7', title: 'Green Meadow Channel', url: 'https://example.com/green-meadow', category: 'Softskill Channels', categorySlug: 'softskill-channels' },
  { id: '8', title: '21 Settings That Limit Views on Small YouTube Channels', url: 'https://example.com', category: 'Softskill Channels', categorySlug: 'softskill-channels' },
  { id: '9', title: 'David Nguyen', url: 'https://example.com', category: 'Softskill Channels', categorySlug: 'softskill-channels' },
  { id: '10', title: 'Michael Tran', url: 'https://example.com', category: 'Softskill Channels', categorySlug: 'softskill-channels' },
  { id: '11', title: 'TikTok Trending Checker', url: 'https://example.com', category: 'Softskill Channels', categorySlug: 'softskill-channels' },

  { id: '12', title: 'Gitiho', url: 'https://gitiho.com', category: 'Study Links', categorySlug: 'study-links' },
  { id: '13', title: 'Unica', url: 'https://unica.vn', category: 'Study Links', categorySlug: 'study-links' },
  { id: '14', title: 'Edumall', url: 'https://edumall.vn', category: 'Study Links', categorySlug: 'study-links' },
  { id: '15', title: 'Ratatype', url: 'https://ratatype.com', category: 'Study Links', categorySlug: 'study-links' },
  { id: '16', title: '10FastFingers', url: 'https://10fastfingers.com', category: 'Study Links', categorySlug: 'study-links' },

  { id: '17', title: 'PerplexityAI', url: 'https://perplexity.ai', category: 'AI Tools', categorySlug: 'ai-tools' },
]
