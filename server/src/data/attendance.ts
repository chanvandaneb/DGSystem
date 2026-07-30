export interface AttendanceRecord {
  id: string
  department: string
  eid: string
  name: string
  date: string
  checkIn: string
  checkOut: string | null
  breaks: number
  workingDuration: string
  breakDuration: string
  workingHours: string
}

type Row = [string, string, string | null, number, string, string, string, string, string, string]

const employees: { department: string; eid: string; name: string }[] = [
  { department: 'Design',    eid: 'KH0120', name: 'ALEX'   },
  { department: 'Design',    eid: 'KH0121', name: 'ERIZ'   },
  { department: 'Marketing', eid: 'KH0122', name: 'KRIS'   },
  { department: 'Design',    eid: 'KH0123', name: 'CICI'   },
  { department: 'Marketing', eid: 'KH0124', name: 'ANISE'  },
  { department: 'Design',    eid: 'KH0125', name: 'KELKAY' },
  { department: 'Dev',       eid: 'KH0126', name: 'MAX'    },
  { department: 'Design',    eid: 'KH0127', name: 'LIDAS'  },
]

// [date, checkIn, checkOut, breaks, workingDuration, breakDuration, workingHours]
const sharedDates: [string, string, string | null, number, string, string, string][] = [
  ['2026-07-30', '07:52:00', null,       0, '0 hr 0 min 0 sec',       '0 hr 0 min 0 sec',      '0 hr 0 min 0 sec'],
  ['2026-07-29', '07:45:11', '18:03:22', 3, '10 hr 18 min 12 sec',   '0 hr 45 min 0 sec',     '9 hr 33 min 12 sec'],
  ['2026-07-28', '07:58:44', '18:01:05', 4, '10 hr 2 min 24 sec',    '0 hr 55 min 0 sec',     '9 hr 7 min 24 sec'],
  ['2026-07-25', '08:02:33', '18:00:48', 2, '9 hr 58 min 12 sec',    '0 hr 30 min 0 sec',     '9 hr 28 min 12 sec'],
  ['2026-07-24', '07:49:17', '18:04:30', 3, '10 hr 15 min 12 sec',   '0 hr 48 min 0 sec',     '9 hr 27 min 12 sec'],
  ['2026-07-23', '07:55:02', '18:02:10', 4, '10 hr 7 min 0 sec',     '1 hr 0 min 0 sec',      '9 hr 7 min 0 sec'],
  ['2026-07-22', '08:10:45', '18:00:30', 2, '9 hr 49 min 48 sec',    '0 hr 25 min 0 sec',     '9 hr 24 min 48 sec'],
  ['2026-07-21', '07:41:28', '18:03:15', 5, '10 hr 21 min 48 sec',   '1 hr 10 min 0 sec',     '9 hr 11 min 48 sec'],
  ['2026-07-18', '07:50:00', '18:01:44', 3, '10 hr 11 min 48 sec',   '0 hr 42 min 0 sec',     '9 hr 29 min 48 sec'],
  ['2026-07-17', '08:15:22', '18:00:12', 2, '9 hr 44 min 48 sec',    '0 hr 32 min 0 sec',     '9 hr 12 min 48 sec'],
  ['2026-07-16', '07:48:09', '18:02:55', 4, '10 hr 14 min 48 sec',   '0 hr 58 min 0 sec',     '9 hr 16 min 48 sec'],
  ['2026-07-15', '07:53:41', '18:01:30', 3, '10 hr 7 min 48 sec',    '0 hr 50 min 0 sec',     '9 hr 17 min 48 sec'],
  ['2026-07-14', '07:44:58', '18:03:05', 2, '10 hr 18 min 0 sec',    '0 hr 35 min 0 sec',     '9 hr 43 min 0 sec'],
  ['2026-07-11', '07:57:33', '18:00:22', 4, '10 hr 2 min 48 sec',    '1 hr 2 min 0 sec',      '9 hr 0 min 48 sec'],
  ['2026-07-10', '08:05:14', '18:01:48', 3, '9 hr 56 min 36 sec',    '0 hr 44 min 0 sec',     '9 hr 12 min 36 sec'],
  ['2026-07-09', '07:51:27', '18:02:44', 2, '10 hr 11 min 12 sec',   '0 hr 28 min 0 sec',     '9 hr 43 min 12 sec'],
  ['2026-07-08', '07:46:50', '18:00:55', 4, '10 hr 14 min 0 sec',    '0 hr 52 min 0 sec',     '9 hr 22 min 0 sec'],
  ['2026-07-07', '08:12:05', '18:03:20', 2, '9 hr 51 min 12 sec',    '0 hr 22 min 0 sec',     '9 hr 29 min 12 sec'],
  ['2026-07-04', '07:43:19', '18:01:09', 3, '10 hr 17 min 48 sec',   '0 hr 40 min 0 sec',     '9 hr 37 min 48 sec'],
  ['2026-07-03', '07:59:52', '18:02:30', 4, '10 hr 2 min 36 sec',    '1 hr 5 min 0 sec',      '8 hr 57 min 36 sec'],
  ['2026-07-02', '08:08:30', '18:00:00', 2, '9 hr 51 min 36 sec',    '0 hr 30 min 0 sec',     '9 hr 21 min 36 sec'],
  ['2026-07-01', '07:47:44', '18:03:55', 3, '10 hr 16 min 12 sec',   '0 hr 46 min 0 sec',     '9 hr 30 min 12 sec'],
  ['2026-06-30', '07:54:22', '18:01:15', 4, '10 hr 6 min 48 sec',    '0 hr 58 min 0 sec',     '9 hr 8 min 48 sec'],
  ['2026-06-27', '08:01:38', '18:02:00', 2, '10 hr 0 min 24 sec',    '0 hr 26 min 0 sec',     '9 hr 34 min 24 sec'],
  ['2026-06-26', '07:49:05', '18:00:44', 3, '10 hr 11 min 36 sec',   '0 hr 44 min 0 sec',     '9 hr 27 min 36 sec'],
  ['2026-01-21', '07:59:07', null,       0, '0 hr 0 min 0 sec',       '0 hr 0 min 0 sec',      '0 hr 0 min 0 sec'],
  ['2026-01-20', '07:33:31', '18:04:19', 4, '10 hr 30 min 36 sec',   '0 hr 56 min 24 sec',    '9 hr 34 min 12 sec'],
  ['2026-01-19', '07:46:42', '18:00:55', 4, '10 hr 14 min 24 sec',   '1 hr 4 min 48 sec',     '9 hr 9 min 36 sec'],
  ['2026-01-17', '08:04:01', '18:01:10', 2, '9 hr 57 min 0 sec',     '0 hr 22 min 12 sec',    '9 hr 34 min 48 sec'],
  ['2026-01-16', '07:43:55', '18:00:20', 3, '10 hr 16 min 12 sec',   '0 hr 54 min 36 sec',    '9 hr 21 min 36 sec'],
  ['2026-01-14', '07:34:39', '18:02:12', 4, '10 hr 27 min 36 sec',   '0 hr 56 min 24 sec',    '9 hr 31 min 12 sec'],
  ['2026-01-13', '07:23:51', '18:01:07', 5, '10 hr 37 min 12 sec',   '2 hr 19 min 12 sec',    '8 hr 17 min 60 sec'],
  ['2026-01-12', '08:14:17', '18:02:13', 3, '9 hr 48 min 0 sec',     '0 hr 40 min 12 sec',    '9 hr 7 min 48 sec'],
]

