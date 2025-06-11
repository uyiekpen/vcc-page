// components/ErrorModal.tsx
"use client";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Fragment } from "react";
import { FiX } from "react-icons/fi";

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

export default function ErrorModal({
  isOpen,
  onClose,
  message,
}: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed flex items-center justify-center z-50">
        <DialogPanel className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
          <div className="flex justify-between items-center mb-3">
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Error
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500"
            >
              <FiX size={20} />
            </button>
          </div>
          <Description className="text-gray-700 dark:text-gray-300">
            {message}
          </Description>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
