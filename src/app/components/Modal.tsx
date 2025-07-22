"use client";

import { useEffect } from "react";

interface ModalProps {
  guestName: string;
  onClose: () => void;
}

export default function Modal({ guestName, onClose }: ModalProps) {
  // Prevent background scroll saat modal tampil
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-2">Selamat Datang</h2><br />
        <p className="text-gray-700">Kepada Yth:</p>
        <p className="text-lg font-semibold mt-1">{guestName}</p>
        <br />
        
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition"
        >
          Buka Undangan
        </button>
        <br />
        <br />
        <br />

        <p className="text-gray-700">Mohon Maaf Apabila Ada Kesalahan Penulisan Nama ataupun Gelar</p>
      </div>
    </div>
  );
}
