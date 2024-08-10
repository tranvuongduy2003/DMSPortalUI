import { create } from 'zustand'

type State = {
  isLoading: boolean
}

type Action = {
  setIsLoading: (loading: boolean) => void
}

export const useAppStore = create<State & Action>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set(() => ({ isLoading: loading }))
}))
