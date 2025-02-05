import { create } from 'zustand'

// 토글 스토어 (동시 동작)

interface State {
  toggleId: string
}

interface Action {
  actions: {
    handleToggle: (toggleId: string) => void
  }
}

const useToggleStore = create<State & Action>((set) => ({
  toggleId: '',
  actions: {
    handleToggle: (toggleId: string) =>
      set((state) => {
        if (state.toggleId !== toggleId) {
          return { toggleId }
        } else {
          return { toggleId: '' }
        }
      })
  }
}))

export default useToggleStore
