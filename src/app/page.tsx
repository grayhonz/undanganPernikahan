"use client";

import { motion } from "framer-motion";
import Countdown from "./components/Countdown"; // Pastikan file Countdown.tsx sudah ada
import Image from "next/image";

export default function Home() {
  return (
    <main className="font-serif text-gray-800">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="relative z-10 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl text-white md:text-7xl font-bold"
          >
            Zulfiqar & Yurin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl text-white md:text-2xl"
          >
            7 September, 2025
          </motion.p>
          <Countdown targetDate="2025-08-28T00:00:00" />
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-gray-50 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600">
            Cerita singkat tentang kita, pertemuan, momen spesial, dan perjalanan menuju hari ini...
          </p>
        </motion.div>
      </section>

      {/* Event Details */}
      <section className="py-20 px-4 bg-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-md mx-auto space-y-4"
        >
          <h2 className="text-3xl font-semibold">Details</h2>
          <div>
            <p><strong>📅 Ceremony:</strong> 7 September, 2025 — 10:00 AM</p>
            <p><strong>📍 Venue:</strong> Gedung Serba Guna, Purwokerto</p>
          </div>
          <div id="map" className="h-64 w-full bg-gray-200">[Peta bisa ditambahkan]</div>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4 bg-gray-50 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-semibold">Gallery</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {["/galeri1.jpg", "/galeri2.jpg", "/galeri3.jpg"].map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <Image
                src={src}
                width={200}
                height={200}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-64 object-cover rounded shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section className="py-20 px-4 bg-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-lg mx-auto"
        >
          <h2 className="text-3xl font-semibold mb-4">RSVP</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nama"
              className="w-full border p-3 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-pink-500 text-white rounded"
            >
              Kirim
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
