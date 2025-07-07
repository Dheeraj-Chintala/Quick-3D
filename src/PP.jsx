return (
  <div className="grid place-items-center">
    <h1>QUICK 3D</h1>
    <div
      {...getRootProps()}
      className={`
            w-1/2
      border-2 border-dashed border-gray-500
      bg-gradient-to-br from-green-400 to-blue-500
      hover:from-blue-500 hover:to-green-400
      transition-all duration-500
      p-8 text-center rounded-[10px] mb-2
      cursor-pointer
      ${isDragActive ? "bg-red-500" : "bg-blue-500"}
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
        <p>
          {isDragActive
            ? "Drop the image here..."
            : "Drag & drop image here, or click to select"}
        </p>
      )}
    </div>

    <form onSubmit={handleSubmit}>
      <label>
        Extrude Height:
        <input
          type="number"
          step="0.1"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <button
        type="submit"
        className="
    px-6 py-3
    bg-gradient-to-r from-blue-500 to-purple-600
    text-white font-semibold
    rounded-full shadow-md
    hover:from-purple-600 hover:to-indigo-700
    hover:scale-105 hover:shadow-lg
    transition-all duration-300
  "
      >
        Convert to STL
      </button>
    </form>

    {stlUrl && (
      <div className="h-150 w-4/5">
        <STLViewer stlUrl={stlUrl} />
        <DownloadButton stlUrl={stlUrl} />
      </div>
    )}
  </div>
);
