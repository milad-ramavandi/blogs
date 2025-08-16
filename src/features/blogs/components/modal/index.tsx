"use client";

import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import XMarkIcon from "../icons/x-mark";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 w-full h-full p-2 bg-[#0a0a0a]/90 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-white text-2xl z-50"
      >
        <XMarkIcon />
      </button>
      <div className="relative flex flex-col w-[85%] mx-auto">{children}</div>
    </div>,
    document.body 
  );
};

export default Modal;
