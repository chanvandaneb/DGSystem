export interface KnowledgeArticle {
  id: string
  title: string
  category: string
  categorySlug: string
  author: string
  excerpt: string
  pinned: boolean
}

export interface KnowledgeCategory {
  slug: string
  name: string
  description: string
}

export const knowledgeCategories: KnowledgeCategory[] = [
  { slug: 'company', name: 'Company', description: 'About company policies and workflow' },
  { slug: 'seo', name: 'SEO', description: 'About SEO knowledge' },
  { slug: 'telesale', name: 'Telesale', description: 'About telesale scripts and process' },
  { slug: 'general', name: 'General Knowledge', description: 'About general knowledge' },
  { slug: 'game', name: 'Game Knowledge', description: 'About game knowledge' },
  { slug: 'fi88', name: 'Fi88 Knowledge', description: 'About Fi88 knowledge' },
  { slug: 'leaders', name: 'Leaders', description: 'About leadership resources' },
  { slug: 'affiliate', name: 'Affiliate', description: 'About affiliate program' },
  { slug: 'operations', name: 'Operations', description: 'About operations process' },
  { slug: 'csr-sop', name: 'CSR SOP', description: 'About CSR standard operating procedures' },
  { slug: 'csr-knowledge', name: 'CSR Knowledge', description: 'About CSR knowledge' },
  { slug: 'kinggroup', name: 'KingGroup Knowledge', description: 'About KingGroup knowledge' },
  { slug: 'des-meeting', name: 'DES Meeting Minutes', description: 'About DES team meeting minutes' },
]

