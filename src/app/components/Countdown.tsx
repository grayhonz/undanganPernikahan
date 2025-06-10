"use client";

import { useEffect, useState } from "react";

type Props = {
  targetDate: string;
};

export default function Countdown({ targetDate }: Props) {
  const [countTo] = useState<number>(() => new Date(targetDate).getTime());
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = countTo - now;
  const days = Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0);
  const hrs = Math.max(Math.floor((diff / (1000 * 60 * 60)) % 24), 0);
  const mins = Math.max(Math.floor((diff / (1000 * 60)) % 60), 0);
  const secs = Math.max(Math.floor((diff / 1000) % 60), 0);

  return (
    <div className="flex justify-center space-x-4 mt-4 text-lg">
      {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
        <div key={idx} className="px-3 py-2 bg-white bg-opacity-50 rounded">
          <div className="font-semibold text-xl">
            {[days, hrs, mins, secs][idx].toString().padStart(2, '0')}
          </div>
          <div className="text-sm">{label}</div>
        </div>
      ))}
    </div>
  );
}
