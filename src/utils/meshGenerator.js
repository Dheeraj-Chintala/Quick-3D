import * as THREE from 'three';

/**
 * Loads an image and returns its pixel data.
 * @param {File | string} source - File object or URL
 * @returns {Promise<HTMLImageElement>}
 */
export const loadImage = (source) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    if (source instanceof File) {
      img.src = URL.createObjectURL(source);
    } else {
      img.src = source;
    }
  });
};

/**
 * Generates height data from an image.
 * Darker = Lower, Lighter = Higher.
 * @param {HTMLImageElement} image 
 * @param {number} width - resolution width 
 * @param {number} height - resolution height
 * @param {boolean} invert - invert the heightmap
 * @returns {Float32Array} - Normalized height data (0.0 to 1.0)
 */
export const generateHeightMap = (image, width = 256, height = 256, invert = false) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Draw image to fit canvas
  ctx.drawImage(image, 0, 0, width, height);
  const imgData = ctx.getImageData(0, 0, width, height);
  const pixels = imgData.data; // R, G, B, A, ...

  const data = new Float32Array(width * height);

  for (let i = 0; i < pixels.length; i += 4) {
    // Simple grayscale conversion: 0.299R + 0.587G + 0.114B
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    
    // Normalize 0-255 to 0.0-1.0
    let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    if (invert) brightness = 1.0 - brightness;
    
    // Check alpha - transparent is treated as base (0)
    if (pixels[i+3] < 10) {
        brightness = 0;
    }

    data[i / 4] = brightness;
  }

  return data;
};

/**
 * Updates a PlaneGeometry based on heightmap data.
 * @param {THREE.PlaneGeometry} geometry 
 * @param {Float32Array} heightMap 
 * @param {number} maxHeight - Maximum extrusion height
 */
export const updateGeometry = (geometry, heightMap, maxHeight = 10) => {
    const posAttribute = geometry.attributes.position;
    
    // Ensure geometry matches heightmap resolution
    // Note: PlaneGeometry vertices count = (wSeg + 1) * (hSeg + 1)
    // We assume the geometry was created with sufficient segments.
    // For a 256x256 map, we need 255 segments.
    
    if (posAttribute.count !== heightMap.length) {
        console.warn('Geometry vertices count does not match height map size.');
        return;
    }

    for (let i = 0; i < posAttribute.count; i++) {
        // Plane is mostly flat on Z or Y. Default PlaneGeometry is in XY plane.
        // We usually want to displace Z.
        posAttribute.setZ(i, heightMap[i] * maxHeight);
    }
    
    posAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
};
