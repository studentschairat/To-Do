export const PRIORITIES = {
  low: {
    label: 'ต่ำ',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    bar: 'bg-emerald-400',
  },
  medium: {
    label: 'ปานกลาง',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    bar: 'bg-amber-400',
  },
  high: {
    label: 'สูง',
    badge: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
    bar: 'bg-red-400',
  },
}
export const PRIORITY_ORDER = ['low', 'medium', 'high']

export const FILTERS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['done', 'เสร็จแล้ว'],
]

export const CATEGORIES = {
  work: { label: 'งาน', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300', dot: 'bg-blue-400' },
  personal: { label: 'ส่วนตัว', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300', dot: 'bg-purple-400' },
  shopping: { label: 'ช้อปปิ้ง', badge: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300', dot: 'bg-pink-400' },
  health: { label: 'สุขภาพ', badge: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300', dot: 'bg-teal-400' },
}
export const CATEGORY_ORDER = ['work', 'personal', 'shopping', 'health']

const pad = (n) => String(n).padStart(2, '0')
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayStr = () => fmt(new Date())
export const addDays = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return fmt(d)
}
export const dueStatus = (due) => {
  if (!due) return null
  const t = todayStr()
  return due < t ? 'overdue' : due === t ? 'today' : 'upcoming'
}
export const fmtDate = (due) =>
  new Date(due + 'T00:00:00').toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
