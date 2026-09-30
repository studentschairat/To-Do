import { dueStatus } from '../constants'

export default function Stats({ todos }) {
  const total = todos.length
  const done = todos.filter((t) => t.done).length
  const overdue = todos.filter((t) => !t.done && dueStatus(t.due) === 'overdue').length
  const active = total - done - overdue
  const pct = total ? Math.round((done / total) * 100) : 0

  const segs = [
    { label: 'เสร็จแล้ว', n: done, stroke: 'stroke-emerald-500', dot: 'bg-emerald-500' },
    { label: 'กำลังทำ', n: active, stroke: 'stroke-indigo-500', dot: 'bg-indigo-500' },
    { label: 'เลยกำหนด', n: overdue, stroke: 'stroke-red-500', dot: 'bg-red-500' },
  ]
  let acc = 0

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/10">
      <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200">สถิติ</h2>
      <div className="flex items-center gap-4 md:flex-col md:items-start">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full">
            <circle cx="18" cy="18" r="15.9155" fill="none" strokeWidth="4" className="stroke-zinc-200 dark:stroke-zinc-700" />
            {total > 0 &&
              segs.map((s) => {
                const len = (s.n / total) * 100
                const el = s.n > 0 && (
                  <circle
                    key={s.label}
                    cx="18" cy="18" r="15.9155" fill="none" strokeWidth="4"
                    className={s.stroke}
                    strokeDasharray={`${len} ${100 - len}`}
                    strokeDashoffset={25 - acc}
                  />
                )
                acc += len
                return el
              })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-zinc-800 dark:text-zinc-100">
            {pct}%
          </div>
        </div>
        <div className="flex-1 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
          <div>ทั้งหมด <b className="text-zinc-800 dark:text-zinc-100">{total}</b> งาน · เสร็จ <b>{pct}%</b></div>
          {segs.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-xs">
              <span className={`h-2 w-2 rounded-full ${s.dot}`} />
              {s.label}
              <span className="ml-auto font-medium">{s.n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
