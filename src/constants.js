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
