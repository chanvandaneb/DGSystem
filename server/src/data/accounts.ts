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
  {
    id: '2292',
    name: 'Adobe acc 1st (3 months)',
    link: '',
    email: '',
    username: 'jamesnikilink@gmail.com',
    password: 'Adobe@2026',
    pin: '',
    expired: '2026-09-01',
    notes: 'Shared design team license',
    category: 'Design Tools',
    viewable: 'TEAM: DES',
    team: 'Design',
    author: 'KELKAY',
  },
  {
    id: '2294',
    name: 'Adobe acc 2nd (3 months)',
    link: '',
    email: '',
    username: 'chloristvsk@gmail.com',
    password: 'Adobe@2026b',
    pin: '',
    expired: '2026-09-01',
    notes: 'Backup license',
    category: 'Design Tools',
    viewable: 'TEAM: DES',
    team: 'Design',
    author: 'KELKAY',
  },
  {
    id: '2291',
    name: 'Freepik (Magnific)',
    link: 'https://www.magnific.app',
    email: '',
    username: 'tool@dgcvn.com',
    password: 'Freepik@2026',
    pin: '',
    expired: '2026-12-01',
    notes: 'Magnific upscaler add-on',
    category: 'Design Tools',
    viewable: 'TEAM: DES',
    team: 'Design',
    author: 'KELKAY',
  },
  {
    id: '2288',
    name: 'Envato',
    link: 'https://elements.envato.com/',
    email: '',
    username: 'tool@dgcvn.com',
    password: 'Envato@2026',
    pin: '',
    expired: '2026-11-15',
    notes: 'Elements subscription',
    category: 'Design Tools',
    viewable: 'TEAM: DES',
    team: 'Design',
    author: 'KELKAY',
  },
]
