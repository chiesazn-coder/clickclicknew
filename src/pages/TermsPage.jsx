import React from "react";

const TermsPage = () => {
  return (
    <main className="bg-white text-gray-900">
      {/* HEADER */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            Legal
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold">
            Terms of Use
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
            Dengan mengakses dan menggunakan website ClickClick, kamu dianggap
            telah membaca, memahami, dan menyetujui syarat dan ketentuan berikut.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="max-w-3xl space-y-10 text-sm leading-relaxed text-gray-700">

            {/* 1 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                1. Penggunaan Website
              </h2>
              <p className="mt-3">
                Website ClickClick disediakan untuk memberikan informasi produk,
                promosi, dan layanan terkait brand ClickClick. Kamu setuju untuk
                menggunakan website ini hanya untuk tujuan yang sah dan sesuai
                dengan hukum yang berlaku.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                2. Akun dan Informasi Pengguna
              </h2>
              <p className="mt-3">
                Beberapa fitur mungkin memerlukan kamu untuk memberikan informasi
                pribadi seperti email. Kamu bertanggung jawab untuk memastikan
                bahwa informasi yang diberikan akurat dan terbaru.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                3. Produk dan Harga
              </h2>
              <p className="mt-3">
                Semua informasi produk, harga, dan ketersediaan dapat berubah
                sewaktu-waktu tanpa pemberitahuan terlebih dahulu. ClickClick
                berhak untuk memperbarui atau menghentikan produk tertentu.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                4. Hak Kekayaan Intelektual
              </h2>
              <p className="mt-3">
                Seluruh konten dalam website ini, termasuk teks, gambar, logo,
                dan desain visual adalah milik ClickClick dan dilindungi oleh
                hukum hak cipta. Penggunaan tanpa izin tertulis dilarang.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                5. Pembatasan Tanggung Jawab
              </h2>
              <p className="mt-3">
                ClickClick tidak bertanggung jawab atas kerugian langsung maupun
                tidak langsung yang timbul akibat penggunaan website atau produk
                kami, sejauh diizinkan oleh hukum.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                6. Perubahan Ketentuan
              </h2>
              <p className="mt-3">
                ClickClick dapat memperbarui Terms of Use ini dari waktu ke waktu.
                Perubahan akan ditampilkan di halaman ini dan berlaku sejak
                tanggal diperbarui.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                7. Hukum yang Berlaku
              </h2>
              <p className="mt-3">
                Syarat dan ketentuan ini diatur dan ditafsirkan berdasarkan hukum
                yang berlaku di Republik Indonesia.
              </p>
            </div>

            {/* FOOTNOTE */}
            <div className="pt-6 border-t border-gray-200 text-xs text-gray-500">
              Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsPage;
