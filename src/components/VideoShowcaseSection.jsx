import React from "react";
import "../styles/main.css";

// import video
import video1 from "../assets/selfie/reels/m4.mp4";
import video2 from "../assets/selfie/reels/t1m.mp4";
import video3 from "../assets/selfie/reels/t3b.mp4";
import video4 from "../assets/selfie/reels/t8d.mp4";

const videos = [
  {
    id: 1,
    src: video1,
    title: "ClickClick M4 Mirror Selfie",
    subtitle: "Perfect for daily mirror videos.",
  },
  {
    id: 2,
    src: video2,
    title: "ClickClick T8D Mirror Selfie",
    subtitle: "Switch angles, keep the glow.",
  },
  {
    id: 3,
    src: video3,
    title: "ClickClick T3B Mirror Selfie",
    subtitle: "Content-ready straight from your pocket.",
  },
  {
    id: 4,
    src: video4,
    title: "ClickClick T8D Mirror Selfie",
    subtitle: "Content-ready straight from your pocket.",
  },
];

const VideoShowcaseSection = () => {
  const [activeIndex, setActiveIndex] = React.useState(1); // mulai dari video kedua
  const trackRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const videoRefs = React.useRef([]);

  // Modifikasi: Hapus 'block: "nearest"'
  const scrollToIndex = (index) => {
    setActiveIndex(index);
    const card = cardRefs.current[index];
    if (card && trackRef.current) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "center", // Ini kunci untuk centering item aktif
      });
    }
  };

  // Efek untuk memastikan item aktif ter-scroll ke tengah saat pertama kali dimuat
  React.useEffect(() => {
    const card = cardRefs.current[activeIndex];
    if (card && trackRef.current) {
      card.scrollIntoView({
        behavior: "instant", // Gunakan 'instant' agar centering tidak terlihat saat load
        inline: "center",
      });
    }
  }, []); // [] agar hanya berjalan sekali saat mount

  // play/pause sesuai activeIndex (logika sama seperti sebelumnya)
  React.useEffect(() => {
    videoRefs.current.forEach((videoEl, index) => {
      if (!videoEl) return;
      if (index === activeIndex) {
        const p = videoEl.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    });
  }, [activeIndex]);

  return (
    <section className="bg-white py-16">
      {/* Container utama, px-6 ini berfungsi sebagai padding di pinggir layar */}
      <div className="mx-auto max-w-6xl px-6"> 
        {/* WRAPPER TAMBAHAN: Gunakan margin negatif untuk membuat track meluap
            dan kartu di pinggir terpotong (Efek Luxy Lemon).
            Sesuaikan -mx-6 dengan px-6 pada div di atasnya.
        */}
        <div className="-mx-6">
          {/* TRACK VIDEO */}
          <div
            ref={trackRef}
            // PERUBAHAN: Hapus px-4, md:px-10, dan md:justify-center.
            // Tambahkan padding kembali di sini (px-6) agar item pertama dan terakhir 
            // bisa ter-scroll ke tengah tanpa kartu terpotong seluruhnya.
            className="
              no-scrollbar flex gap-6 overflow-x-auto px-6 pb-6 
            "
          >
            {videos.map((v, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={v.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  onClick={() => scrollToIndex(index)}
                  className={`
                    relative flex-shrink-0 cursor-pointer transition-all duration-300
                    ${
                      isActive
                        // PERUBAHAN 1: Kartu Aktif (Pertahankan opacity-100 dan shadow)
                        ? "w-[260px] md:w-[320px] opacity-100 shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                        // PERUBAHAN 2: Kartu Non-Aktif (Hapus opacity-60)
                        : "w-[220px] md:w-[260px]" 
                    }
                  `}
                >
                  {/* Kartu Video (pertahankan bg-white untuk menghilangkan background hitam) */}
                  <div className="relative h-[420px] w-full overflow-hidden rounded-[26px] bg-white">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="h-full w-full object-cover"
                      src={v.src}
                      muted
                      loop
                      playsInline
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[26px] bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white">
                      <p className="text-sm font-semibold">{v.title}</p>
                      <p className="mt-1 text-[11px] text-gray-200">
                        {v.subtitle}
                      </p>
                      <p className="mt-3 text-[10px] font-semibold tracking-[0.18em] uppercase">
                        Quick view
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div> {/* END -mx-6 wrapper */}

        {/* DOTS (Sama seperti sebelumnya) */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {videos.map((v, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                className={`
                  h-2 rounded-full transition-all
                  ${isActive ? "w-4 bg-gray-900" : "w-2 bg-gray-300"}
                `}
                aria-label={`Go to video ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;