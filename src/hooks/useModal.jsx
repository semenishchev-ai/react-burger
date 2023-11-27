import { useState, useCallback } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChild, setModalChild] = useState(<></>);
  const [modalHeader, setModalHeader] = useState('');

  const openModal = useCallback((header, content) => {
    setIsModalOpen(true);
    setModalChild(content)
    setModalHeader(header)
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    modalChild,
    modalHeader,
    openModal,
    closeModal,
  };
};