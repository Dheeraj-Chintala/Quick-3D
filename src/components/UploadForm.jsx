import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import STLViewer from "./STLViewer";
import Navbar from "./Navbar";
import "/src/index.css";
import { FaDownload } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { motion } from "framer-motion";
import FadeInOnScroll from "../UIComponents/FadeInScroll";
function UploadForm() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [height, setHeight] = useState(5.0);
  const [stlUrl, setStlUrl] = useState("/AskModel.stl");
  const [stlFilename, setStlFilename] = useState(null);
  const [loading, setLoading] = useState(false);
  const Loading = () => (
    <div
    className="border rounded h-full w-full  backdrop-blur-md border border-white/50  rounded-2xl shadow"
    > <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 place-items-center">Your Image is being Processed. Please Wait...
  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
</div></div>
  

  );
  const items = [
    "samples/hulk.png",

    "samples/captain.png",
    "samples/batman.png",
    "samples/puzzle.png",
    "samples/bang.png",
    "samples/star.png",
  ];

  const firstRef = useRef(null);
  const secondRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const imageFile = acceptedFiles[0];
    setFile(imageFile);
    setPreview(URL.createObjectURL(imageFile));
  }, []);

  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
     if (stlUrl !== "/AskModel.stl") {
                    await handleDelete(); 
                  }
    setLoading(true);
  
    e.preventDefault();
    if (!file) return alert("Please upload an image.");
    scrollTo(secondRef);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("height", height);

    const res = await axios.post(`${apiUrl}/upload/`, formData);
    const filename = res.data.filename;
    setStlFilename(filename);

    const downloadRes = await axios.get(
      `${apiUrl}/download-stl/?filename=${filename}`,
      {
        responseType: "blob",
      }
    );

    const blobUrl = URL.createObjectURL(downloadRes.data);
    setStlUrl(blobUrl);
    setLoading(false);
  };

  const handleDelete = async () => {
   

    try {
      await axios.delete(`${apiUrl}/delete-stl/?filename=${stlFilename}`);

      setStlUrl("/AskModel.stl");
      setStlFilename(null);
    } catch (error) {
     
    }
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* First Section */}
      <div
        ref={firstRef}
        className="h-screen snap-start flex items-center justify-center  text-white "
      >
        <div className="h-15 w-screen   absolute z-50 top-0 flex place-items-center backdrop-blur-md bg-black/30   border border-white/20 p-8 rounded-2xl shadow-lg w-96">
          <Navbar />
        </div>
        <div className="h-4/5 w-3/5  flex items-center justify-center flex-col">
          <div
            {...getRootProps()}
            className={`
            w-3/4 h-1/2 
      flex items-center justify-center      
      border-2 border-dashed border-white
      bg-black/30
      transition-all duration-500
      p-8 text-center rounded-[10px] mb-2
      cursor-pointer
      backdrop-blur-md border border-white/50 p-8 rounded-2xl shadow
      
      ${
        isDragActive
          ? "bg-gradient-to-r from-green-500 to-indigo-600"
          : "bg-black/30"
      }
    `}
          >
            <input {...getInputProps()} />
            {preview ? (
              <div>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "6px",
                  }}
                />
                <p style={{ marginTop: "10px" }}>{file.name}</p>
              </div>
            ) : (
              <p className="font-croboto">
                {isDragActive
                  ? "Drop the image here..."
                  : "Drag & drop image here, or click to select"}
              </p>
            )}
          </div>

          {/* <label>
              Extrude Height:
              <input
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
            </label> */}
          <button
            onClick={handleSubmit}
            type="submit"
            className=" w-3/4 px-6 py-3 bg-white/80 cursor-pointer

             text-black font-semibold font-croboto rounded shadow-md hover:from-purple-600 hover:to-indigo-700 hover:scale-105 hover:shadow-lg hover:bg-white/90 transition-all duration-300"
          >
            Generate Model
          </button>
        </div>
      
        <div className="h-4/5 w-2/5  flex  justify-center flex-col">
      
          <div className="grid grid-cols-3 gap-4 items-center justify-center">
            {items.map((item) => (
              <img
                className="h-1/2  object-cover hover:scale-105 hover:shadow-lg transition-all duration-300 hidden md:block"
                src={item}
              />
            ))}
          </div>

          <FadeInOnScroll>
            <p className="text-lg5 md:text-base text-white/80 font-croboto leading-relaxed hidden md:block">
              Give it a try! Just drag and drop one of the sample images above.
            </p>
          </FadeInOnScroll>
        </div>
      </div>

      {/* Second Section */}
      <div
        ref={secondRef}
        className="h-screen snap-start flex flex-col items-center justify-center text-white"
      >
        {stlUrl && (
          <div className="relative h-150 w-4/5 ">
            {loading ? <Loading/>:  <STLViewer stlUrl={stlUrl} />}
           {!loading && <div className="flex  mt-5 h-12">
              <button
                className=" w-1/2   bg-white/50 flex items-center justify-center cursor-pointer

             text-black font-semibold font-croboto rounded shadow-md   hover:shadow-lg hover:bg-white/90 transition-all duration-300"
                onClick={async () => {
                  scrollTo(firstRef);
                  if (stlUrl !== "/AskModel.stl") {
                    await handleDelete(); 
                  }
                }}
              >
                Generate Another
                <TbReload />
              </button>

              <button
                className=" w-1/2 bg-white/80 cursor-pointer

             text-black font-semibold font-croboto rounded shadow-md  hover:bg-gradient-to-r hover:from-indigo-400 hover:to-blue-500  hover:shadow-lg hover:bg-white/90 transition-all duration-300"
              >
                <a
                  href={stlUrl}
                  download
                  className="flex items-center justify-center gap-2"
                >
                  Download Model <FaDownload />
                </a>
              </button>
            </div>}

            
          </div>
        )}
      </div>
      {/* Third section */}
      <div
        id="Info"
        className="h-screen snap-start flex flex-col items-center justify-center text-white "
      >
        <div className="border border-white/50 rounded-2xl shadow backdrop-blur-md w-full md:w-3/4 max-w-4xl h-auto md:h-3/4 mx-auto px-4 md:px-8 py-6 overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white/50 drop-shadow-lg tracking-wide font-croboto mb-2">
            Tips for Better 3D Output
          </h1>
          <FadeInOnScroll>
            <p className="text-sm md:text-base text-white/80 font-croboto leading-relaxed mb-6">
              ● Use grayscale or black and white images for optimal depth
              mapping.
              <br />
              ● Recommended image formats: PNG, JPG, JPEG.
              <br />
              ● Use simple shapes or high-contrast designs for better 3D output.
              <br />
              ● Avoid overly detailed or color-rich images.
              <br />● Do not upload sensitive or copyrighted content.
            </p>
          </FadeInOnScroll>

          <h1 className="text-2xl md:text-3xl font-bold text-white/50 drop-shadow-lg tracking-wide font-croboto mb-2">
            Future Enhancements
          </h1>
          <FadeInOnScroll>
            <p className="text-sm md:text-base text-white/80 font-croboto leading-relaxed mb-6">
              ● Multiple Download Formats like glb, gltF
              <br />
              ● AI-based Depth Estimation
              <br />
              ● Custom Height Controls
              <br />● Multi-layer Image Support
            </p>
          </FadeInOnScroll>

          <h1 className="text-2xl md:text-3xl font-bold text-white/50 drop-shadow-lg tracking-wide font-croboto mb-2">
            Developed By
          </h1>
          <FadeInOnScroll>
            <p className="text-sm md:text-base text-white/80 font-croboto leading-relaxed">
              This application was developed by{" "}
              <strong>Dheeraj Chintala</strong> as part of a personal project.
              <br />
              Feel free to reach out for feedback, collaboration, or
              improvements.
            </p>
          </FadeInOnScroll>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
