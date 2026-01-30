import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaUndo, FaMagic, FaChevronDown, FaChevronUp, FaCog } from 'react-icons/fa';

const ControlSlider = ({ label, value, min, max, step, onChange }) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1 font-medium">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-[var(--color-bg-card)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)] hover:accent-[var(--color-accent-hover)] transition-all"
    />
  </div>
);

const HUD = ({ settings, updateSettings, onDownload, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand on desktop, collapse on mobile initially
  // Simple check for width could be added, or just default to collapsed on small screens via CSS/Media Query logic if we were using CSS modules.
  // For now, let's keep it simple: defaulting to 'false' means user has to open it. 
  // Or we can check window.innerWidth in useEffect.
  
  React.useEffect(() => {
    if (window.innerWidth > 768) setIsOpen(true);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden absolute bottom-6 right-6 z-50 p-4 text-[var(--color-accent)] transition-colors"
      >
        <FaCog className={`text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="absolute bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 right-4 md:right-8 w-[calc(100%-2rem)] md:w-72 bg-[var(--color-bg-card)]/90 backdrop-blur-xl border border-[var(--color-border)] p-6 rounded-2xl shadow-2xl z-40"
          >
            <div className="flex items-center justify-between mb-6">
                 <h3 className="text-[var(--color-text-primary)] font-bold text-lg flex items-center gap-2">
                    <FaMagic className="text-[var(--color-accent)]" /> Settings
                </h3>
                <button onClick={() => setIsOpen(false)} className="md:hidden text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                    <FaChevronDown />
                </button>
            </div>
           

            <ControlSlider 
                label="Extrusion Height" 
                value={settings.height} 
                min={1} max={50} step={0.5} 
                onChange={(v) => updateSettings({ height: v })} 
            />

            <div className="flex items-center justify-between mb-6">
                <span className="text-xs text-[var(--color-text-secondary)] font-medium">Invert Mesh</span>
                <button 
                onClick={() => updateSettings({ invert: !settings.invert })}
                className={`w-10 h-5 rounded-full relative transition-colors ${settings.invert ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-bg-main)]'}`}
                >
                <div className={`absolute top-1 left-1 w-3 h-3 rounded-full transition-transform bg-white ${settings.invert ? 'translate-x-5' : ''}`} />
                </button>
            </div>

            <div className="mb-6">
                <label className="text-xs text-[var(--color-text-secondary)] font-medium block mb-2">Material Color</label>
                <div className="flex gap-2">
                    {['#ffffff', '#ff0055', '#0099ff', '#ffcc00', '#00ff99'].map(c => (
                        <button 
                        key={c}
                        onClick={() => updateSettings({ color: c })}
                        className={`w-6 h-6 rounded-full border-2 ${settings.color === c ? 'border-[var(--color-text-primary)]' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
            </div>

            <div className="flex gap-2 mt-8">
                <button 
                    onClick={onDownload}
                    className="flex-1 bg-[var(--color-text-primary)] text-[var(--color-bg-main)] py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                >
                    <FaDownload /> Download
                </button>
                <button 
                    onClick={onReset}
                    className="p-2 bg-[var(--color-bg-main)] text-[var(--color-text-primary)] rounded-lg hover:brightness-90 transition-colors"
                    title="Reset"
                >
                    <FaUndo />
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HUD;
