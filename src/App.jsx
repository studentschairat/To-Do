import { useRef, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import TodoItem from './components/TodoItem'
import Stats from './components/Stats'
import { CATEGORIES, CATEGORY_ORDER, FILTERS, PRIORITIES, PRIORITY_ORDER, addDays } from './constants'

const INITIAL = [
  { id: 1, text: 'ตัวอย่าง: ส่งรายงานประจำสัปดาห์', done: false, priority: 'high', category: 'work', due: addDays(-1) },
  { id: 2, text: 'ซื้อของเข้าบ้าน', done: false, priority: 'medium', category: 'shopping', due: addDays(0) },
  { id: 3, text: 'ออกกำลังกาย 30 นาที', done: true, priority: 'low', category: 'health', due: addDays(0) },
  { id: 4, text: 'โทรหาครอบครัว', done: false, priority: 'low', category: 'personal', due: addDays(3) },
]

export default function App() {
  const [todos, setTodos] = useState(INITIAL)
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')
  const [leaving, setLeaving] = useState({})
  const [category, setCategory] = useState('work')
  const [due, setDue] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [query, setQuery] = useState('')
  const nextId = useRef(5)

  const add = () => {
    const text = input.trim()
    if (!text) return
    setTodos((l) => [{ id: nextId.current++, text, done: false, priority, category, due }, ...l])
    setInput('')
  }
  const toggle = (id) => setTodos((l) => l.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const edit = (id, text) => setTodos((l) => l.map((t) => (t.id === id ? { ...t, text } : t)))
  const cycle = (id) =>
    setTodos((l) =>
      l.map((t) =>
        t.id === id
          ? { ...t, priority: PRIORITY_ORDER[(PRIORITY_ORDER.indexOf(t.priority) + 1) % 3] }
          : t
      )
    )
  const setCat = (id, category) => setTodos((l) => l.map((t) => (t.id === id ? { ...t, category } : t)))
  const setDueOf = (id, due) => setTodos((l) => l.map((t) => (t.id === id ? { ...t, due } : t)))
  const remove = (id) => {
    setLeaving((m) => ({ ...m, [id]: true }))
    setTimeout(() => setTodos((l) => l.filter((t) => t.id !== id)), 250)
  }
  const clearDone = () => {
    const ids = todos.filter((t) => t.done).map((t) => t.id)
    setLeaving((m) => {
      const n = { ...m }
      ids.forEach((i) => (n[i] = true))
      return n
    })
    setTimeout(() => setTodos((l) => l.filter((t) => !t.done)), 250)
  }

  const remaining = todos.filter((t) => !t.done).length
  const doneCount = todos.length - remaining
  const q = query.trim().toLowerCase()
  const shown = todos.filter(
    (t) =>
      (filter === 'all' || (filter === 'active' ? !t.done : t.done)) &&
      (catFilter === 'all' || t.category === catFilter) &&
      (!q || t.text.toLowerCase().includes(q))
  )
  const countOf = (k) => todos.filter((t) => t.category === k).length

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-3xl">
        ✅ สิ่งที่ต้องทำ
      </h1>

      <div className="grid gap-4 md:grid-cols-[14rem_1fr]">
        <aside className="space-y-4">
          <Stats todos={todos} />
          <nav className="rounded-2xl bg-white p-2 shadow-md ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/10">
            <h2 className="px-2 pb-1 pt-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">หมวดหมู่</h2>
            {[['all', 'ทั้งหมด', null, todos.length], ...CATEGORY_ORDER.map((k) => [k, CATEGORIES[k].label, CATEGORIES[k].dot, countOf(k)])].map(
              ([k, label, dot, n]) => (
                <button
                  key={k}
                  onClick={() => setCatFilter(k)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition ${
                    catFilter === k
                      ? 'bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300'
                      : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-700/50'
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${dot || 'bg-zinc-300 dark:bg-zinc-500'}`} />
                  {label}
                  <span className="ml-auto rounded-full bg-zinc-100 px-2 text-xs dark:bg-zinc-700">{n}</span>
                </button>
              )
            )}
          </nav>
        </aside>

        <main className="min-w-0">
      <div className="mb-4 rounded-2xl bg-white p-4 shadow-md ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/10">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="เพิ่มงานใหม่..."
            className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-transparent px-3 py-2.5 text-base text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-600 dark:text-zinc-100 dark:focus:ring-indigo-500/30"
          />
          <button
            onClick={add}
            className="flex items-center gap-1 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 active:scale-95"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">เพิ่ม</span>
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-transparent px-2 py-1 text-xs text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
          >
            {CATEGORY_ORDER.map((k) => (
              <option key={k} value={k}>{CATEGORIES[k].label}</option>
            ))}
          </select>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            aria-label="วันกำหนดส่ง"
            className="rounded-lg border border-zinc-200 bg-transparent px-2 py-1 text-xs text-zinc-700 dark:border-zinc-600 dark:text-zinc-200"
          />
          <span className="ml-1 text-sm text-zinc-500 dark:text-zinc-400">ความสำคัญ:</span>
          {PRIORITY_ORDER.map((k) => (
            <button
              key={k}
              onClick={() => setPriority(k)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                priority === k
                  ? `${PRIORITIES[k].badge} ring-2 ring-current ring-offset-1 dark:ring-offset-zinc-800`
                  : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-300'
              }`}
            >
              {PRIORITIES[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mb-3">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"><Search size={16} /></span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหางาน..."
          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-base text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-indigo-500/30"
        />
      </div>

      <div className="mb-3 flex gap-1 rounded-xl bg-zinc-200/70 p-1 dark:bg-zinc-800">
        {FILTERS.map(([k, label]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`flex-1 rounded-lg px-2 py-2 text-sm font-medium transition ${
              filter === k
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-zinc-600 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {shown.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            leaving={!!leaving[t.id]}
            onToggle={toggle}
            onDelete={remove}
            onEdit={edit}
            onCycle={cycle}
            onCategory={setCat}
            onDue={setDueOf}
          />
        ))}
        {shown.length === 0 && (
          <li className="rounded-xl bg-white/60 py-10 text-center text-sm text-zinc-400 dark:bg-zinc-800/60">
            {filter === 'done' ? 'ยังไม่มีงานที่เสร็จ' : 'ไม่มีงานในรายการ 🎉'}
          </li>
        )}
      </ul>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/10">
        <span className="text-zinc-600 dark:text-zinc-300">
          เหลือ <b className="text-indigo-600 dark:text-indigo-300">{remaining}</b> งานที่ต้องทำ
        </span>
        <button
          onClick={clearDone}
          disabled={doneCount === 0}
          className={`font-medium transition ${
            doneCount
              ? 'text-red-500 hover:text-red-600'
              : 'cursor-not-allowed text-zinc-300 dark:text-zinc-600'
          }`}
        >
          ล้างที่เสร็จแล้ว{doneCount ? ` (${doneCount})` : ''}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-400">
        ดับเบิลคลิกที่ข้อความเพื่อแก้ไข · แตะป้ายเพื่อเปลี่ยนความสำคัญ
      </p>
        </main>
      </div>
    </div>
  )
}
