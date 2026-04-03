import React, { useState } from 'react';
import { ptmData } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Wind, Microscope, HeartPulse, 
  ArrowLeft, Stethoscope, BookOpen, List, 
  AlertTriangle, ShieldCheck, Pill, Thermometer, ChevronRight
} from 'lucide-react';

const iconMap = {
  Activity: <Activity className="w-10 h-10 text-teal-600" />,
  Wind: <Wind className="w-10 h-10 text-teal-600" />,
  Microscope: <Microscope className="w-10 h-10 text-teal-600" />,
  HeartPulse: <HeartPulse className="w-10 h-10 text-teal-600" />
};

// konfigurasi variasi animasi Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } // efek muncul berurutan
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function App() {
  // state untuk melacak posisi user: 'landing' -> 'diseases' -> 'topics' -> 'content'
  const [view, setView] = useState('landing');
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // daftar topik dinamis untuk menu dalam penyakit
  const getTopics = (disease) => {
    const topics = [
      { id: 'pengertian', label: 'Pengertian', icon: <BookOpen className="text-teal-600" /> },
      { id: 'jenis', label: 'Jenis-Jenis', icon: <List className="text-teal-600" /> },
      { id: 'penyebab', label: 'Penyebab', icon: <AlertTriangle className="text-teal-600" /> },
      { id: 'gejala', label: 'Gejala', icon: <Thermometer className="text-teal-600" /> },
      { id: 'dampak', label: 'Dampak & Komplikasi', icon: <Activity className="text-teal-600" /> },
      { id: 'pencegahan', label: 'Pencegahan', icon: <ShieldCheck className="text-teal-600" /> },
      { id: 'pengobatan', label: 'Pengobatan', icon: <Pill className="text-teal-600" /> }
    ];
    // sembunyikan 'Jenis-Jenis' jika datanya kosong
    return topics.filter(t => disease[t.id] && disease[t.id].length !== 0);
  };

  // LANDING PAGE
  if (view === 'landing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 to-white p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex justify-center mb-6"
          >
            <div className="p-6 bg-teal-100 rounded-full shadow-lg shadow-teal-100">
              <Stethoscope className="w-20 h-20 text-teal-600" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
            Portal Edukasi <span className="text-teal-600">Kesehatan PTM</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Kenali, pahami, dan cegah Penyakit Tidak Menular (PTM) sedini mungkin untuk masa depan yang lebih sehat.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('diseases')}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg shadow-teal-200 transition-colors text-lg flex items-center gap-2 mx-auto"
          >
            Mulai Belajar <ChevronRight />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // PILIHAN PENYAKIT
  if (view === 'diseases') {
    return (
      <div className="min-h-screen p-4 sm:p-8 max-w-6xl mx-auto">
        <button onClick={() => setView('landing')} className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium mb-8">
          <ArrowLeft size={20} /> Kembali ke Beranda
        </button>

        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Pilih Topik Penyakit</h1>
          <p className="text-gray-500">Pilih salah satu penyakit di bawah ini untuk mempelajari lebih lanjut.</p>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {ptmData.map((item) => (
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              key={item.id}
              onClick={() => { setSelectedDisease(item); setView('topics'); }}
              className="bg-white rounded-2xl shadow-sm border border-teal-100 hover:shadow-xl hover:border-teal-300 transition-all cursor-pointer overflow-hidden group"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-transparent transition-colors z-10" />
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 flex items-center gap-4">
                <div className="p-4 bg-teal-50 rounded-xl shrink-0">{iconMap[item.icon]}</div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-teal-700">{item.title}</h2>
                  <p className="text-teal-600 text-sm font-medium mt-1">Klik untuk detail →</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // TAMPILAN PILIH TOPIK (Pengertian, Gejala, dll)
  if (view === 'topics') {
    const topics = getTopics(selectedDisease);
    return (
      <div className="min-h-screen p-4 sm:p-8 max-w-4xl mx-auto">
        <button onClick={() => setView('diseases')} className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium mb-8">
          <ArrowLeft size={20} /> Kembali ke Daftar Penyakit
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-10 border-b pb-6">
          <div className="p-4 bg-teal-50 rounded-2xl shrink-0">{iconMap[selectedDisease.icon]}</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{selectedDisease.title}</h1>
            <p className="text-gray-500 mt-1">Pilih informasi yang ingin Anda ketahui</p>
          </div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((topic) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={topic.id}
              onClick={() => { setSelectedTopic(topic); setView('content'); }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-400 hover:shadow-md cursor-pointer flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">{topic.icon}</div>
                <h3 className="text-xl font-semibold text-gray-700 group-hover:text-teal-800">{topic.label}</h3>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-teal-500 transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // TAMPILAN KONTEN DETAIL
  if (view === 'content') {
    const dataContent = selectedDisease[selectedTopic.id];
    
    return (
      <div className="min-h-screen bg-white p-4 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setView('topics')} className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium mb-8 bg-teal-50 px-4 py-2 rounded-lg w-fit">
            <ArrowLeft size={20} /> Kembali ke Menu {selectedDisease.title}
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <div className="bg-teal-600 p-6 sm:p-8 flex items-center gap-4 text-white">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">{selectedTopic.icon}</div>
              <div>
                <p className="text-teal-100 text-sm font-medium">{selectedDisease.title}</p>
                <h2 className="text-2xl sm:text-3xl font-bold">{selectedTopic.label}</h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 text-gray-700 text-lg leading-relaxed bg-slate-50">
              {typeof dataContent === 'string' ? (
                <p>{dataContent}</p>
              ) : (
                <ul className="space-y-4">
                  {dataContent.map((item, idx) => (
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx} 
                      className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}