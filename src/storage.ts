import { Preferences } from '@capacitor/preferences'

export interface Memo {
  id: string
  title: string
  body: string
  pinned: boolean
  updatedAt: number
}

const KEY = 'test-memo.memos'

// 웹에서는 localStorage, 앱(Android/iOS)에서는 기기 저장소에 저장된다.
export async function loadMemos(): Promise<Memo[]> {
  const { value } = await Preferences.get({ key: KEY })
  if (!value) return []
  try {
    const parsed: Memo[] = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function saveMemos(memos: Memo[]): Promise<void> {
  await Preferences.set({ key: KEY, value: JSON.stringify(memos) })
}
