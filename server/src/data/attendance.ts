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

const rows: [string, string, string | null, number, string, string, string][] = [
  ['2026-01-21', '07:59:07', null, 0, '0 hr 0 min 0 sec', '0 hr 0 min 0 sec', '0 hr 0 min 0 sec'],
  ['2026-01-20', '07:33:31', '18:04:19', 4, '10 hr 30 min 36 sec', '0 hr 56 min 24 sec', '9 hr 34 min 12 sec'],
  ['2026-01-19', '07:46:42', '18:00:55', 4, '10 hr 14 min 24 sec', '1 hr 4 min 48 sec', '9 hr 9 min 36 sec'],
  ['2026-01-17', '08:04:01', '18:01:10', 2, '9 hr 57 min 0 sec', '0 hr 22 min 12 sec', '9 hr 34 min 48 sec'],
  ['2026-01-16', '07:43:55', '18:00:20', 3, '10 hr 16 min 12 sec', '0 hr 54 min 36 sec', '9 hr 21 min 36 sec'],
  ['2026-01-15', '07:53:56', null, 5, '0 hr 0 min 0 sec', '1 hr 1 min 12 sec', '-2 hr -2 min -12 sec'],
  ['2026-01-14', '07:34:39', '18:02:12', 4, '10 hr 27 min 36 sec', '0 hr 56 min 24 sec', '9 hr 31 min 12 sec'],
  ['2026-01-13', '07:23:51', '18:01:07', 5, '10 hr 37 min 12 sec', '2 hr 19 min 12 sec', '8 hr 17 min 60 sec'],
  ['2026-01-12', '08:14:17', '18:02:13', 3, '9 hr 48 min 0 sec', '0 hr 40 min 12 sec', '9 hr 7 min 48 sec'],
  ['2025-07-19', '07:56:28', '18:01:04', 0, '10 hr 4 min 48 sec', '0 hr 0 min 0 sec', '10 hr 4 min 48 sec'],
  ['2025-07-18', '07:43:14', '18:12:12', 0, '10 hr 28 min 48 sec', '0 hr 0 min 0 sec', '10 hr 28 min 48 sec'],
]

export const attendanceRecords: AttendanceRecord[] = rows.map(([date, checkIn, checkOut, breaks, workingDuration, breakDuration, workingHours], i) => ({
  id: String(i + 1),
  department: 'VNMarket',
  eid: 'KH0120',
  name: 'ALEX',
  date,
  checkIn: `${checkIn} (GMT+7)`,
  checkOut,
  breaks,
  workingDuration,
  breakDuration,
  workingHours,
}))

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
  ['2025-07-14', '10:11:01', '10:19:51', '0 hr 9 min 0 sec', '07:27:37', 'toilet', ''],
  ['2025-07-14', '12:47:06', '12:55:48', '0 hr 9 min 0 sec', '07:27:37', 'mealbreak', 'Lunch'],
  ['2025-07-14', '12:56:42', '13:19:56', '0 hr 23 min 24 sec', '07:27:37', 'toilet', ''],
  ['2025-07-15', '12:25:31', '12:55:23', '0 hr 30 min 0 sec', '07:35:08', 'mealbreak', 'Lunch'],
  ['2025-07-17', '12:30:22', '12:44:43', '0 hr 14 min 24 sec', '07:48:06', 'mealbreak', 'Lunch'],
  ['2026-01-12', '12:00:23', '12:24:41', '0 hr 24 min 36 sec', '08:14:17', 'mealbreak', 'lunch'],
  ['2026-01-12', '15:25:25', '15:32:24', '0 hr 7 min 12 sec', '08:14:17', 'toilet', ''],
  ['2026-01-12', '16:07:14', '16:15:33', '0 hr 8 min 24 sec', '08:14:17', 'toilet', ''],
  ['2026-01-13', '10:08:27', '10:17:22', '0 hr 9 min 0 sec', '07:23:51', 'toilet', ''],
  ['2026-01-13', '12:01:12', '12:29:10', '0 hr 28 min 12 sec', '07:23:51', 'mealbreak', 'Lunch'],
]

export const attendanceBreaks: AttendanceBreak[] = breakRows.map(([date, breakIn, breakOut, durationBreak, checkIn, type, reason], i) => ({
  id: String(i + 1),
  date,
  department: 'VNMarket',
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
