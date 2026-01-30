import { STLExporter } from 'three-stdlib';

/**
 * Exports a THREE.Mesh to an STL file blob.
 * @param {THREE.Mesh} mesh 
 * @param {string} filename 
 */
export const exportToSTL = (mesh, filename = 'model.stl') => {
  const exporter = new STLExporter();
  const options = { binary: true };
  const result = exporter.parse(mesh, options);
  
  const blob = new Blob([result], { type: 'application/octet-stream' });
  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);
  
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
