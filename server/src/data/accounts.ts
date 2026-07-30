export interface Account {
  id: string
  name: string
  link: string
  email: string
  username: string
  password: string
  pin: string
  expired: string
  notes: string
  category: string
  viewable: string
  team: string
  author: string
}

export const accounts: Account[] = [
  { id: '2292', name: 'Adobe Creative Cloud #1', link: 'https://adobe.com', email: 'jamesnikilink@gmail.com', username: 'jamesnikilink@gmail.com', password: 'Adobe@2026', pin: '', expired: '2026-09-01', notes: 'Shared design team license', category: 'Design Tools', viewable: 'TEAM: DES', team: 'Design', author: 'KELKAY' },
  { id: '2294', name: 'Adobe Creative Cloud #2', link: 'https://adobe.com', email: 'chloristvsk@gmail.com', username: 'chloristvsk@gmail.com', password: 'Adobe@2026b', pin: '', expired: '2026-09-01', notes: 'Backup license', category: 'Design Tools', viewable: 'TEAM: DES', team: 'Design', author: 'KELKAY' },
  { id: '2291', name: 'Freepik / Magnific', link: 'https://www.magnific.app', email: 'tool@dgcvn.com', username: 'tool@dgcvn.com', password: 'Freepik@2026', pin: '', expired: '2026-12-01', notes: 'Magnific upscaler add-on', category: 'Design Tools', viewable: 'TEAM: DES', team: 'Design', author: 'KELKAY' },
  { id: '2288', name: 'Envato Elements', link: 'https://elements.envato.com', email: 'tool@dgcvn.com', username: 'tool@dgcvn.com', password: 'Envato@2026', pin: '', expired: '2026-11-15', notes: 'Elements subscription', category: 'Design Tools', viewable: 'TEAM: DES', team: 'Design', author: 'KELKAY' },
  { id: '2301', name: 'Figma Professional', link: 'https://figma.com', email: 'design@dgcvn.com', username: 'design@dgcvn.com', password: 'Figma#2026!', pin: '', expired: '2026-12-31', notes: 'Professional plan, 5 seats', category: 'Design Tools', viewable: 'TEAM: DES', team: 'Design', author: 'MAX' },
  { id: '2302', name: 'Canva Pro', link: 'https://canva.com', email: 'design@dgcvn.com', username: 'design@dgcvn.com', password: 'Canva@Pro26', pin: '', expired: '2026-10-01', notes: 'Shared team workspace', category: 'Design Tools', viewable: 'TEAM: DES', team: 'Design', author: 'CICI' },
  { id: '2303', name: 'Midjourney', link: 'https://midjourney.com', email: 'ai@dgcvn.com', username: 'ai@dgcvn.com', password: 'MJ@2026ai', pin: '', expired: '2026-08-01', notes: 'Pro plan for AI image generation', category: 'AI Tools', viewable: 'TEAM: DES', team: 'Design', author: 'LIDAS' },
  { id: '2304', name: 'ChatGPT Plus', link: 'https://chat.openai.com', email: 'ai@dgcvn.com', username: 'ai@dgcvn.com', password: 'OpenAI#Plus26', pin: '', expired: '2026-09-15', notes: 'Team GPT-4 access', category: 'AI Tools', viewable: 'TEAM: MKT', team: 'Marketing', author: 'KRIS' },
  { id: '2305', name: 'Slack Workspace', link: 'https://slack.com', email: 'admin@dgcvn.com', username: 'admin@dgcvn.com', password: 'Slack$2026dg', pin: '', expired: '2027-01-01', notes: 'Main team communication', category: 'Communication', viewable: 'ALL', team: 'All', author: 'MAX' },
  { id: '2306', name: 'Google Workspace Admin', link: 'https://admin.google.com', email: 'admin@dgcvn.com', username: 'admin@dgcvn.com', password: 'GWS@Admin26', pin: '9982', expired: '2027-03-01', notes: 'Admin console — handle with care', category: 'Admin', viewable: 'ADMIN', team: 'IT', author: 'MAX' },
  { id: '2307', name: 'Meta Business Suite', link: 'https://business.facebook.com', email: 'social@dgcvn.com', username: 'social@dgcvn.com', password: 'Meta@DG2026', pin: '', expired: '2027-01-01', notes: 'Facebook & Instagram pages', category: 'Social Media', viewable: 'TEAM: MKT', team: 'Marketing', author: 'CICI' },
  { id: '2308', name: 'TikTok Ads Manager', link: 'https://ads.tiktok.com', email: 'social@dgcvn.com', username: 'social@dgcvn.com', password: 'TikTok@2026ads', pin: '', expired: '2027-01-01', notes: 'Campaign manager account', category: 'Social Media', viewable: 'TEAM: MKT', team: 'Marketing', author: 'KRIS' },
  { id: '2309', name: 'Google Ads', link: 'https://ads.google.com', email: 'ads@dgcvn.com', username: 'ads@dgcvn.com', password: 'GAds#2026dg', pin: '', expired: '2027-01-01', notes: 'Main Google Ads account', category: 'Advertising', viewable: 'TEAM: MKT', team: 'Marketing', author: 'KRIS' },
  { id: '2310', name: 'Shopee Seller Center', link: 'https://seller.shopee.vn', email: 'shop@dgcvn.com', username: 'dgcvn_official', password: 'Shopee@2026', pin: '1234', expired: '2027-06-01', notes: 'Official store account', category: 'E-commerce', viewable: 'TEAM: MKT', team: 'Marketing', author: 'ANISE' },
  { id: '2311', name: 'Lazada Seller', link: 'https://lazada.vn', email: 'shop@dgcvn.com', username: 'dgcvn_store', password: 'Lazada@2026', pin: '', expired: '2027-06-01', notes: 'Secondary marketplace', category: 'E-commerce', viewable: 'TEAM: MKT', team: 'Marketing', author: 'ANISE' },
  { id: '2312', name: 'Cloudflare', link: 'https://cloudflare.com', email: 'dev@dgcvn.com', username: 'dev@dgcvn.com', password: 'CF@DG2026!', pin: '', expired: '2027-01-01', notes: 'DNS & CDN management', category: 'Infrastructure', viewable: 'TEAM: DEV', team: 'Dev', author: 'MAX' },
  { id: '2313', name: 'AWS Console', link: 'https://aws.amazon.com', email: 'dev@dgcvn.com', username: 'dev@dgcvn.com', password: 'AWS$2026dg!', pin: '5521', expired: '2027-01-01', notes: 'Production servers & S3', category: 'Infrastructure', viewable: 'TEAM: DEV', team: 'Dev', author: 'MAX' },
  { id: '2314', name: 'Namecheap Domains', link: 'https://namecheap.com', email: 'dev@dgcvn.com', username: 'dev@dgcvn.com', password: 'NC@Domains26', pin: '', expired: '2026-11-01', notes: 'All company domain registrations', category: 'Infrastructure', viewable: 'TEAM: DEV', team: 'Dev', author: 'MAX' },
  { id: '2315', name: 'Zoom Pro', link: 'https://zoom.us', email: 'admin@dgcvn.com', username: 'admin@dgcvn.com', password: 'Zoom@Pro2026', pin: '', expired: '2026-12-15', notes: 'Team video meetings', category: 'Communication', viewable: 'ALL', team: 'All', author: 'KELKAY' },
  { id: '2316', name: 'Notion Team Plan', link: 'https://notion.so', email: 'admin@dgcvn.com', username: 'admin@dgcvn.com', password: 'Notion$2026', pin: '', expired: '2026-12-01', notes: 'Documentation & wiki', category: 'Productivity', viewable: 'ALL', team: 'All', author: 'CICI' },
]
