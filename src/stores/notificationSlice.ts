import type { StateCreator } from "zustand"
import type { FavoritesSliceType } from "./favoritesSlice"

export type Notification = {
    text: string,
    error: boolean,
    show: boolean
}

const NotificationInitialState: Notification = {
    text: '',
    error: false,
    show: false
}

export type NotificationSliceType = {
    notification: Notification,
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void,
    hideNotification: () => void
}

export const createNotificationSlice: StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: NotificationInitialState,
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().hideNotification()
        }, 5000);
    },
    hideNotification: () => {
        set({
            notification: NotificationInitialState
        })
    },
})