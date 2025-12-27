import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <main className="bg-white text-gray-900">
      {/* HEADER */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            Legal
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
            Privasi kamu penting bagi kami. Halaman ini menjelaskan bagaimana
            ClickClick mengumpulkan, menggunakan, dan melindungi informasi
            pribadi pengguna.
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
                1. Informasi yang Kami Kumpulkan
              </h2>
              <p className="mt-3">
                Kami dapat mengumpulkan informasi pribadi seperti nama, alamat
                email, dan data kontak lainnya ketika kamu mendaftar,
                berlangganan newsletter, atau menghubungi kami melalui website.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                2. Penggunaan Informasi
              </h2>
              <p className="mt-3">
                Informasi yang dikumpulkan digunakan untuk:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>Mengirimkan informasi produk dan promosi</li>
                <li>Menanggapi pertanyaan atau permintaan pengguna</li>
                <li>Meningkatkan kualitas layanan dan pengalaman pengguna</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                3. Perlindungan Data
              </h2>
              <p className="mt-3">
                ClickClick berkomitmen untuk melindungi data pribadi pengguna.
                Kami menerapkan langkah-langkah keamanan yang wajar untuk
                mencegah akses, penggunaan, atau pengungkapan data tanpa izin.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                4. Cookies dan Teknologi Serupa
              </h2>
              <p className="mt-3">
                Website kami dapat menggunakan cookies untuk membantu memahami
                bagaimana pengguna berinteraksi dengan website. Cookies
                memungkinkan kami meningkatkan performa dan kenyamanan
                penggunaan website.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                5. Berbagi Informasi dengan Pihak Ketiga
              </h2>
              <p className="mt-3">
                Kami tidak menjual atau menyewakan informasi pribadi pengguna
                kepada pihak ketiga. Informasi hanya dapat dibagikan jika
                diwajibkan oleh hukum atau untuk keperluan operasional yang
                sah.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                6. Hak Pengguna
              </h2>
              <p className="mt-3">
                Kamu berhak untuk meminta akses, perubahan, atau penghapusan
                data pribadi yang telah kamu berikan kepada kami dengan
                menghubungi tim ClickClick.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                7. Perubahan Kebijakan Privasi
              </h2>
              <p className="mt-3">
                Privacy Policy ini dapat diperbarui dari waktu ke waktu. Setiap
                perubahan akan ditampilkan di halaman ini dan berlaku sejak
                tanggal diperbarui.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                8. Kontak
              </h2>
              <p className="mt-3">
                Jika kamu memiliki pertanyaan terkait kebijakan privasi ini,
                silakan hubungi kami melalui halaman Contact atau email resmi
                ClickClick.
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

export default PrivacyPolicyPage;
