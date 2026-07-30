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
  { slug: 'vnmarket',           name: 'VNMarket' },
  { slug: 'library',            name: 'Library' },
  { slug: 'chrome-extensions',  name: 'Chrome Extensions' },
  { slug: 'softskill-channels', name: 'Softskill Channels' },
  { slug: 'study-links',        name: 'Study Links' },
  { slug: 'ai-tools',           name: 'AI Tools' },
  { slug: 'design-resources',   name: 'Design Resources' },
  { slug: 'dev-tools',          name: 'Dev Tools' },
]

export const bookmarks: BookmarkItem[] = [
  // VNMarket
  { id: '1',  title: 'OM Company',                        url: 'https://om-company.example.com',    category: 'VNMarket',           categorySlug: 'vnmarket' },
  { id: '2',  title: 'Chat Company',                      url: 'https://chat-company.example.com',  category: 'VNMarket',           categorySlug: 'vnmarket' },
  { id: '3',  title: 'OM Team',                           url: 'https://om-team.example.com',       category: 'VNMarket',           categorySlug: 'vnmarket' },
  { id: '4',  title: 'DG Internal Portal',                url: 'https://portal.dgcvn.com',          category: 'VNMarket',           categorySlug: 'vnmarket' },
  { id: '5',  title: 'KingGroup Dashboard',               url: 'https://kg-dashboard.example.com',  category: 'VNMarket',           categorySlug: 'vnmarket' },

  // Library
  { id: '6',  title: 'Voicemod — Sound Effects (FREE)',   url: 'https://voicemod.net',              category: 'Library',            categorySlug: 'library' },
  { id: '7',  title: 'Mixkit — Free Video Assets',        url: 'https://mixkit.co',                 category: 'Library',            categorySlug: 'library' },
  { id: '8',  title: 'Unsplash — Free Photos',            url: 'https://unsplash.com',              category: 'Library',            categorySlug: 'library' },
  { id: '9',  title: 'Pexels — Free Videos & Photos',     url: 'https://pexels.com',                category: 'Library',            categorySlug: 'library' },
  { id: '10', title: 'Google Fonts',                      url: 'https://fonts.google.com',          category: 'Library',            categorySlug: 'library' },

  // Chrome Extensions
  { id: '11', title: 'LOC Extension (Facebook Tools)',    url: 'https://chrome.google.com/webstore', category: 'Chrome Extensions',  categorySlug: 'chrome-extensions' },
  { id: '12', title: '9Push Notification Tool',           url: 'https://chrome.google.com/webstore', category: 'Chrome Extensions',  categorySlug: 'chrome-extensions' },
  { id: '13', title: 'ColorZilla — Eyedropper',          url: 'https://chrome.google.com/webstore', category: 'Chrome Extensions',  categorySlug: 'chrome-extensions' },
  { id: '14', title: 'WhatFont — Font Inspector',         url: 'https://chrome.google.com/webstore', category: 'Chrome Extensions',  categorySlug: 'chrome-extensions' },
  { id: '15', title: 'GoFullPage — Screenshot',           url: 'https://chrome.google.com/webstore', category: 'Chrome Extensions',  categorySlug: 'chrome-extensions' },

  // Softskill Channels
  { id: '16', title: 'Green Meadow Channel',              url: 'https://example.com/green-meadow',  category: 'Softskill Channels', categorySlug: 'softskill-channels' },
  { id: '17', title: '21 Settings That Limit YouTube Views', url: 'https://example.com',            category: 'Softskill Channels', categorySlug: 'softskill-channels' },
  { id: '18', title: 'David Nguyen — Growth Mindset',     url: 'https://example.com',               category: 'Softskill Channels', categorySlug: 'softskill-channels' },
  { id: '19', title: 'Michael Tran — Leadership',         url: 'https://example.com',               category: 'Softskill Channels', categorySlug: 'softskill-channels' },
  { id: '20', title: 'TikTok Trending Checker',           url: 'https://example.com',               category: 'Softskill Channels', categorySlug: 'softskill-channels' },
  { id: '21', title: 'Simon Sinek — Start with Why',      url: 'https://youtube.com',               category: 'Softskill Channels', categorySlug: 'softskill-channels' },

  // Study Links
  { id: '22', title: 'Gitiho — Vietnamese E-Learning',    url: 'https://gitiho.com',                category: 'Study Links',        categorySlug: 'study-links' },
  { id: '23', title: 'Unica — Online Courses',            url: 'https://unica.vn',                  category: 'Study Links',        categorySlug: 'study-links' },
  { id: '24', title: 'Edumall',                           url: 'https://edumall.vn',                category: 'Study Links',        categorySlug: 'study-links' },
  { id: '25', title: 'Ratatype — Typing Practice',        url: 'https://ratatype.com',              category: 'Study Links',        categorySlug: 'study-links' },
  { id: '26', title: '10FastFingers — Speed Test',        url: 'https://10fastfingers.com',         category: 'Study Links',        categorySlug: 'study-links' },
  { id: '27', title: 'Coursera — Top Courses',            url: 'https://coursera.org',              category: 'Study Links',        categorySlug: 'study-links' },
  { id: '28', title: 'LinkedIn Learning',                 url: 'https://linkedin.com/learning',     category: 'Study Links',        categorySlug: 'study-links' },

  // AI Tools
  { id: '29', title: 'Perplexity AI',                     url: 'https://perplexity.ai',             category: 'AI Tools',           categorySlug: 'ai-tools' },
  { id: '30', title: 'ChatGPT',                           url: 'https://chat.openai.com',           category: 'AI Tools',           categorySlug: 'ai-tools' },
  { id: '31', title: 'Midjourney',                        url: 'https://midjourney.com',            category: 'AI Tools',           categorySlug: 'ai-tools' },
  { id: '32', title: 'Runway ML — Video AI',              url: 'https://runwayml.com',              category: 'AI Tools',           categorySlug: 'ai-tools' },
  { id: '33', title: 'ElevenLabs — Voice AI',             url: 'https://elevenlabs.io',             category: 'AI Tools',           categorySlug: 'ai-tools' },
  { id: '34', title: 'Adobe Firefly',                     url: 'https://firefly.adobe.com',         category: 'AI Tools',           categorySlug: 'ai-tools' },

  // Design Resources
  { id: '35', title: 'Dribbble — Design Inspiration',     url: 'https://dribbble.com',              category: 'Design Resources',   categorySlug: 'design-resources' },
  { id: '36', title: 'Behance',                           url: 'https://behance.net',               category: 'Design Resources',   categorySlug: 'design-resources' },
  { id: '37', title: 'Awwwards',                          url: 'https://awwwards.com',              category: 'Design Resources',   categorySlug: 'design-resources' },
  { id: '38', title: 'Coolors — Color Palette Generator', url: 'https://coolors.co',               category: 'Design Resources',   categorySlug: 'design-resources' },
  { id: '39', title: 'Flaticon — Free Icons',             url: 'https://flaticon.com',              category: 'Design Resources',   categorySlug: 'design-resources' },
  { id: '40', title: 'Iconify — Open Source Icons',       url: 'https://iconify.design',            category: 'Design Resources',   categorySlug: 'design-resources' },
  { id: '41', title: 'LottieFiles — Free Animations',     url: 'https://lottiefiles.com',           category: 'Design Resources',   categorySlug: 'design-resources' },

  // Dev Tools
  { id: '42', title: 'GitHub',                            url: 'https://github.com',                category: 'Dev Tools',          categorySlug: 'dev-tools' },
  { id: '43', title: 'Vercel — Deploy Frontend',          url: 'https://vercel.com',                category: 'Dev Tools',          categorySlug: 'dev-tools' },
  { id: '44', title: 'Tailwind CSS Docs',                 url: 'https://tailwindcss.com/docs',      category: 'Dev Tools',          categorySlug: 'dev-tools' },
  { id: '45', title: 'Vue.js Docs',                       url: 'https://vuejs.org',                 category: 'Dev Tools',          categorySlug: 'dev-tools' },
  { id: '46', title: 'Can I Use — Browser Compat',        url: 'https://caniuse.com',               category: 'Dev Tools',          categorySlug: 'dev-tools' },
  { id: '47', title: 'Regex101 — Regex Tester',           url: 'https://regex101.com',              category: 'Dev Tools',          categorySlug: 'dev-tools' },
]
