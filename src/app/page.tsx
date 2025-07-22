"use client";
import { motion } from "framer-motion";
import Countdown from "./components/Countdown";
import Image from "next/image";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Modal from "./components/Modal";

// Komponen terpisah untuk handle search params
function GuestNameHandler({ onGuestName }: { onGuestName: (name: string | null) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const guestName = searchParams.get("to");
    onGuestName(guestName);
  }, [searchParams, onGuestName]);
  return null;
}

function HomeContent() {
  const [guestName, setGuestName] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGuestName = (name: string | null) => {
    setGuestName(name);
  };

  const handleTogglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Pastikan audio sudah loaded
        if (audioRef.current.readyState < 2) {
          await new Promise((resolve) => {
            if (audioRef.current) {
              audioRef.current.addEventListener('canplaythrough', resolve, { once: true });
            }
          });
        }
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      // Fallback jika audio tidak bisa diputar
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleCanPlay = () => {
      setAudioLoaded(true);
    };
    const handleEnded = () => {
      setIsPlaying(false);
    };
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setAudioLoaded(false);
    };
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    // Preload audio
    audio.load();
    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (audioLoaded) {
      // Tampilkan popup selama 2 detik
      const timeoutId = setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [audioLoaded]);

  return (
    <main className="font-serif text-gray-800 relative">
      {/* Guest Name Handler */}
      <GuestNameHandler onGuestName={handleGuestName} />

      {/* Modal untuk Nama Tamu */}
      {showModal && (
        <Modal
          guestName={guestName || "Tamu"}
          onClose={handleCloseModal}
        />
      )}

      {/* Audio tersembunyi */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        playsInline
      >
        <source src="/music.mp3" type="audio/mpeg" />
        <source src="/music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Popup untuk menginformasikan play audio */}
      {audioLoaded && showPopup && (
        <motion.div
          className="fixed bottom-4 right-4 bg-pink-500 text-white p-3 rounded-full shadow-lg z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="flex items-center space-x-1">
            <span>Play Audio</span>
            <span>{isPlaying ? "⏸️" : "▶️"}</span>
          </span>
        </motion.div>
      )}

      {/* Tombol pause musik */}
      {audioLoaded && !showPopup && (
        <button
          onClick={handleTogglePlay}
          className="fixed bottom-4 right-4 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 z-40 transition-all duration-200"
          title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
      )}

      {/* Konten Utama */}
      {!showModal && (
        <>
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

          {/* Groom & Bride */}
          <section className="relative py-20 bg-white text-center overflow-hidden">
            {/* Background wayang kiri miring dan bergeser ke kanan */}
            <br />
            <br />
            <div className="absolute top-1/3 left-0 z-0 opacity-10 transform rotate-[45deg] scale-[1.5] -translate-x-10 translate-y-12 pointer-events-none">
              <Image
                src="/wayang.png"
                alt="Wayang Background"
                width={500}
                height={800}
                objectFit="contain"
                className="w-full h-auto"
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 max-w-4xl mx-auto px-4"
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
                Cerita kami dimulai di tahun 2004, kami tumbuh di gang kecil yang sama. Bermain kejar-kejaran dan saling tertawa.
                dua tahun setelahnya, ditahun 2006 waktu membawa kami berpisah sejenak untuk menyelesaikan pendidikan, membuat kami terbiasa menjalani kehidupan masing-masing tanpa ada lagi pertemuan, namun ternyata semesta selalu memiliki jalan yang indah. <br /> 
                <br />
                18 tahun berlalu, tepatnya di bulan Desember 2024 tawa masa kecil itu kembali hadir, dengan sorot mata indah yang masih sama. Sejak saat itu
                semua kenangan masa kecil kami kembali bernyawa. Cinta sejati tidak datang secara tiba-tiba, ia tumbuh perlahan dan mekar diwaktu yang tepat. Kami menyadari bahwa
                cinta tak selalu datang dari jauh, terkadang ia telah ada di depan mata membersamai sejak lama.
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
                <p><strong>📅 Ceremony:</strong> 7 September 2025 — 11:00 WIB</p>
                <p><strong>📍 Venue:</strong> Bale Joglo Purbalingga</p>
              </div>
              <div className="mt-6 h-64 w-full rounded-lg overflow-hidden shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.9445784688753!2d109.35375!3d-7.349953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjAnNTkuOCJTIDEwOcKwMjEnMTMuNSJF!5e0!3m2!1sen!2sid!4v1625847562000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Pernikahan - Bale Joglo Purbalingga"
                />
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
              {["/APJC0051.jpg", "/APJC0062.jpg", "/APJC0188.jpg", "/APJC0214.jpg", "/APJC0237.jpg", "/APJC0248.jpg", "/APJC0338.jpg", "/APJC0370.jpg", "/APJC9765.jpg"].map((src, idx) => (
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
        </>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}