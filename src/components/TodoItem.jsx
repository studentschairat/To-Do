import { useEffect, useRef, useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { CATEGORIES, CATEGORY_ORDER, PRIORITIES, dueStatus, fmtDate } from '../constants'

export default function TodoItem({ todo, leaving, onToggle, onDelete, onEdit, onCycle, onCategory, onDue }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)
  const inputRef = useRef(null)
  const p = PRIORITIES[todo.priority]
  const c = CATEGORIES[todo.category]
  const ds = todo.done ? 'upcoming' : dueStatus(todo.due)
  const dueCls = {
    overdue: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
    today: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300',
    upcoming: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300',
  }[ds || 'upcoming']
  const dueText = !todo.due ? '+ กำหนดส่ง' : (ds === 'overdue' ? 'เลยกำหนด · ' : ds === 'today' ? 'วันนี้ · ' : '') + fmtDate(todo.due)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const save = () => {
    const t = text.trim()
    if (t) onEdit(todo.id, t)
    else setText(todo.text)
    setEditing(false)
  }

  return (
    <li
      className={`item pop relative flex items-center gap-3 overflow-hidden rounded-xl bg-white py-3 pl-4 pr-2 shadow-sm ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/10 ${
        leaving ? 'leaving' : ''
      }`}
    >
      <span className={`absolute left-0 top-0 h-full w-1 ${p.bar}`} />

      <button
        onClick={() => onToggle(todo.id)}
        aria-label="ทำเครื่องหมายเสร็จ"
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition ${
          todo.done
            ? 'border-indigo-500 bg-indigo-500 text-white'
            : 'border-zinc-300 hover:border-indigo-400 dark:border-zinc-500'
        }`}
      >
        {todo.done && <Check size={14} />}
      </button>

      <div className="min-w-0 flex-1">
        {editing ? (
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save()
              if (e.key === 'Escape') {
                setText(todo.text)
                setEditing(false)
              }
            }}
            className="w-full rounded-md border border-indigo-300 bg-transparent px-2 py-1 text-base text-zinc-800 outline-none focus:ring-2 focus:ring-indigo-300 dark:text-zinc-100"
          />
        ) : (
          <span
            onDoubleClick={() => {
              setText(todo.text)
              setEditing(true)
            }}
            title="ดับเบิลคลิกเพื่อแก้ไข"
            className={`block cursor-text select-none break-words text-base ${
              todo.done
                ? 'text-zinc-400 line-through dark:text-zinc-500'
                : 'text-zinc-800 dark:text-zinc-100'
            }`}
          >
            {todo.text}
          </span>
        )}
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onCategory(todo.id, CATEGORY_ORDER[(CATEGORY_ORDER.indexOf(todo.category) + 1) % CATEGORY_ORDER.length])}
            title="กดเพื่อเปลี่ยนหมวดหมู่"
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.badge}`}
          >
            {c.label}
          </button>
          <label className={`relative cursor-pointer rounded-full px-2 py-0.5 text-xs font-medium ${todo.due ? dueCls : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-700'}`}>
            {dueText}
            <input
              type="date"
              value={todo.due || ''}
              onChange={(e) => onDue(todo.id, e.target.value)}
              onClick={(e) => e.currentTarget.showPicker?.()}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        </div>
      </div>

      <button
        onClick={() => onCycle(todo.id)}
        title="กดเพื่อเปลี่ยนระดับความสำคัญ"
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${p.badge}`}
      >
        {p.label}
      </button>

      <button
        onClick={() => onDelete(todo.id)}
        aria-label="ลบ"
        className="shrink-0 rounded-lg p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
      >
        <Trash2 size={18} />
      </button>
    </li>
  )
}
