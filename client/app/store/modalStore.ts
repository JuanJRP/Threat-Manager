import { create } from "zustand";

interface ModalState {
  showModal: boolean;
  showUpdateModal: boolean;
  showDeleteModal: boolean;
  openModal: () => void;
  openUpdateModal: () => void;
  openDeleteModal: () => void;
  closeModal: () => void;
  closeUpdateModal: () => void;
  closeDeleteModal: () => void;
}

const useModalStore = create<ModalState>()((set) => ({
  showModal: false,
  showUpdateModal: false,
  showDeleteModal: false,
  openModal: () => set({ showModal: true }),
  openUpdateModal: () => set({ showUpdateModal: true }),
  openDeleteModal: () => set({ showDeleteModal: true }),
  closeModal: () => set({ showModal: false }),
  closeUpdateModal: () => set({ showUpdateModal: false }),
  closeDeleteModal: () => set({ showDeleteModal: false }),
}));

export default useModalStore;