let idCounter = 1
export const attendanceRecords: AttendanceRecord[] = []

for (const emp of employees) {
  // give each employee slightly varied check-in times by adding offset minutes
  const offset = employees.indexOf(emp) * 3
  for (const [date, rawCheckIn, checkOut, breaks, workingDuration, breakDuration, workingHours] of sharedDates) {
    // Skip last 3 dates for some employees to create realistic variation
    if (employees.indexOf(emp) > 4 && sharedDates.indexOf([date, rawCheckIn, checkOut, breaks, workingDuration, breakDuration, workingHours] as typeof sharedDates[0]) >= sharedDates.length - 3) continue
    const [h, m, s] = rawCheckIn.split(':').map(Number)
    const totalMin = h * 60 + m + offset
    const adjH = String(Math.floor(totalMin / 60)).padStart(2, '0')
    const adjM = String(totalMin % 60).padStart(2, '0')
    const adjCheckIn = `${adjH}:${adjM}:${String(s).padStart(2, '0')} (GMT+7)`
    attendanceRecords.push({
      id: String(idCounter++),
      department: emp.department,
      eid: emp.eid,
      name: emp.name,
      date,
      checkIn: adjCheckIn,
      checkOut,
      breaks,
      workingDuration,
      breakDuration,
      workingHours,
    })
  }
}

