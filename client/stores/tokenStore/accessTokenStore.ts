import { accessTokenState } from "@/types/tokenType/accessTokenType";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useAccessTokenStore = create(
    persist<accessTokenState>(
        (set) => ({
            accessToken: '',
            setAccessToken: (accessToken: string) => set({ accessToken }),
        }),
        {
            name: 'accessToken',
        }
    )
);