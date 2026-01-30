import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { loadImage } from '../../utils/meshGenerator';
import { exportToSTL } from '../../utils/exporters';
import Viewer3D from './Viewer3D';
import HUD from './HUD';
import About from './About';
import { FaCloudUploadAlt, FaMouse } from 'react-icons/fa';

const Workspace = () => {
  const [image, setImage] = useState(null);
  const [settings, setSettings] = useState({
    height: 10,
    invert: false,
    color: '#ffffff',
    autoRotate: false
  });
  
  // Reference to the THREE.Mesh for export
  const meshRef = useRef(null);
  // Reference for scrolling
  const editorRef = useRef(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const img = await loadImage(file);
        setImage(img);
      } catch (err) {
        console.error("Failed to load image", err);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': [] },
    multiple: false
  });

  const handleDownload = () => {
    if (meshRef.current) {
        exportToSTL(meshRef.current, 'Quick3D-Model.stl');
    }
  };

  const handleReset = () => {
    setImage(null);
    setSettings({ height: 10, invert: false, color: '#ffffff', autoRotate: false });
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-[var(--color-bg-main)] text-[var(--color-text-primary)] scroll-smooth transition-colors duration-300 relative">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-dot-grid fixed" />

      {/* 3D Editor Section (Full Height) */}
      <div ref={editorRef} className="relative w-full h-screen flex flex-col z-10">
        <AnimatePresence mode="wait">
            {!image ? (
            /* Upload State */
            <motion.div 
                key="upload"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -50 }}
                className="flex-1 flex items-center justify-center p-6"
            >
                <div 
                {...getRootProps()} 
                className={`
                    group cursor-pointer relative
                    w-full max-w-xl aspect-video
                    rounded-3xl border border-dashed 
                    flex flex-col items-center justify-center
                    transition-all duration-300
                    bg-[var(--color-bg-card)] hover:brightness-110
                    ${isDragActive ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'border-[var(--color-border)] hover:border-[var(--color-text-secondary)]'}
                `}
                >
                <input {...getInputProps()} />
                <div className="w-20 h-20 mb-6 rounded-2xl bg-[var(--color-bg-main)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border border-[var(--color-border)]">
                    <FaCloudUploadAlt className="text-4xl text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <h2 className="text-2xl font-bold font-croboto mb-2 text-[var(--color-text-primary)]">Drop your image</h2>
                <p className="text-[var(--color-text-secondary)]">PNG, JPG supported.</p>
                </div>
            </motion.div>
            ) : (
            /* Editor State */
            <motion.div 
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-10"
            >
                {/* 3D View */}
                <Viewer3D 
                    image={image} 
                    settings={settings} 
                    refMesh={(mesh) => meshRef.current = mesh}
                />

                {/* HUD Controls */}
                <HUD 
                    settings={settings} 
                    updateSettings={(newSettings) => setSettings(p => ({...p, ...newSettings}))}
                    onDownload={handleDownload}
                    onReset={handleReset}
                />
            </motion.div>
            )}
        </AnimatePresence>
        
        {/* Scroll Indicator */}
        {!image && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--color-text-secondary)] text-2xl"
            >
                <FaMouse />
            </motion.div>
        )}
      </div>

      {/* Content Section */}
      <About />
      
    </div>
  );
};

export default Workspace;
