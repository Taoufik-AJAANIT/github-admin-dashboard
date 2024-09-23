import { create } from 'zustand'
import User from "../types/user";

type Action = {
    setUser: (user: User) => void,
    clearUser: () => void,
}

type State = {
    user?: User,
}

const useUser = create<State & Action>((set) => ({
    setUser: (user: User) => {
        set({ user });
    },
    clearUser: () => {
        set({ user: undefined });
    }
}));

export default useUser;
