"use client";
import { motion } from "framer-motion";
import Countdown from "./components/Countdown";
import Image from "next/image";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Modal from "./components/Modal";
import Masonry from "react-masonry-css";

// Handler nama tamu
function GuestNameHandler({ onGuestName }: { onGuestName: (name: string | null) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const guestName = searchParams.get("to");
    onGuestName(guestName);
  }, [searchParams, onGuestName]);
  return null;
}

function HomeContent() {
  // === Ambil Event ===
  const searchParams = useSearchParams();
  const eventCode = searchParams.get("event");

  let eventDate = "2025-09-07T11:00:00";
  let eventLabel = "7 September 2025 — 11:00 WIB";
  let eventVenue = "Bale Joglo Purbalingga";
  let eventMap =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.9445784688753!2d109.35375!3d-7.349953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjAnNTkuOCJTIDEwOcKwMjEnMTMuNSJF!5e0!3m2!1sen!2sid!4v1625847562000!5m2!1sen!2sid";

  if (eventCode === "3031") {
    eventDate = "2025-08-30T10:00:00";
    eventLabel = "30–31 Agustus 2025 — 10:00 WIB";
    eventVenue = "Toko Kesih";
    eventMap =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.260170243614!2d109.3656595!3d-7.3032875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ff7650c8e0f77%3A0x3f58631a3b9798bc!2sToko%20Kesih!5e0!3m2!1sen!2sid!4v1723976400000!5m2!1sen!2sid";
  }

  // === State ===
  const [guestName, setGuestName] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGuestName = (name: string | null) => setGuestName(name);

  // Musik
  const handleTogglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (audioRef.current.readyState < 2) {
          await new Promise((resolve) => {
            if (audioRef.current) {
              audioRef.current.addEventListener("canplaythrough", resolve, { once: true });
            }
          });
        }
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleCanPlay = () => setAudioLoaded(true);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setAudioLoaded(false);
    };
    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.load();
    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, []);

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (audioLoaded) {
      const timeoutId = setTimeout(() => setShowPopup(false), 7000);
      return () => clearTimeout(timeoutId);
    }
  }, [audioLoaded]);

  // === Gallery Images ===
  const galleryImages = [
    "/APJC0051.jpg",
    "/APJC0062.jpg",
    "/APJC0188.jpg",
    "/APJC0214.jpg",
    "/APJC0237.jpg",
    "/APJC0248.jpg",
    "/APJC0338.jpg",
    "/APJC0370.jpg",
    "/APJC9765.jpg",
  ];

  return (
    <main className="font-serif text-gray-800 relative">
      {/* Guest Name Handler */}
      <GuestNameHandler onGuestName={handleGuestName} />

      {/* Modal Tamu */}
      {showModal && <Modal guestName={guestName || "Tamu"} onClose={handleCloseModal} />}

      {/* Musik */}
      <audio ref={audioRef} loop preload="auto" playsInline>
        <source src="/music.mp3" type="audio/mpeg" />
        <source src="/music.ogg" type="audio/ogg" />
        Browser tidak mendukung audio
      </audio>

      {/* Popup Play */}
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

      {/* Tombol Musik */}
      {audioLoaded && !showPopup && (
        <button
          onClick={handleTogglePlay}
          className="fixed bottom-4 right-4 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 z-40 transition-all duration-200"
          title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
      )}

      {/* Konten */}
      {!showModal && (
        <>
          {/* Hero */}
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
                {eventLabel}
              </motion.p>
              <Countdown targetDate={eventDate} />
              <div className="mt-8 animate-bounce text-white text-2xl">↓</div>
            </div>
          </section>

          {/* Groom & Bride */}
          <section className="relative py-20 bg-white text-center overflow-hidden">
            <div className="absolute top-1/3 left-0 z-0 opacity-10 transform rotate-[45deg] scale-[1.5] -translate-x-10 translate-y-12 pointer-events-none">
              <Image
                src="/wayang.png"
                alt="Wayang Background"
                width={500}
                height={800}
                className="w-full h-auto object-contain"
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
                    Sosok pria penuh semangat, penyayang, dan selalu membawa keceriaan. Dengan hati mantap, ia memilih Yurin sebagai pendamping hidupnya.
                  </p>
                </div>
                <div className="space-y-4">
                  <Image src="/bride.jpg" alt="Yurin" width={400} height={400} className="rounded-full mx-auto" />
                  <h3 className="text-xl font-semibold">Yurin</h3>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto">
                    Wanita lembut, penyabar, penuh kasih. Senyumannya merebut hati Zulfiqar dan membawa mereka ke hari bahagia.
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
              <h2 className="text-3xl font-semibold font-playfair mb-2">Our Story</h2>
              <div className="w-24 h-1 mx-auto bg-pink-300 mb-6 rounded" />
              <p className="text-gray-600 leading-loose text-lg">
                Cerita kami dimulai di tahun 2004, kami tumbuh di gang kecil yang sama. Bermain kejar-kejaran dan tertawa bersama. 
                Tahun 2006 kami berpisah untuk sekolah, hingga 18 tahun kemudian dipertemukan kembali di akhir 2024. 
                Sejak itu cinta tumbuh kembali, mekar di waktu yang tepat.
              </p>
            </motion.div>
          </section>

          {/* Wedding Details */}
          <section className="py-20 bg-gray-50 text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-semibold font-playfair mb-4">Wedding Details</h2>
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4 text-gray-700">
                <p><strong>📅 Ceremony:</strong> {eventLabel}</p>
                <p><strong>📍 Venue:</strong> {eventVenue}</p>
              </div>
              <div className="mt-6 h-64 w-full rounded-lg overflow-hidden shadow">
                <iframe
                  src={eventMap}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Acara"
                />
              </div>
            </motion.div>
          </section>

          {/* Gallery (Masonry) */}
          <section className="py-20 bg-white text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="mb-10">
              <h2 className="text-3xl font-semibold font-playfair">Gallery</h2>
              <div className="w-24 h-1 mx-auto bg-pink-300 mt-2 mb-6 rounded" />
            </motion.div>
            <div className="max-w-6xl mx-auto px-4">
              <Masonry
                breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                className="flex gap-4"
                columnClassName="flex flex-col gap-4"
              >
                {galleryImages.map((src, idx) => (
                  <motion.div
                    key={idx}
                    className="overflow-hidden rounded-xl shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Image
                      src={src}
                      alt={`Gallery ${idx + 1}`}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </motion.div>
                ))}
              </Masonry>
            </div>
          </section>

          {/* Celebrate Our Love */}
          <section
            className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('./background1.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 text-white text-center px-4"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Celebrate Our Love</h2>
              <p className="max-w-2xl mx-auto text-lg">
                Kami mengundang Anda untuk menjadi bagian dari momen bahagia kami saat kami mengikat janji suci pernikahan.
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