export interface AttendanceDevice {
  id: string
  name: string
  location: string
  status: 'READY' | 'CAMERA UNAVAILABLE'
}

export const attendanceDevices: AttendanceDevice[] = [
  { id: '1', name: 'Main Entrance', location: 'HQ - Floor 1', status: 'READY' },
  { id: '2', name: 'Side Door', location: 'HQ - Floor 1', status: 'CAMERA UNAVAILABLE' },
]

export interface AttendanceBreak {
  id: string
  date: string
  department: string
  eid: string
  name: string
  checkIn: string
  breakIn: string
  breakOut: string
  checkOut: string | null
  durationBreak: string
  type: 'toilet' | 'mealbreak'
  reason: string
  notes: string
}

const breakRows: [string, string, string, string, string, 'toilet' | 'mealbreak', string][] = [
  ['2026-07-29', '10:11:01', '10:19:51', '0 hr 9 min 0 sec',   '07:45:11', 'toilet',    ''],
  ['2026-07-29', '12:47:06', '13:17:48', '0 hr 30 min 42 sec', '07:45:11', 'mealbreak', 'Lunch'],
  ['2026-07-28', '10:30:00', '10:38:22', '0 hr 8 min 22 sec',  '07:58:44', 'toilet',    ''],
  ['2026-07-28', '12:30:10', '13:05:55', '0 hr 35 min 45 sec', '07:58:44', 'mealbreak', 'Lunch'],
  ['2026-07-25', '12:00:23', '12:30:41', '0 hr 30 min 18 sec', '08:02:33', 'mealbreak', 'Lunch'],
  ['2026-07-24', '10:05:12', '10:12:44', '0 hr 7 min 32 sec',  '07:49:17', 'toilet',    ''],
  ['2026-07-24', '12:55:31', '13:25:23', '0 hr 29 min 52 sec', '07:49:17', 'mealbreak', 'Lunch'],
  ['2026-07-23', '11:45:00', '11:53:15', '0 hr 8 min 15 sec',  '07:55:02', 'toilet',    ''],
  ['2026-07-23', '12:50:00', '13:20:00', '0 hr 30 min 0 sec',  '07:55:02', 'mealbreak', 'Lunch'],
  ['2026-07-23', '15:30:00', '15:38:30', '0 hr 8 min 30 sec',  '07:55:02', 'toilet',    ''],
  ['2026-07-22', '12:45:00', '13:10:00', '0 hr 25 min 0 sec',  '08:10:45', 'mealbreak', 'Lunch'],
  ['2026-07-21', '10:20:00', '10:28:14', '0 hr 8 min 14 sec',  '07:41:28', 'toilet',    ''],
  ['2026-07-21', '12:40:00', '13:15:00', '0 hr 35 min 0 sec',  '07:41:28', 'mealbreak', 'Lunch'],
  ['2026-07-21', '15:45:00', '15:55:00', '0 hr 10 min 0 sec',  '07:41:28', 'toilet',    ''],
  ['2026-01-12', '12:00:23', '12:24:41', '0 hr 24 min 36 sec', '08:14:17', 'mealbreak', 'Lunch'],
  ['2026-01-12', '15:25:25', '15:32:24', '0 hr 7 min 12 sec',  '08:14:17', 'toilet',    ''],
  ['2026-01-13', '10:08:27', '10:17:22', '0 hr 9 min 0 sec',   '07:23:51', 'toilet',    ''],
  ['2026-01-13', '12:01:12', '12:29:10', '0 hr 28 min 12 sec', '07:23:51', 'mealbreak', 'Lunch'],
]

export const attendanceBreaks: AttendanceBreak[] = breakRows.map(([date, breakIn, breakOut, durationBreak, checkIn, type, reason], i) => ({
  id: String(i + 1),
  date,
  department: 'Design',
  eid: 'KH0120',
  name: 'ALEX',
  checkIn: `${checkIn} (GMT+7)`,
  breakIn,
  breakOut,
  checkOut: null,
  durationBreak,
  type,
  reason,
  notes: '',
}))
