import React, { useState } from 'react';
import { ptmData } from './data';
import { Activity, Wind, Microscope, HeartPulse, ArrowLeft, Stethoscope } from 'lucide-react';

const iconMap = {
  Activity: <Activity className="w-8 h-8 md:w-10 md:h-10 text-teal-600" />,
  Wind: <Wind className="w-8 h-8 md:w-10 md:h-10 text-teal-600" />,
  Microscope: <Microscope className="w-8 h-8 md:w-10 md:h-10 text-teal-600" />,
  HeartPulse: <HeartPulse className="w-8 h-8 md:w-10 md:h-10 text-teal-600" />
};

export default function App() {
  const [selectedDisease, setSelectedDisease] = useState(null);

  // === TAMPILAN MENU UTAMA ===
  if (!selectedDisease) {
    return (
      <div className="min-h-screen p-4 sm:p-8 max-w-6xl mx-auto">
        <header className="text-center mb-8 md:mb-12 mt-4 md:mt-8">
          <div className="flex justify-center mb-3 md:mb-4">
            <Stethoscope className="w-12 h-12 md:w-16 md:h-16 text-teal-600" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">
            Edukasi Kesehatan PTM
          </h1>
          <p className="text-sm md:text-lg text-gray-600 px-4">
            Mengenal dan Mencegah Penyakit Tidak Menular
          </p>
        </header>

        {/* Grid ini akan 1 kolom di HP, 2 kolom di layar menengah/besar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {ptmData.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedDisease(item)}
              className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-teal-100 hover:shadow-md hover:border-teal-300 transition-all cursor-pointer flex items-center gap-4 group"
            >
              <div className="p-3 md:p-4 bg-teal-50 rounded-xl group-hover:bg-teal-100 transition-colors shrink-0">
                {iconMap[item.icon]}
              </div>
              <div>
                <h2 className="text-lg md:text-2xl font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2 md:line-clamp-1">
                  {item.pengertian}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // === TAMPILAN DETAIL PENYAKIT ===
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        
        {/* Tombol Kembali (Bagus untuk ditekankan di area sentuh HP) */}
        <button 
          onClick={() => setSelectedDisease(null)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium mb-6 md:mb-8 bg-teal-50 px-4 py-2 rounded-lg transition-colors active:scale-95"
        >
          <ArrowLeft size={20} /> <span className="text-sm md:text-base">Kembali ke Menu</span>
        </button>

        {/* Header Detail */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 md:mb-8 border-b pb-6">
          <div className="p-4 bg-teal-50 rounded-2xl shrink-0">
            {iconMap[selectedDisease.icon]}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            {selectedDisease.title}
          </h1>
        </div>

        {/* Konten Detail */}
        <div className="space-y-6 md:space-y-8 text-sm md:text-base text-gray-700 leading-relaxed">
          
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-teal-700 mb-2 border-l-4 border-teal-500 pl-3">
              1. Pengertian
            </h3>
            <p className="bg-gray-50 p-3 md:p-4 rounded-lg">{selectedDisease.pengertian}</p>
          </section>

          {selectedDisease.jenis.length > 0 && (
            <section>
              <h3 className="text-lg md:text-xl font-semibold text-teal-700 mb-2 border-l-4 border-teal-500 pl-3">
                2. Jenis-Jenis
              </h3>
              <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2">
                {selectedDisease.jenis.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
          )}

          <section>
            <h3 className="text-lg md:text-xl font-semibold text-teal-700 mb-2 border-l-4 border-teal-500 pl-3">
              Penyebab
            </h3>
            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2">
              {selectedDisease.penyebab.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-semibold text-teal-700 mb-2 border-l-4 border-teal-500 pl-3">
              Gejala
            </h3>
            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2">
              {selectedDisease.gejala.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-semibold text-teal-700 mb-2 border-l-4 border-teal-500 pl-3">
              Dampak & Komplikasi
            </h3>
            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2">
              {selectedDisease.dampak.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </section>

          <section className="bg-teal-50 p-4 md:p-6 rounded-xl">
            <h3 className="text-lg md:text-xl font-semibold text-teal-800 mb-3 flex items-center gap-2">
              Pencegahan
            </h3>
            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 text-teal-900">
              {selectedDisease.pencegahan.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </section>

          <section className="bg-blue-50 p-4 md:p-6 rounded-xl">
            <h3 className="text-lg md:text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
              Pengobatan
            </h3>
            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 text-blue-900">
              {selectedDisease.pengobatan.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}