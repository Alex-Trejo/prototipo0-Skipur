import { useState } from 'react'
import { useModal, type ModalState } from './useModal'
import type { ModalIconType } from '../components/modals/ModalIcon'
import type { ModalButtonProps } from '../components/modals/ModalButton'

export interface MessageModalData {
  title: string
  message: string
  icon: ModalIconType
}

export type MessageModalState = ModalState &
  MessageModalData & {
    buttons?: ModalButtonProps[]
  }

export function useMessageModal(initialState?: Partial<MessageModalState>) {
  const {
    open,
    openModal: showModal,
    closeModal,
    toggleModal,
  } = useModal({
    open: initialState?.open ?? false,
  })

  const [data, setData] = useState<MessageModalData>({
    message: initialState?.message ?? '',
    title: initialState?.title ?? '',
    icon: initialState?.icon ?? 'info',
  })

  const [buttons, setButtons] = useState(initialState?.buttons)

  const updateModal = (payload: Partial<MessageModalData>) => {
    setData((data) => ({ ...data, ...payload }))
  }

  const openModal = ({
    data,
    buttons,
  }: {
    data?: Partial<MessageModalData>
    buttons?: ModalButtonProps[]
  }) => {
    updateModal({ ...data })
    setButtons(buttons)
    showModal()
  }

  const closeAndResetModal = () => {
    closeModal()
    updateModal({
      icon: initialState?.icon,
      message: initialState?.message,
      title: initialState?.title,
    })
    setButtons(initialState?.buttons)
  }

  const modal = {
    open,
    ...data,
    buttons,
  }

  return {
    modal,
    updateModal,
    openModal,
    closeModal,
    toggleModal,
    closeAndResetModal,
  }
}
