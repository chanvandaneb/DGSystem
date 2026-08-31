<template>
  <div class="min-h-screen bg-white text-neutral-900 font-sans">

    <!-- Nav -->
    <header class="sticky top-0 z-20 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#4F46E5] flex items-center justify-center">
            <span class="text-white text-xs font-bold">DG</span>
          </div>
          <span class="font-semibold text-neutral-900">DGSystem</span>
        </div>
        <div class="flex items-center gap-4">
          <nav class="hidden md:flex items-center gap-6 text-sm text-neutral-500">
            <a href="#overview" class="hover:text-neutral-900 transition-colors">Overview</a>
            <a href="#problem" class="hover:text-neutral-900 transition-colors">Problem</a>
            <a href="#research" class="hover:text-neutral-900 transition-colors">Research</a>
            <a href="#ideation" class="hover:text-neutral-900 transition-colors">Ideation</a>
            <a href="#design" class="hover:text-neutral-900 transition-colors">Design</a>
            <a href="#screens" class="hover:text-neutral-900 transition-colors">Screens</a>
          </nav>
          <a href="/" class="text-sm text-[#2563EB] font-medium hover:underline">← Back to app</a>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section id="overview" class="relative overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white">
      <div class="absolute inset-0 opacity-10" style="background-image:radial-gradient(circle at 20% 80%,#fff 0%,transparent 50%),radial-gradient(circle at 80% 20%,#fff 0%,transparent 50%)"></div>
      <div class="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 mb-6">
          UX / UI Case Study
        </div>
        <h1 class="text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-3xl">
          DGSystem — Workforce Management Dashboard
        </h1>
        <p class="mt-4 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
          Designing a unified internal operations platform that replaced five disconnected tools with one cohesive, accessible desktop interface for a creative design team.
        </p>
        <div class="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-white/20 pt-8">
          <div v-for="item in meta" :key="item.label">
            <p class="text-xs uppercase tracking-wider text-white/50 font-medium">{{ item.label }}</p>
            <p class="mt-1 text-sm font-semibold text-white">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Cover Image -->
    <div class="bg-neutral-950 py-10 px-6">
      <div class="mx-auto max-w-5xl">
        <img src="/screenshots/dashboard.png" alt="DGSystem Dashboard" class="rounded-2xl shadow-2xl w-full border border-white/10" />
      </div>
    </div>

    <!-- Problem -->
    <section id="problem" class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-sm font-bold">!</div>
        <h2 class="text-2xl font-bold text-neutral-900">The Problem</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-10">
        <div>
          <p class="text-neutral-600 leading-relaxed">
            An 8-person creative team managed daily operations across spreadsheets, Telegram threads, and informal processes. There was no single interface where a team member could check their own attendance, see task status, or find shared credentials.
          </p>
          <p class="mt-4 text-neutral-600 leading-relaxed">
            Managers had to manually compile KPI reports, task progress lived in group chats that scrolled away, and new team members didn't know where to look for anything. The experience was fragmented, error-prone, and frustrating.
          </p>
          <div class="mt-6 space-y-3">
            <div v-for="pain in painPoints" :key="pain" class="flex items-start gap-3">
              <div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0"></div>
              <p class="text-sm text-neutral-600">{{ pain }}</p>
            </div>
          </div>
        </div>
        <div class="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
          <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-4">Design question</p>
          <p class="text-xl font-semibold text-neutral-800 leading-snug">
            How do you design one consistent interface that makes every team member's daily workflow feel effortless — regardless of their role?
          </p>
          <div class="mt-6 grid grid-cols-3 gap-3 text-center">
            <div v-for="stat in problemStats" :key="stat.label" class="rounded-xl bg-white border border-neutral-100 p-3">
              <p class="text-2xl font-bold text-[#2563EB]">{{ stat.value }}</p>
              <p class="text-xs text-neutral-500 mt-0.5">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-5xl px-6"><div class="border-t border-neutral-100"></div></div>

    <!-- Goals -->
    <section class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2563EB] text-sm font-bold">→</div>
        <h2 class="text-2xl font-bold text-neutral-900">Goals & Objectives</h2>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="goal in goals" :key="goal.title" class="rounded-2xl border border-neutral-100 p-6">
          <div :class="['h-10 w-10 rounded-xl flex items-center justify-center text-xl mb-4', goal.bg]">{{ goal.icon }}</div>
          <h3 class="font-semibold text-neutral-900 mb-2">{{ goal.title }}</h3>
          <ul class="space-y-2">
            <li v-for="pt in goal.points" :key="pt" class="flex items-start gap-2 text-sm text-neutral-600">
              <span class="mt-1.5 h-1 w-1 rounded-full bg-[#2563EB] shrink-0"></span>
              {{ pt }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-5xl px-6"><div class="border-t border-neutral-100"></div></div>

    <!-- Research -->
    <section id="research" class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm">🔍</div>
        <h2 class="text-2xl font-bold text-neutral-900">Research & Discovery</h2>
      </div>
      <p class="text-neutral-600 mb-8 max-w-2xl">I mapped the team's daily touchpoints against available tools to identify where the UX gaps were causing the most friction.</p>

      <!-- Persona -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="rounded-2xl border border-neutral-100 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <p class="text-xs uppercase tracking-wider text-[#2563EB] font-semibold mb-4">Primary Persona</p>
          <div class="flex items-center gap-4 mb-4">
            <div class="h-12 w-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#4F46E5] flex items-center justify-center text-white font-bold text-lg">A</div>
            <div>
              <p class="font-semibold text-neutral-900">Alex — Graphic Designer</p>
              <p class="text-sm text-neutral-500">Mid-level, 2 years on the team</p>
            </div>
          </div>
          <div class="space-y-2 text-sm text-neutral-700">
            <p><span class="font-medium text-neutral-900">Goal:</span> Know my attendance, KPI score, and task list without asking anyone.</p>
            <p><span class="font-medium text-neutral-900">Frustration:</span> Can't find yesterday's check-in time. HR sends it separately each month.</p>
            <p><span class="font-medium text-neutral-900">Behaviour:</span> Checks Telegram every morning for updates. Misses pinned messages frequently.</p>
          </div>
        </div>
        <div class="rounded-2xl border border-neutral-100 p-6 bg-gradient-to-br from-amber-50 to-orange-50">
          <p class="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-4">Secondary Persona</p>
          <div class="flex items-center gap-4 mb-4">
            <div class="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">M</div>
            <div>
              <p class="font-semibold text-neutral-900">Manager — Creative Lead</p>
              <p class="text-sm text-neutral-500">Oversees all 8 team members</p>
            </div>
          </div>
          <div class="space-y-2 text-sm text-neutral-700">
            <p><span class="font-medium text-neutral-900">Goal:</span> See team attendance, task progress, and KPI standing at a glance each morning.</p>
            <p><span class="font-medium text-neutral-900">Frustration:</span> Manually compiles KPI scores from a spreadsheet every two weeks.</p>
            <p><span class="font-medium text-neutral-900">Behaviour:</span> Sends status-update messages in group chat; half go unread.</p>
          </div>
        </div>
      </div>

      <!-- Comparison table -->
      <div class="overflow-x-auto rounded-2xl border border-neutral-100">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-neutral-50 border-b border-neutral-100">
              <th class="text-left px-5 py-3.5 font-semibold text-neutral-700">User Need</th>
              <th class="px-5 py-3.5 font-semibold text-neutral-500 text-center">Current Experience</th>
              <th class="px-5 py-3.5 font-semibold text-[#2563EB] text-center">DGSystem Design</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in researchRows" :key="row.need" :class="i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'">
              <td class="px-5 py-3.5 font-medium text-neutral-800">{{ row.need }}</td>
              <td class="px-5 py-3.5 text-center text-neutral-500 text-xs">{{ row.current }}</td>
              <td class="px-5 py-3.5 text-center text-[#2563EB] font-medium text-xs">{{ row.design }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="mx-auto max-w-5xl px-6"><div class="border-t border-neutral-100"></div></div>

    <!-- Define / Synthesis -->
    <section class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-sm">◎</div>
        <h2 class="text-2xl font-bold text-neutral-900">Define & Synthesis</h2>
      </div>
      <p class="text-neutral-500 mb-8 max-w-2xl">After mapping the research findings, I reframed the problems as How Might We statements to open up the design space before committing to solutions.</p>

      <div class="grid md:grid-cols-2 gap-4 mb-10">
        <div v-for="hmw in hmwStatements" :key="hmw.q" class="rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-blue-100 p-5">
          <p class="text-[10px] uppercase tracking-wider text-[#2563EB] font-semibold mb-2">HMW</p>
          <p class="text-sm font-semibold text-neutral-800 leading-snug">{{ hmw.q }}</p>
          <p class="text-xs text-neutral-500 mt-2">→ Led to: <span class="font-medium text-neutral-700">{{ hmw.led }}</span></p>
        </div>
      </div>

      <!-- Scope definition -->
      <div class="rounded-2xl border border-neutral-100 overflow-hidden">
        <div class="bg-neutral-50 border-b border-neutral-100 px-5 py-3">
          <p class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Defined Scope — What we're designing vs. what we're not</p>
        </div>
        <div class="grid md:grid-cols-2 divide-x divide-neutral-100">
          <div class="p-5">
            <p class="text-xs font-semibold text-emerald-600 mb-3">In scope ✓</p>
            <ul class="space-y-2">
              <li v-for="s in inScope" :key="s" class="flex gap-2 text-sm text-neutral-700">
                <span class="text-emerald-500 shrink-0">•</span>{{ s }}
              </li>
            </ul>
          </div>
          <div class="p-5">
            <p class="text-xs font-semibold text-red-500 mb-3">Out of scope ✗</p>
            <ul class="space-y-2">
              <li v-for="s in outScope" :key="s" class="flex gap-2 text-sm text-neutral-700">
                <span class="text-red-400 shrink-0">•</span>{{ s }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-5xl px-6"><div class="border-t border-neutral-100"></div></div>

    <!-- Ideation -->
    <section id="ideation" class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-sm">✏️</div>
        <h2 class="text-2xl font-bold text-neutral-900">Ideation</h2>
      </div>
      <p class="text-neutral-500 mb-8 max-w-2xl">Before any visual design, I mapped the key user flows and sketched low-fidelity wireframes for the most-used screens to validate layout and hierarchy early.</p>

      <!-- User Flows (Flowcharts) -->
      <p class="text-sm font-semibold text-neutral-700 mb-4">Key User Flows</p>
      <div class="space-y-6 mb-10">

        <!-- Flow 1: Daily Check-in -->
        <div class="rounded-2xl border border-neutral-100 overflow-hidden">
          <div class="px-5 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center gap-3">
            <span>🕐</span>
            <div>
              <p class="text-sm font-semibold text-neutral-800">Daily Check-in</p>
              <p class="text-xs text-neutral-500">Team member — every morning</p>
            </div>
          </div>
          <div class="p-5 overflow-x-auto">
            <svg viewBox="0 0 750 88" xmlns="http://www.w3.org/2000/svg" style="min-width:500px;width:100%">
              <defs><marker id="af1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#9ca3af"/></marker></defs>
              <rect x="10" y="20" width="128" height="48" rx="24" fill="#2563EB"/>
              <text x="74" y="41" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui,sans-serif">Open</text>
              <text x="74" y="55" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui,sans-serif">Dashboard</text>
              <line x1="138" y1="44" x2="155" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af1)"/>
              <rect x="160" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="224" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui,sans-serif">See Clock</text>
              <text x="224" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui,sans-serif">Widget</text>
              <line x1="288" y1="44" x2="305" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af1)"/>
              <rect x="310" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="374" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui,sans-serif">Click</text>
              <text x="374" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui,sans-serif">Check In</text>
              <line x1="438" y1="44" x2="455" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af1)"/>
              <rect x="460" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="524" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui,sans-serif">Time</text>
              <text x="524" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui,sans-serif">Recorded</text>
              <line x1="588" y1="44" x2="605" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af1)"/>
              <rect x="610" y="20" width="128" height="48" rx="24" fill="#4F46E5"/>
              <text x="674" y="41" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui,sans-serif">View</text>
              <text x="674" y="55" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui,sans-serif">Attendance</text>
            </svg>
          </div>
        </div>

        <!-- Flow 2: KPI Submission with decision diamond -->
        <div class="rounded-2xl border border-neutral-100 overflow-hidden">
          <div class="px-5 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center gap-3">
            <span>🏅</span>
            <div>
              <p class="text-sm font-semibold text-neutral-800">KPI Submission</p>
              <p class="text-xs text-neutral-500">Reporter → Manager approval</p>
            </div>
          </div>
          <div class="p-5 overflow-x-auto">
            <svg viewBox="0 0 740 240" xmlns="http://www.w3.org/2000/svg" style="min-width:500px;width:100%">
              <defs><marker id="af2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#9ca3af"/></marker></defs>
              <rect x="10" y="20" width="128" height="48" rx="24" fill="#2563EB"/>
              <text x="74" y="41" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Open KPI</text>
              <text x="74" y="55" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Page</text>
              <line x1="138" y1="44" x2="155" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af2)"/>
              <rect x="160" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="224" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Click Add</text>
              <text x="224" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Entry</text>
              <line x1="288" y1="44" x2="305" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af2)"/>
              <rect x="310" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="374" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Fill Details</text>
              <text x="374" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">+ Points</text>
              <line x1="438" y1="44" x2="455" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af2)"/>
              <rect x="460" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="524" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Submit for</text>
              <text x="524" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Review</text>
              <line x1="524" y1="68" x2="524" y2="96" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af2)"/>
              <polygon points="524,100 580,128 524,156 468,128" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
              <text x="524" y="123" text-anchor="middle" font-size="9" fill="#92400E" font-family="system-ui">Manager</text>
              <text x="524" y="136" text-anchor="middle" font-size="9" fill="#92400E" font-family="system-ui">Approved?</text>
              <line x1="468" y1="128" x2="362" y2="128" stroke="#9ca3af" stroke-width="1.5"/>
              <line x1="362" y1="128" x2="362" y2="178" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af2)"/>
              <text x="414" y="122" text-anchor="middle" font-size="9" fill="#059669" font-weight="700" font-family="system-ui">YES</text>
              <rect x="298" y="178" width="128" height="48" rx="24" fill="#059669"/>
              <text x="362" y="199" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Score</text>
              <text x="362" y="213" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Updated ✓</text>
              <line x1="580" y1="128" x2="660" y2="128" stroke="#9ca3af" stroke-width="1.5"/>
              <line x1="660" y1="128" x2="660" y2="178" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af2)"/>
              <text x="618" y="122" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="700" font-family="system-ui">NO</text>
              <rect x="596" y="178" width="128" height="48" rx="24" fill="#DC2626"/>
              <text x="660" y="199" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Entry</text>
              <text x="660" y="213" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Rejected ✗</text>
            </svg>
          </div>
        </div>

        <!-- Flow 3: Task Management -->
        <div class="rounded-2xl border border-neutral-100 overflow-hidden">
          <div class="px-5 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center gap-3">
            <span>✅</span>
            <div>
              <p class="text-sm font-semibold text-neutral-800">Task Management</p>
              <p class="text-xs text-neutral-500">Team member — any time</p>
            </div>
          </div>
          <div class="p-5 overflow-x-auto">
            <svg viewBox="0 0 900 88" xmlns="http://www.w3.org/2000/svg" style="min-width:600px;width:100%">
              <defs><marker id="af3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#9ca3af"/></marker></defs>
              <rect x="10" y="20" width="128" height="48" rx="24" fill="#2563EB"/>
              <text x="74" y="41" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Open</text>
              <text x="74" y="55" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Tasks</text>
              <line x1="138" y1="44" x2="155" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af3)"/>
              <rect x="160" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="224" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Filter</text>
              <text x="224" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">by Status</text>
              <line x1="288" y1="44" x2="305" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af3)"/>
              <rect x="310" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="374" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">View Due-date</text>
              <text x="374" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Badge</text>
              <line x1="438" y1="44" x2="455" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af3)"/>
              <rect x="460" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="524" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Switch to</text>
              <text x="524" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Kanban</text>
              <line x1="588" y1="44" x2="605" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af3)"/>
              <rect x="610" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="674" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Drag Card</text>
              <text x="674" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">to Done</text>
              <line x1="738" y1="44" x2="755" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af3)"/>
              <rect x="760" y="20" width="128" height="48" rx="24" fill="#4F46E5"/>
              <text x="824" y="41" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Task</text>
              <text x="824" y="55" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Completed</text>
            </svg>
          </div>
        </div>

        <!-- Flow 4: Post Announcement -->
        <div class="rounded-2xl border border-neutral-100 overflow-hidden">
          <div class="px-5 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center gap-3">
            <span>📢</span>
            <div>
              <p class="text-sm font-semibold text-neutral-800">Post an Announcement</p>
              <p class="text-xs text-neutral-500">Manager</p>
            </div>
          </div>
          <div class="p-5 overflow-x-auto">
            <svg viewBox="0 0 900 88" xmlns="http://www.w3.org/2000/svg" style="min-width:600px;width:100%">
              <defs><marker id="af4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#9ca3af"/></marker></defs>
              <rect x="10" y="20" width="128" height="48" rx="24" fill="#2563EB"/>
              <text x="74" y="41" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Open</text>
              <text x="74" y="55" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Announcements</text>
              <line x1="138" y1="44" x2="155" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af4)"/>
              <rect x="160" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="224" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Click New</text>
              <text x="224" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Announcement</text>
              <line x1="288" y1="44" x2="305" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af4)"/>
              <rect x="310" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="374" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Choose Type</text>
              <text x="374" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">+ Write</text>
              <line x1="438" y1="44" x2="455" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af4)"/>
              <rect x="460" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="524" y="44" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Publish Post</text>
              <line x1="588" y1="44" x2="605" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af4)"/>
              <rect x="610" y="20" width="128" height="48" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
              <text x="674" y="41" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">All Team</text>
              <text x="674" y="55" text-anchor="middle" font-size="10" fill="#374151" font-family="system-ui">Notified</text>
              <line x1="738" y1="44" x2="755" y2="44" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#af4)"/>
              <rect x="760" y="20" width="128" height="48" rx="24" fill="#4F46E5"/>
              <text x="824" y="41" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Unread Badge</text>
              <text x="824" y="55" text-anchor="middle" font-size="11" font-weight="600" fill="white" font-family="system-ui">Shown ✓</text>
            </svg>
          </div>
        </div>

      </div>

      <!-- Wireframes -->
      <p class="text-sm font-semibold text-neutral-700 mb-4">Low-Fidelity Wireframes</p>
      <div class="grid md:grid-cols-3 gap-4">
        <div v-for="wf in wireframes" :key="wf.label" class="rounded-2xl border border-neutral-100 overflow-hidden">
          <div class="bg-neutral-100 p-4" style="min-height:160px">
            <!-- Wireframe sketch SVG -->
            <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" class="w-full">
              <!-- Sidebar -->
              <rect x="2" y="2" width="38" height="126" rx="3" fill="#e5e7eb"/>
              <rect x="6" y="8" width="30" height="6" rx="2" fill="#d1d5db"/>
              <rect x="6" y="20" width="20" height="4" rx="1" fill="#d1d5db"/>
              <rect x="6" y="28" width="24" height="4" rx="1" fill="#d1d5db"/>
              <rect x="6" y="36" width="22" height="4" rx="1" fill="#d1d5db"/>
              <rect x="6" y="44" width="26" height="4" rx="1" fill="#d1d5db"/>
              <rect x="6" y="56" width="18" height="3" rx="1" fill="#e5e7eb"/>
              <rect x="6" y="63" width="24" height="4" rx="1" fill="#d1d5db"/>
              <rect x="6" y="71" width="22" height="4" rx="1" fill="#d1d5db"/>
              <!-- Main area -->
              <rect x="44" y="2" width="154" height="14" rx="3" fill="#e5e7eb"/>
              <rect x="48" y="5" width="40" height="6" rx="2" fill="#d1d5db"/>
              <!-- Content blocks based on screen type -->
              <template v-if="wf.type === 'dashboard'">
                <rect x="44" y="20" width="48" height="28" rx="3" fill="#DBEAFE"/>
                <rect x="96" y="20" width="48" height="28" rx="3" fill="#D1FAE5"/>
                <rect x="148" y="20" width="50" height="28" rx="3" fill="#e5e7eb"/>
                <rect x="44" y="52" width="102" height="40" rx="3" fill="#e5e7eb"/>
                <rect x="150" y="52" width="48" height="40" rx="3" fill="#e5e7eb"/>
                <rect x="44" y="96" width="72" height="30" rx="3" fill="#e5e7eb"/>
                <rect x="120" y="96" width="78" height="30" rx="3" fill="#e5e7eb"/>
              </template>
              <template v-else-if="wf.type === 'table'">
                <rect x="44" y="20" width="154" height="8" rx="2" fill="#DBEAFE"/>
                <rect x="44" y="32" width="154" height="6" rx="1" fill="#e5e7eb"/>
                <rect x="44" y="42" width="154" height="6" rx="1" fill="#f3f4f6"/>
                <rect x="44" y="52" width="154" height="6" rx="1" fill="#e5e7eb"/>
                <rect x="44" y="62" width="154" height="6" rx="1" fill="#f3f4f6"/>
                <rect x="44" y="72" width="154" height="6" rx="1" fill="#e5e7eb"/>
                <rect x="44" y="82" width="154" height="6" rx="1" fill="#f3f4f6"/>
                <rect x="44" y="92" width="154" height="6" rx="1" fill="#e5e7eb"/>
                <rect x="44" y="108" width="60" height="8" rx="4" fill="#DBEAFE"/>
              </template>
              <template v-else>
                <rect x="44" y="20" width="30" height="30" rx="15" fill="#e5e7eb"/>
                <rect x="78" y="24" width="60" height="5" rx="2" fill="#e5e7eb"/>
                <rect x="78" y="34" width="40" height="4" rx="1" fill="#f3f4f6"/>
                <rect x="44" y="58" width="154" height="5" rx="2" fill="#e5e7eb"/>
                <rect x="44" y="67" width="130" height="5" rx="2" fill="#f3f4f6"/>
                <rect x="44" y="76" width="154" height="5" rx="2" fill="#e5e7eb"/>
                <rect x="44" y="85" width="100" height="5" rx="2" fill="#f3f4f6"/>
                <rect x="44" y="100" width="50" height="8" rx="4" fill="#DBEAFE"/>
              </template>
            </svg>
          </div>
          <div class="px-4 py-3 bg-white">
            <p class="text-xs font-semibold text-neutral-700">{{ wf.label }}</p>
            <p class="text-xs text-neutral-400 mt-0.5">{{ wf.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-5xl px-6"><div class="border-t border-neutral-100"></div></div>

    <!-- Information Architecture -->
    <section class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 text-sm">⎇</div>
        <h2 class="text-2xl font-bold text-neutral-900">Information Architecture</h2>
      </div>
      <p class="text-neutral-500 mb-8 max-w-2xl">The sidebar groups modules by frequency of use. Overview stays at the top — the dashboard is where everyone starts their day. Workforce tools follow, then quieter Resources at the bottom.</p>
      <div class="rounded-2xl border border-neutral-100 p-6 overflow-x-auto">
        <svg viewBox="0 0 1220 280" xmlns="http://www.w3.org/2000/svg" style="min-width:720px;width:100%">
          <!-- Root stem -->
          <line x1="600" y1="60" x2="600" y2="90" stroke="#e5e7eb" stroke-width="1.5"/>
          <!-- L2 backbone -->
          <line x1="210" y1="90" x2="1070" y2="90" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="210" y1="90" x2="210" y2="110" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="630" y1="90" x2="630" y2="110" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="1070" y1="90" x2="1070" y2="110" stroke="#e5e7eb" stroke-width="1.5"/>
          <!-- Overview stem + child backbone -->
          <line x1="210" y1="146" x2="210" y2="183" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="155" y1="183" x2="285" y2="183" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="155" y1="183" x2="155" y2="200" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="285" y1="183" x2="285" y2="200" stroke="#e5e7eb" stroke-width="1.5"/>
          <!-- Workforce stem + child backbone -->
          <line x1="630" y1="146" x2="630" y2="183" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="420" y1="183" x2="892" y2="183" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="420" y1="183" x2="420" y2="200" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="565" y1="183" x2="565" y2="200" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="672" y1="183" x2="672" y2="200" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="770" y1="183" x2="770" y2="200" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="892" y1="183" x2="892" y2="200" stroke="#e5e7eb" stroke-width="1.5"/>
          <!-- Resources stem + child backbone -->
          <line x1="1070" y1="146" x2="1070" y2="183" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="1022" y1="183" x2="1152" y2="183" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="1022" y1="183" x2="1022" y2="200" stroke="#e5e7eb" stroke-width="1.5"/>
          <line x1="1152" y1="183" x2="1152" y2="200" stroke="#e5e7eb" stroke-width="1.5"/>
          <!-- Root node -->
          <rect x="520" y="20" width="160" height="40" rx="20" fill="#2563EB"/>
          <text x="600" y="45" text-anchor="middle" font-size="13" font-weight="700" fill="white" font-family="system-ui,sans-serif">DGSystem</text>
          <!-- L2: category nodes -->
          <rect x="130" y="110" width="160" height="36" rx="8" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1.5"/>
          <text x="210" y="133" text-anchor="middle" font-size="11" font-weight="600" fill="#1e40af" font-family="system-ui,sans-serif">Overview</text>
          <rect x="506" y="110" width="248" height="36" rx="8" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1.5"/>
          <text x="630" y="133" text-anchor="middle" font-size="11" font-weight="600" fill="#1e40af" font-family="system-ui,sans-serif">Workforce</text>
          <rect x="970" y="110" width="200" height="36" rx="8" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1.5"/>
          <text x="1070" y="133" text-anchor="middle" font-size="11" font-weight="600" fill="#1e40af" font-family="system-ui,sans-serif">Resources</text>
          <!-- L3: module nodes (y=200, h=54) — name + sub-pages label -->
          <!-- Under Overview -->
          <rect x="93" y="200" width="124" height="54" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
          <text x="155" y="221" text-anchor="middle" font-size="10" font-weight="600" fill="#374151" font-family="system-ui,sans-serif">📊 Dashboard</text>
          <text x="155" y="238" text-anchor="middle" font-size="8.5" fill="#9ca3af" font-family="system-ui,sans-serif">KPI · Tasks · Presence</text>
          <rect x="227" y="200" width="116" height="54" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
          <text x="285" y="221" text-anchor="middle" font-size="10" font-weight="600" fill="#374151" font-family="system-ui,sans-serif">👤 Profile</text>
          <text x="285" y="238" text-anchor="middle" font-size="8.5" fill="#9ca3af" font-family="system-ui,sans-serif">Account · Settings</text>
          <!-- Under Workforce -->
          <rect x="353" y="200" width="134" height="54" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
          <text x="420" y="221" text-anchor="middle" font-size="10" font-weight="600" fill="#374151" font-family="system-ui,sans-serif">🕐 Attendance</text>
          <text x="420" y="238" text-anchor="middle" font-size="8.5" fill="#9ca3af" font-family="system-ui,sans-serif">Log · Breaks · Report</text>
          <rect x="513" y="200" width="104" height="54" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
          <text x="565" y="221" text-anchor="middle" font-size="10" font-weight="600" fill="#374151" font-family="system-ui,sans-serif">🏅 KPI</text>
          <text x="565" y="238" text-anchor="middle" font-size="8.5" fill="#9ca3af" font-family="system-ui,sans-serif">Entries · Board</text>
          <rect x="630" y="200" width="84" height="54" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
          <text x="672" y="221" text-anchor="middle" font-size="10" font-weight="600" fill="#374151" font-family="system-ui,sans-serif">✅ Tasks</text>
          <text x="672" y="238" text-anchor="middle" font-size="8.5" fill="#9ca3af" font-family="system-ui,sans-serif">Table · Kanban</text>
          <rect x="714" y="200" width="112" height="54" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
          <text x="770" y="221" text-anchor="middle" font-size="10" font-weight="600" fill="#374151" font-family="system-ui,sans-serif">🔑 Accounts</text>
          <text x="770" y="238" text-anchor="middle" font-size="8.5" fill="#9ca3af" font-family="system-ui,sans-serif">Vault · Search</text>
          <rect x="830" y="200" width="124" height="54" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
          <text x="892" y="221" text-anchor="middle" font-size="10" font-weight="600" fill="#374151" font-family="system-ui,sans-serif">📢 Announcements</text>
          <text x="892" y="238" text-anchor="middle" font-size="8.5" fill="#9ca3af" font-family="system-ui,sans-serif">Posts · Pinned</text>
          <!-- Under Resources -->
          <rect x="966" y="200" width="112" height="54" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
          <text x="1022" y="221" text-anchor="middle" font-size="10" font-weight="600" fill="#374151" font-family="system-ui,sans-serif">📚 Knowledge</text>
          <text x="1022" y="238" text-anchor="middle" font-size="8.5" fill="#9ca3af" font-family="system-ui,sans-serif">Articles · Archive</text>
          <rect x="1096" y="200" width="112" height="54" rx="8" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
          <text x="1152" y="221" text-anchor="middle" font-size="10" font-weight="600" fill="#374151" font-family="system-ui,sans-serif">🔖 Bookmarks</text>
          <text x="1152" y="238" text-anchor="middle" font-size="8.5" fill="#9ca3af" font-family="system-ui,sans-serif">Team Links</text>
        </svg>
      </div>
    </section>

    <div class="mx-auto max-w-5xl px-6"><div class="border-t border-neutral-100"></div></div>

    <!-- Testing & Iteration -->
    <section class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-sm">🔄</div>
        <h2 class="text-2xl font-bold text-neutral-900">Testing & Iteration</h2>
      </div>
      <p class="text-neutral-500 mb-8 max-w-2xl">I ran informal usability walkthroughs with 3 team members across two rounds, focusing on the most-used screens: attendance, tasks, and the dashboard.</p>

      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="rounded-2xl border border-neutral-100 p-6">
          <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-4">Round 1 — Early Prototype</p>
          <div class="space-y-4">
            <div v-for="issue in testIssues" :key="issue.finding" class="border-l-2 border-red-200 pl-4">
              <p class="text-sm font-semibold text-neutral-800">{{ issue.finding }}</p>
              <p class="text-xs text-neutral-500 mt-0.5">{{ issue.quote }}</p>
            </div>
          </div>
        </div>
        <div class="rounded-2xl border border-neutral-100 p-6">
          <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-4">What changed after testing</p>
          <div class="space-y-4">
            <div v-for="fix in testFixes" :key="fix.change" class="flex gap-3">
              <span class="text-emerald-500 font-bold shrink-0 mt-0.5">→</span>
              <div>
                <p class="text-sm font-semibold text-neutral-800">{{ fix.change }}</p>
                <p class="text-xs text-neutral-500 mt-0.5">{{ fix.why }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Before / After -->
      <div class="rounded-2xl border border-neutral-100 overflow-hidden">
        <div class="bg-neutral-50 border-b border-neutral-100 px-5 py-3">
          <p class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Design changes — Before & After</p>
        </div>
        <div class="divide-y divide-neutral-100">
          <div v-for="ba in beforeAfter" :key="ba.area" class="grid md:grid-cols-3 gap-0 divide-x divide-neutral-100">
            <div class="px-5 py-4 bg-neutral-50/50">
              <p class="text-xs font-semibold text-neutral-500">{{ ba.area }}</p>
            </div>
            <div class="px-5 py-4">
              <p class="text-xs text-red-500 font-medium mb-1">Before</p>
              <p class="text-sm text-neutral-600">{{ ba.before }}</p>
            </div>
            <div class="px-5 py-4">
              <p class="text-xs text-emerald-600 font-medium mb-1">After</p>
              <p class="text-sm text-neutral-700 font-medium">{{ ba.after }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-5xl px-6"><div class="border-t border-neutral-100"></div></div>

    <!-- Design System -->
    <section id="design" class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-sm">🎨</div>
        <h2 class="text-2xl font-bold text-neutral-900">Design System</h2>
      </div>

      <!-- Color palette -->
      <div class="mb-8">
        <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-4">Color Palette</p>
        <div class="flex flex-wrap gap-3">
          <div v-for="color in palette" :key="color.name" class="flex items-center gap-3 rounded-xl border border-neutral-100 px-4 py-3">
            <div :style="{ background: color.hex }" class="h-8 w-8 rounded-lg shadow-sm"></div>
            <div>
              <p class="text-xs font-semibold text-neutral-800">{{ color.name }}</p>
              <p class="text-xs text-neutral-400">{{ color.hex }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Typography -->
      <div class="mb-8 rounded-2xl border border-neutral-100 p-6">
        <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-4">Typography Scale</p>
        <div class="space-y-3">
          <div v-for="type in typography" :key="type.name" class="flex items-center gap-4">
            <span class="text-xs text-neutral-400 w-24 shrink-0">{{ type.name }}</span>
            <span :class="type.class" class="text-neutral-800">{{ type.sample }}</span>
          </div>
        </div>
      </div>

      <!-- Design principles -->
      <div class="grid md:grid-cols-3 gap-4">
        <div v-for="p in principles" :key="p.title" class="rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#EDE9FE] p-5">
          <span class="text-2xl block mb-3">{{ p.icon }}</span>
          <h3 class="font-semibold text-neutral-800 text-sm mb-1">{{ p.title }}</h3>
          <p class="text-xs text-neutral-600 leading-relaxed">{{ p.desc }}</p>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-5xl px-6"><div class="border-t border-neutral-100"></div></div>

    <!-- Screens -->
    <section id="screens" class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 text-sm">🖥️</div>
        <h2 class="text-2xl font-bold text-neutral-900">Screens</h2>
      </div>
      <p class="text-neutral-500 mb-10 max-w-2xl">Every screen is designed around a single daily job-to-be-done. The sidebar stays visible at all times so context is never lost mid-task.</p>

      <!-- Login full-width -->
      <div class="mb-6 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
        <div class="bg-neutral-50 border-b border-neutral-100 px-5 py-3 flex items-center justify-between">
          <span class="text-xs font-semibold text-neutral-600">Login</span>
          <span class="text-xs text-neutral-400">Two-pane layout — brand presence left, minimal form right</span>
        </div>
        <img src="/screenshots/login.png" alt="Login" class="w-full" />
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="sc in screensList" :key="sc.name" class="rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
          <div class="bg-neutral-50 border-b border-neutral-100 px-4 py-3">
            <p class="text-xs font-semibold text-neutral-600">{{ sc.label }}</p>
            <p class="text-xs text-neutral-400 mt-0.5">{{ sc.note }}</p>
          </div>
          <img :src="`/screenshots/${sc.name}.png`" :alt="sc.label" class="w-full" />
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-5xl px-6"><div class="border-t border-neutral-100"></div></div>

    <!-- Outcome -->
    <section class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm">↑</div>
        <h2 class="text-2xl font-bold text-neutral-900">Outcome</h2>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div v-for="r in results" :key="r.label" class="rounded-2xl border border-neutral-100 p-5 text-center">
          <p class="text-3xl font-bold text-[#2563EB]">{{ r.value }}</p>
          <p class="text-xs text-neutral-500 mt-1.5 leading-snug">{{ r.label }}</p>
        </div>
      </div>
      <div class="rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#4F46E5] p-8 text-white">
        <p class="text-xs uppercase tracking-wider text-white/60 font-medium mb-3">Before → After</p>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="rep in replaced" :key="rep.before">
            <p class="text-sm font-semibold mb-1">{{ rep.before }}</p>
            <p class="text-xs text-white/70">→ {{ rep.after }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-5xl px-6"><div class="border-t border-neutral-100"></div></div>

    <!-- Reflection -->
    <section class="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 text-sm">💭</div>
        <h2 class="text-2xl font-bold text-neutral-900">Reflection</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="rounded-2xl border border-neutral-100 p-6">
          <h3 class="font-semibold text-neutral-800 mb-3">What worked well</h3>
          <ul class="space-y-3">
            <li v-for="w in workedWell" :key="w" class="flex gap-3 text-sm text-neutral-600">
              <span class="text-emerald-500 font-bold mt-0.5 shrink-0">✓</span>{{ w }}
            </li>
          </ul>
        </div>
        <div class="rounded-2xl border border-neutral-100 p-6">
          <h3 class="font-semibold text-neutral-800 mb-3">What I'd do differently</h3>
          <ul class="space-y-3">
            <li v-for="d in doDiff" :key="d" class="flex gap-3 text-sm text-neutral-600">
              <span class="text-amber-500 font-bold mt-0.5 shrink-0">→</span>{{ d }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-neutral-100 bg-neutral-50">
      <div class="mx-auto max-w-5xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="h-7 w-7 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#4F46E5] flex items-center justify-center">
            <span class="text-white text-[10px] font-bold">DG</span>
          </div>
          <span class="text-sm font-medium text-neutral-700">DGSystem</span>
        </div>
        <p class="text-xs text-neutral-400">UI/UX Design · DG Group Internal Tool</p>
        <a href="/" class="text-sm text-[#2563EB] font-medium hover:underline">← Back to app</a>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
const meta = [
  { label: 'Role',     value: 'UI/UX Designer' },
  { label: 'Team',     value: '8 members, DG Group' },
  { label: 'Platform', value: 'Desktop Web App' },
  { label: 'Tools',    value: 'Figma, Tailwind CSS' },
  { label: 'Timeline', value: 'Ongoing product' },
]

const painPoints = [
  "Team members couldn't check their own attendance without contacting HR.",
  'KPI scores were calculated manually from spreadsheets — often late or inaccurate.',
  'Task assignments lived in group chats that scrolled away and got missed.',
  'Shared account passwords were sent over chat with no central record.',
  'Announcements pinned in Telegram got buried under daily conversation.',
]

const problemStats = [
  { value: '8',  label: 'team members' },
  { value: '5+', label: 'disconnected tools' },
  { value: '0',  label: 'self-serve views' },
]

const goals = [
  {
    icon: '👤', bg: 'bg-blue-100',
    title: 'Team Member Experience',
    points: [
      'Check attendance and break history without asking anyone.',
      'See personal KPI score and task list in one place.',
      "Receive announcements the moment they're posted.",
    ],
  },
  {
    icon: '🏆', bg: 'bg-amber-100',
    title: 'Manager Experience',
    points: [
      'See full team attendance at a glance — daily and monthly.',
      'Review and approve KPI entries with one click.',
      'Post typed announcements that persist and are visible to all.',
    ],
  },
  {
    icon: '🎯', bg: 'bg-neutral-100',
    title: 'Design Goals',
    points: [
      'One consistent visual language across all 9 modules.',
      'Desktop-first layout with a persistent sidebar for context.',
      'Dark mode support with accessible color contrast throughout.',
    ],
  },
]

const hmwStatements = [
  { q: "How might we let team members check their own attendance without contacting HR?", led: "Self-serve calendar heatmap per employee" },
  { q: "How might we make KPI scores visible and fair without a manager manually compiling them?", led: "Leaderboard with approval workflow" },
  { q: "How might we surface task updates without relying on group chats that scroll away?", led: "Persistent task board with due-date indicators" },
  { q: "How might we give the manager a morning overview of the team's status in under 30 seconds?", led: "Dashboard with live clock, presence, task ring" },
]

const inScope = [
  'Attendance logging, break tracking, and monthly report export',
  'KPI entry submission, review, and leaderboard',
  'Task table and Kanban view with due-date tracking',
  'Shared accounts vault with category filtering',
  'Team announcements with unread state',
  'Bookmarks and knowledge archive',
]

const outScope = [
  'Payroll calculation or salary records',
  'Leave/time-off request workflow',
  'Real-time messaging or chat',
  'Mobile companion app (desktop-first only)',
  'Integration with external HR systems',
]

const wireframes = [
  { type: 'dashboard', label: 'Dashboard', note: '3 stat cards + trend chart + presence panel' },
  { type: 'table',     label: 'Attendance / Tasks', note: 'Header row + data rows + pagination' },
  { type: 'profile',   label: 'KPI / Accounts detail', note: 'Avatar + info rows + action button' },
]

const testIssues = [
  { finding: 'Attendance calendar: month unclear', quote: '"I don\'t know which month this is showing without scrolling up."' },
  { finding: 'KPI page: approve button not visible', quote: '"I see the entries but where do I approve them?"' },
  { finding: 'Tasks: no way to tell what\'s overdue', quote: '"These all look the same — I can\'t tell which ones are late."' },
]

const testFixes = [
  { change: 'Added month + year header above attendance calendar', why: 'Testers didn\'t know which period was showing without context.' },
  { change: 'Approve/Reject column only visible to admins', why: 'Non-admins were confused by review buttons they had no permission to use.' },
  { change: 'Added colour-coded due-date badges (red = overdue, amber = today)', why: 'Tasks were visually identical — urgency was invisible at a glance.' },
  { change: 'Added sidebar collapse to give content more room', why: 'On smaller laptops the sidebar was eating too much horizontal space.' },
]

const beforeAfter = [
  { area: 'Attendance calendar',    before: 'No month label — users had to scroll to orient themselves', after: 'Month + year always visible in the section header' },
  { area: 'Task urgency',           before: 'All tasks looked identical — no visual priority', after: 'Colour-coded badges: red overdue, amber due today, neutral upcoming' },
  { area: 'KPI review columns',     before: 'Approve/Reject buttons shown to all users', after: 'Admin-only columns — non-admins see a clean read-only view' },
  { area: 'Sidebar',                before: 'Always expanded — crowded on 13" screens', after: 'Collapsible to icon-only mode with one click' },
]

const researchRows = [
  { need: 'Check my attendance',       current: 'Ask HR or wait for monthly email',    design: 'Self-serve calendar heatmap per employee' },
  { need: 'Track task progress',       current: 'Scroll through Telegram chat history', design: 'Table + Kanban with due-date countdown badges' },
  { need: 'See my KPI score',          current: 'Wait for manager to compile spreadsheet', design: 'Personal leaderboard view, always current' },
  { need: 'Find shared credentials',   current: 'Ask in group chat or search old messages', design: 'Searchable accounts vault with categories' },
  { need: 'Read announcements',        current: 'Telegram — pinned items get buried',   design: 'Typed posts with unread indicator + pin support' },
  { need: 'Know who is online today',  current: 'Not possible without messaging everyone', design: 'Live team presence panel on dashboard' },
  { need: 'Access shared resources',   current: 'Bookmarks in individual browsers',     design: 'Team-wide bookmark and knowledge archive' },
]

const userFlows = [
  {
    icon: '🕐', title: 'Daily Check-in', who: 'Team member — every morning',
    steps: ['Open dashboard', 'See clock widget', 'Click Check In', "View today's status in attendance"],
  },
  {
    icon: '🏅', title: 'KPI Submission', who: 'Reporter → Manager approval',
    steps: ['Open KPI page', 'Click Add Entry', 'Fill title + points + reportee', 'Submit for review', 'Manager approves or rejects'],
  },
  {
    icon: '✅', title: 'Task Management', who: 'Team member — any time',
    steps: ['Open Tasks', 'Filter by status or priority', 'View due-date badge', 'Switch to Kanban', 'Drag card to Done'],
  },
  {
    icon: '📢', title: 'Post an Announcement', who: 'Manager',
    steps: ['Open Announcements', 'Click New Announcement', 'Choose type (urgent / general)', 'Write message', 'Post — all team sees it unread'],
  },
]

const navTree = [
  {
    section: 'Overview',
    items: [{ icon: '📊', name: 'Dashboard' }],
  },
  {
    section: 'Workforce',
    items: [
      { icon: '🕐', name: 'Attendance', children: ['Overview', 'Breaks', 'Report'] },
      { icon: '🏅', name: 'KPI', children: ['Entries', 'Rules'] },
      { icon: '✅', name: 'Tasks', children: ['Table', 'Kanban'] },
      { icon: '👤', name: 'Accounts' },
    ],
  },
  {
    section: 'Resources',
    items: [
      { icon: '📚', name: 'Knowledge' },
      { icon: '🔖', name: 'Bookmarks' },
    ],
  },
]

const iaDecisions = [
  { title: 'Dashboard first', reason: "It's the daily entry point. Clock, KPI snapshot, task ring, and team presence give instant orientation without navigating anywhere." },
  { title: 'Sidebar always visible', reason: 'Hiding the nav on mobile patterns would cost too much on desktop — the team works at desks. Permanent sidebar means zero "where am I?" confusion.' },
  { title: 'Workforce grouped together', reason: 'Attendance, KPI, Tasks, and Accounts are all job-related. Grouping them tells users: this is where your daily work lives.' },
  { title: 'Resources at the bottom', reason: 'Knowledge base and Bookmarks are reference tools — accessed occasionally, not daily. They sit below the fold in the sidebar naturally.' },
  { title: 'Role-based visibility', reason: 'Non-admins see only their own KPI entries. Admins see the full leaderboard and approve/reject columns. Same layout, different data.' },
]

const palette = [
  { name: 'Brand Blue',    hex: '#2563EB' },
  { name: 'Brand Indigo',  hex: '#4F46E5' },
  { name: 'Surface Dark',  hex: '#0f172a' },
  { name: 'Text Primary',  hex: '#171717' },
  { name: 'Text Muted',    hex: '#737373' },
  { name: 'Border Light',  hex: '#f3f4f6' },
  { name: 'Success',       hex: '#10b981' },
  { name: 'Warning',       hex: '#f59e0b' },
]

const typography = [
  { name: 'Page Title',   class: 'text-2xl font-bold',      sample: 'Good evening, Alex 👋' },
  { name: 'Section H2',   class: 'text-lg font-semibold',   sample: 'Working Hours Trend' },
  { name: 'Card Label',   class: 'text-xs uppercase tracking-wider font-semibold', sample: 'MONTHLY TASKS' },
  { name: 'Body',         class: 'text-sm text-neutral-600', sample: 'Todo: 10 · Doing: 7 · Done: 21' },
  { name: 'Badge / Tag',  class: 'text-xs font-medium',     sample: 'High priority · Due today' },
]

const principles = [
  { icon: '🎯', title: 'Clarity over cleverness', desc: 'Every screen has one primary action. Labels describe exactly what they do. No ambiguous icons without text.' },
  { icon: '📐', title: 'Consistent spacing', desc: 'px-5 py-5 cards, space-y-6 page wrappers, gap-4 grids — applied without exception across all 9 modules.' },
  { icon: '🌙', title: 'Dark mode by default', desc: 'The team works long hours. The app respects that — all color tokens are defined for both modes via CSS custom properties.' },
]

const screensList = [
  { name: 'dashboard',  label: 'Dashboard',      note: 'Live clock, KPI cards, task ring, working hours trend, team presence, recent activity' },
  { name: 'attendance', label: 'Attendance',      note: 'Monthly calendar heatmap — green = on time, red = late. Break log below.' },
  { name: 'kpi',        label: 'KPI',             note: 'Personal entries table. Admins see approve/reject column and full leaderboard.' },
  { name: 'tasks',      label: 'Tasks — Table',   note: 'Filterable table with priority badges and due-date countdown chips.' },
  { name: 'accounts',   label: 'Accounts Vault',  note: 'Searchable credentials organised by category. Click any row to edit.' },
  { name: 'bookmarks',  label: 'Bookmarks',       note: 'Team-wide bookmark library grouped by category. Opens in new tab.' },
]

const results = [
  { value: '9',   label: 'modules in one consistent interface' },
  { value: '5→1', label: 'tools replaced by a single dashboard' },
  { value: '0',   label: '"where do I check X?" messages to HR' },
  { value: '100%', label: 'self-serve access for every team member' },
]

const replaced = [
  { before: 'Spreadsheet attendance',          after: 'Self-serve calendar heatmap per employee' },
  { before: 'Telegram task threads',           after: 'Persistent Kanban + table with due dates' },
  { before: 'Manual KPI spreadsheets',         after: 'Live leaderboard with one-click approval' },
  { before: 'Passwords over chat',             after: 'Searchable vault, always accessible' },
  { before: 'Announcements lost in chat',      after: 'Typed posts with unread state + pin' },
  { before: 'Five tools, five login screens',  after: 'One interface, one login' },
]

const workedWell = [
  'Desktop-first layout with a persistent sidebar eliminated "lost in navigation" moments entirely.',
  'Color-coded attendance heatmap (green/red/amber) makes punctuality trends instantly readable without needing numbers.',
  'Separating KPI entry from leaderboard — admins review, team sees scores — kept the privacy model clear.',
  'Consistent card padding (px-5 py-5) across all modules made the interface feel like one product, not a patchwork.',
]

const doDiff = [
  'Run usability testing with the actual team earlier — some edge cases in the attendance calendar were found late.',
  'Design a mobile companion view — team members sometimes check their status on phones between meetings.',
  'Add empty states with clear CTAs — some first-time screens feel blank without seed data context.',
  "Explore a notification system for announcements so updates surface even when the app isn't open.",
]
</script>

<style scoped>
.font-sans {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
