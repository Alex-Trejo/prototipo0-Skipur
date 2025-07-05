export type MessageModalType = 'info' | 'error' | 'warn'

export interface MessageModalState {
  title: string
  message: string
  type?: MessageModalType
  open?: boolean
}

type State = MessageModalState

type Action = {
  type: 'UPDATE_MODAL'
  payload: Partial<MessageModalState>
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_MODAL':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export function createInitialState(initialState?: Partial<State>): State {
  const state: State = {
    message: initialState?.message ?? '',
    title: initialState?.title ?? '',
    open: initialState?.open ?? false,
    type: initialState?.type ?? 'info',
  }

  return state
}
