import { IToken, IUser } from '@/interfaces'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  token: IToken
  loggedIn: boolean
  profile: IUser | null
}

type Action = {
  setToken: (token: IToken) => void
  setLoggedIn: (status: boolean) => void
  setProfile: (profile: IUser | null) => void
  reset: () => void
}

const initState: State = {
  token: {
    accessToken: '',
    refreshToken: ''
  },
  loggedIn: false,
  profile: null
}

export const useAuthStore = create(
  persist<State & Action>(
    (set) => ({
      ...initState,
      setToken: (token: IToken) => set(() => ({ token: token })),
      setLoggedIn: (status: boolean) => set(() => ({ loggedIn: status })),
      setProfile: (updatedProfile: Partial<IUser> | null) =>
        set((state) => ({
          profile: { ...state.profile, ...(updatedProfile as IUser) }
        })),
      reset: () => set({ ...initState })
    }),
    {
      name: 'auth', // unique name
      storage: createJSONStorage(() => localStorage)
    }
  )
)