export const knowledgeArticles: KnowledgeArticle[] = [
  { id: '1', title: 'Workflow (Schedule, Attendance, Shift Swap, Leave)', category: 'Company', categorySlug: 'company', author: 'KIT', excerpt: 'Company workflow for scheduling, attendance, shift swap and leave.', pinned: false },
  { id: '2', title: 'Quick Same-Day Leave Request Template', category: 'Company', categorySlug: 'company', author: 'KIT', excerpt: 'Quick leave request template for same-day requests.', pinned: false },
  { id: '3', title: 'Template Meeting Minutes', category: 'Company', categorySlug: 'company', author: 'KIT', excerpt: 'Standard meeting minutes template.', pinned: false },
  { id: '4', title: 'Template for Leave', category: 'Company', categorySlug: 'company', author: 'KIT', excerpt: 'Leave request template.', pinned: false },
  { id: '5', title: 'Internal Referral Bonus & Payment Method', category: 'Company', categorySlug: 'company', author: 'KIT', excerpt: 'Internal referral bonus policy and payment method.', pinned: false },

  { id: '6', title: 'Professional Standards for Documents, Files & Naming', category: 'General Knowledge', categorySlug: 'general', author: 'KIT', excerpt: 'Professional standards for documents, files and naming conventions.', pinned: true },
  { id: '7', title: 'General Terminology & Abbreviations', category: 'General Knowledge', categorySlug: 'general', author: 'KIT', excerpt: 'Classification of terms and abbreviations across all departments including MKT, CS, PM, FN and more.', pinned: true },
  { id: '8', title: 'iOS Signature Q&A', category: 'General Knowledge', categorySlug: 'general', author: 'KIT', excerpt: 'Frequently asked questions about iOS signature.', pinned: false },
  { id: '9', title: 'Guide: Relocating to Cambodia', category: 'General Knowledge', categorySlug: 'general', author: 'KIT', excerpt: 'Step-by-step guide for relocating to Cambodia including travel by road, flight check, and required documents.', pinned: false },
  { id: '10', title: 'Full Terminology & Abbreviation Reference', category: 'General Knowledge', categorySlug: 'general', author: 'KIT', excerpt: 'Complete terminology list by department including SEO, Sales, Support, Engineering and more.', pinned: false },
  { id: '11', title: 'How to Retrieve Copied Messages Without Re-Copying', category: 'General Knowledge', categorySlug: 'general', author: 'SIMON', excerpt: 'A quick guide for retrieving previously copied text when you need to copy multiple messages at once.', pinned: false },
  { id: '12', title: 'Markdown Formatting for Mattermost', category: 'General Knowledge', categorySlug: 'general', author: 'KIT', excerpt: 'Guide to using Markdown formatting in Mattermost including headings, bold, italic, lists and code blocks.', pinned: false },
  { id: '13', title: '[SOP] Process for Checking & Remarking Blocked Links (DNL & Fi88)', category: 'General Knowledge', categorySlug: 'general', author: 'LIDAS', excerpt: 'Step-by-step process for checking and recording blocked links, verifying customer network, and escalating issues.', pinned: false },

  { id: '14', title: 'CMD Sports', category: 'Game Knowledge', categorySlug: 'game', author: 'KIT', excerpt: 'CMD Sports overview.', pinned: false },
  { id: '15', title: 'Gambling Vocabulary', category: 'Game Knowledge', categorySlug: 'game', author: 'KIT', excerpt: 'Common gambling vocabulary.', pinned: false },
  { id: '16', title: 'Baseball Betting Rules Overview', category: 'Game Knowledge', categorySlug: 'game', author: 'KIT', excerpt: 'Baseball betting rules summary.', pinned: false },
  { id: '17', title: 'Golf Betting Rules Overview', category: 'Game Knowledge', categorySlug: 'game', author: 'KIT', excerpt: 'Golf betting rules summary.', pinned: false },
  { id: '18', title: 'Boxing Betting Rules Overview', category: 'Game Knowledge', categorySlug: 'game', author: 'KIT', excerpt: 'Boxing betting rules summary.', pinned: false },

  { id: '19', title: 'V8 Poker', category: 'Fi88 Knowledge', categorySlug: 'fi88', author: 'KIT', excerpt: 'V8 Poker overview.', pinned: false },
  { id: '20', title: 'Sports Training Guide', category: 'Fi88 Knowledge', categorySlug: 'fi88', author: 'KIT', excerpt: 'Sports training material and guidelines.', pinned: false },
  { id: '21', title: 'BO Agent - User Guide', category: 'Fi88 Knowledge', categorySlug: 'fi88', author: 'KIT', excerpt: 'BO Agent usage guide for managing agent accounts.', pinned: false },
  { id: '22', title: 'Fi88: Difference Between Direct & Agent Members', category: 'Fi88 Knowledge', categorySlug: 'fi88', author: 'KIT', excerpt: 'Explanation of the difference between direct members and agent members on Fi88.', pinned: false },

  { id: '23', title: 'GAME OVERVIEW: Marble Magic - KingGroup', category: 'KingGroup Knowledge', categorySlug: 'kinggroup', author: 'KIT', excerpt: 'Marble Magic game overview.', pinned: false },
  { id: '24', title: 'GAME OVERVIEW: Fireball at Fun Game - KingGroup', category: 'KingGroup Knowledge', categorySlug: 'kinggroup', author: 'KIT', excerpt: 'Fireball game overview at Fun Game section.', pinned: false },
  { id: '25', title: 'GAME OVERVIEW: Spaceship at Fun Game - KingGroup', category: 'KingGroup Knowledge', categorySlug: 'kinggroup', author: 'KIT', excerpt: 'Spaceship game overview at Fun Game section.', pinned: false },
  { id: '26', title: 'CQ9 Gaming Slot Overview', category: 'KingGroup Knowledge', categorySlug: 'kinggroup', author: 'KIT', excerpt: 'CQ9 slot games overview.', pinned: false },
  { id: '27', title: 'KingGroup VIP Levels Overview', category: 'KingGroup Knowledge', categorySlug: 'kinggroup', author: 'KIT', excerpt: 'VIP level structure overview.', pinned: false },

  { id: '28', title: 'DES Meeting Minutes 20250623', category: 'DES Meeting Minutes', categorySlug: 'des-meeting', author: 'KIT', excerpt: 'Design team meeting minutes.', pinned: false },
  { id: '29', title: 'DES Meeting Minutes 20250702', category: 'DES Meeting Minutes', categorySlug: 'des-meeting', author: 'KIT', excerpt: 'Design team meeting minutes.', pinned: false },
  { id: '30', title: 'DES Meeting Minutes 20250813', category: 'DES Meeting Minutes', categorySlug: 'des-meeting', author: 'KIT', excerpt: 'Design team meeting minutes.', pinned: false },
]
