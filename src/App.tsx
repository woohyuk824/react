import { useEffect, useMemo, useRef, useState } from 'react'
import { loadMemos, saveMemos, type Memo } from './storage'
import './App.css'

function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function formatDate(ts: number): string {
  const d = new Date(ts)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function App() {
  const [memos, setMemos] = useState<Memo[]>([])
  const [loaded, setLoaded] = useState(false)
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    loadMemos().then((list) => {
      setMemos(list)
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (loaded) saveMemos(memos)
  }, [memos, loaded])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return memos
      .filter((m) => !q || m.title.toLowerCase().includes(q) || m.body.toLowerCase().includes(q))
      .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt)
  }, [memos, query])

  const editing = memos.find((m) => m.id === editingId) ?? null

  function createMemo() {
    const memo: Memo = { id: newId(), title: '', body: '', pinned: false, updatedAt: Date.now() }
    setMemos((prev) => [memo, ...prev])
    setEditingId(memo.id)
  }

  function updateMemo(id: string, patch: Partial<Memo>) {
    setMemos((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch, updatedAt: Date.now() } : m)))
  }

  function togglePin(id: string) {
    setMemos((prev) => prev.map((m) => (m.id === id ? { ...m, pinned: !m.pinned } : m)))
  }

  function deleteMemo(id: string) {
    if (!confirm('이 메모를 삭제할까요?')) return
    setMemos((prev) => prev.filter((m) => m.id !== id))
    if (editingId === id) setEditingId(null)
  }

  function closeEditor() {
    // 제목과 내용이 모두 비어 있으면 남기지 않는다.
    if (editing && !editing.title.trim() && !editing.body.trim()) {
      setMemos((prev) => prev.filter((m) => m.id !== editing.id))
    }
    setEditingId(null)
  }

  if (editing) {
    return (
      <div className="app">
        <header className="bar">
          <button className="icon-btn" onClick={closeEditor} aria-label="뒤로">‹</button>
          <span className="bar-meta">{formatDate(editing.updatedAt)}</span>
          <div className="bar-actions">
            <button className={'icon-btn' + (editing.pinned ? ' on' : '')} onClick={() => togglePin(editing.id)} aria-label="고정">★</button>
            <button className="icon-btn danger" onClick={() => deleteMemo(editing.id)} aria-label="삭제">🗑</button>
          </div>
        </header>
        <main className="editor">
          <input
            className="editor-title"
            placeholder="제목"
            value={editing.title}
            autoFocus={!editing.title && !editing.body}
            onChange={(e) => updateMemo(editing.id, { title: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                bodyRef.current?.focus()
              }
            }}
          />
          <textarea
            ref={bodyRef}
            className="editor-body"
            placeholder="내용을 입력하세요"
            value={editing.body}
            onChange={(e) => updateMemo(editing.id, { body: e.target.value })}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="bar">
        <h1>테스트메모</h1>
        <span className="bar-meta">{memos.length}개</span>
      </header>
      <div className="search">
        <input type="search" placeholder="검색" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <main className="list">
        {loaded && visible.length === 0 && (
          <p className="empty">{query ? '검색 결과가 없습니다.' : '메모가 없습니다.\n아래 + 버튼으로 추가하세요.'}</p>
        )}
        {visible.map((m) => (
          <button key={m.id} className="card" onClick={() => setEditingId(m.id)}>
            <div className="card-head">
              <strong>{m.title.trim() || m.body.split('\n')[0] || '새 메모'}</strong>
              {m.pinned && <span className="pin">★</span>}
            </div>
            <p className="card-body">{m.title.trim() ? m.body : m.body.split('\n').slice(1).join(' ')}</p>
            <span className="card-date">{formatDate(m.updatedAt)}</span>
          </button>
        ))}
      </main>
      <button className="fab" onClick={createMemo} aria-label="새 메모">+</button>
    </div>
  )
}
