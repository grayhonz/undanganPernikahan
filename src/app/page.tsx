"use client";

import { motion } from "framer-motion";
import Countdown from "./components/Countdown";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";


export default function Home() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to");

  const [showModal, setShowModal] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTogglePlay = () => {
  if (isPlaying) {
    audioRef.current?.pause();
    setIsPlaying(false);
  } else {
    audioRef.current?.play();
    setIsPlaying(true);
    setShowModal(false);
  }
};

  useEffect(() => {
    const currentAudio = audioRef.current;
    return () => {
      currentAudio?.pause();
    };
  }, []);

  return (
    <main className="font-serif text-gray-800 relative">
      {/* Modal Musik */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 max-w-sm mx-4">
            {guestName && (
              <h2 className="text-lg font-medium text-gray-700">
                Kepada Yth. {guestName}
              </h2>
            )}
            <h3 className="text-xl font-semibold">Selamat Datang</h3>
            <p className="text-gray-600 text-sm">
              Aktifkan musik untuk pengalaman undangan yang lebih menyentuh hati.
            </p>
            <button
              onClick={handleTogglePlay}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
              Putar Musik
            </button>
          </div>
        </div>
      )}

      {/* Audio tersembunyi */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Tombol pause musik */}
      {!showModal && (
        <button
          onClick={handleTogglePlay}
          className="fixed bottom-4 right-4 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 z-40"
          title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
      )}


      {/* Hero Section */}
      <section
        className="relative h-screen flex flex-col items-center justify-center text-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/galeri1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-white space-y-4">
          <motion.h1
            className="text-5xl md:text-7xl font-playfair font-bold tracking-widest bg-clip-text text-white text-transparent bg-center bg-cover"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Zulfiqar & Yurin
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            7 September 2025
          </motion.p>
          <Countdown targetDate="2025-09-07T00:00:00" />
          <div className="mt-8 animate-bounce text-white text-2xl">↓</div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-semibold font-playfair mb-2">
            Our Story
          </h2>
          <div className="w-24 h-1 mx-auto bg-pink-300 mb-6 rounded" />
          <p className="text-gray-600 leading-loose text-lg">
            Cerita kami dimulai dari pertemuan sederhana yang tumbuh menjadi cinta sejati.
            Kami melalui banyak hal bersama, hingga akhirnya memutuskan untuk melangkah ke jenjang berikutnya.
          </p>
        </motion.div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-gray-50 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-semibold font-playfair mb-4">
            Wedding Details
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4 text-gray-700">
            <p><strong>📅 Ceremony:</strong> 7 September 2025 — 10:00 AM</p>
            <p><strong>📍 Venue:</strong> Gedung Serba Guna, Purwokerto</p>
          </div>
          <div className="mt-6 h-64 w-full rounded-lg overflow-hidden shadow">
            {/* Tambahkan iframe Maps nanti */}
            <div className="h-full w-full bg-gray-200 flex items-center justify-center italic text-gray-500">
              [Peta akan ditampilkan di sini]
            </div>
          </div>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-semibold font-playfair">Gallery</h2>
          <div className="w-24 h-1 mx-auto bg-pink-300 mt-2 mb-6 rounded" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {["/galeri1.jpg", "/galeri2.jpg", "/galeri3.jpg", "/galeri4.jpg", "/galeri5.jpg"].map((src, idx) => (
            <motion.div
              key={idx}
              className="overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Image
                src={src}
                alt={`Gallery ${idx + 1}`}
                width={500}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section className="py-20 bg-gray-50 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-lg mx-auto"
        >
          <h2 className="text-3xl font-semibold font-playfair mb-4">RSVP</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nama"
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded font-semibold shadow"
            >
              Kirim
            </button>
          </form>
        </motion.div>
      </section>
      {/* Groom & Bride */}
      <section className="py-20 bg-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h2 className="text-3xl font-semibold font-playfair mb-2">Groom & Bride</h2>
          <div className="w-24 h-1 mx-auto bg-pink-300 mb-8 rounded" />
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <Image src="/groom.jpg" alt="Zulfiqar" width={400} height={400} className="rounded-full mx-auto" />
              <h3 className="text-xl font-semibold">Zulfiqar</h3>
              <p className="text-gray-600 text-sm max-w-sm mx-auto">
                Sosok pria yang penuh semangat, penyayang, dan selalu membawa keceriaan. Dengan hati yang mantap, ia memilih Yurin sebagai pendamping hidupnya.
              </p>
            </div>
            <div className="space-y-4">
              <Image src="/bride.jpg" alt="Yurin" width={400} height={400} className="rounded-full mx-auto" />
              <h3 className="text-xl font-semibold">Yurin</h3>
              <p className="text-gray-600 text-sm max-w-sm mx-auto">
                Wanita yang lembut, penyabar, dan penuh kasih. Senyumannya telah merebut hati Zulfiqar dan membawa mereka menuju hari bahagia.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Celebrate Our Love */}
      <section className="relative h-[70vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('./background1.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white text-center px-4"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Celebrate Our Love</h2>
          <p className="max-w-2xl mx-auto text-lg">
            Kami mengundang Anda untuk menjadi bagian dari momen bahagia kami saat kami mengikat janji suci dalam ikatan pernikahan.
          </p>
        </motion.div>
      </section>

      {/* We Are Expecting You */}
      <section className="py-20 bg-pink-50 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto px-4"
        >
          <h2 className="text-3xl font-semibold font-playfair mb-2">We Are Expecting You</h2>
          <div className="w-24 h-1 mx-auto bg-pink-300 mb-6 rounded" />
          <p className="text-gray-700 leading-relaxed mb-8">
            Doa restu serta kehadiran Anda adalah kebahagiaan dan kehormatan bagi kami. Mari rayakan hari penuh cinta bersama!
          </p>
          <button className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded shadow font-semibold transition">
            RSVP Sekarang
          </button>
        </motion.div>
      </section>

    </main>
  );
}
