import { useState } from 'react';

const PREVIEW_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBLz2NPPy2GgxiWdF7Qs96IBtoF3QO3i-3o1aV7szEyq2DlZoRV_7eCKi6nhVsT1KnFZdGZ-OgPVDjIC3jZGZVXFhYqgukhWcz-rpJyv6bDsHmbFaeOegWcUikHuHWGVNmTyY5lClkeiCD11oq5DHD1kViwmvhhFJB8cHjYhL2Ab__zF5cq5DkWjckHeYZcrlzmCOPmz4Uc-yIrtMT_y4Uo_Q1mBx4TPV52PwbFtWjBm0cf5fm-OAetLbojF3PhUslt9hJUzWdDnaA2";

export default function CustomPage() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col">
        {/* Step indicator bar */}
        <div className="w-full bg-white dark:bg-[#1a1612] border-b border-gray-100 dark:border-gray-800 py-4">
          <div className="max-w-[1000px] mx-auto px-4">
            <div className="flex justify-between items-center text-xs md:text-sm font-bold tracking-widest uppercase">
              <div className="flex items-center gap-2 text-[var(--color-accent-black)] dark:text-white">
                <span className="w-6 h-6 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-[10px]">1</span>
                <span className="hidden sm:inline">Upload</span>
              </div>
              <div className="h-px w-8 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">2</span>
                <span className="hidden sm:inline">Size</span>
              </div>
              <div className="h-px w-8 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">3</span>
                <span className="hidden sm:inline">Paper</span>
              </div>
              <div className="h-px w-8 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">4</span>
                <span className="hidden sm:inline">Preview</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start h-full">
              <div className="flex flex-col gap-8 order-2 lg:order-1">
                <div>
                  <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-[var(--color-accent-black)] dark:text-white mb-2">
                    Create Your<br /><span className="text-[#0a0a0a]">Masterpiece</span>
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">
                    Turn your digital art, photos, or designs into premium gallery-quality wall art.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#1a1612] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-all duration-300 rounded-lg h-64 md:h-80 flex flex-col items-center justify-center gap-4 cursor-pointer group relative">
                    <input accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" type="file" onChange={handleFileChange} />
                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-[#0a0a0a] transition-colors">cloud_upload</span>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg text-[var(--color-accent-black)] dark:text-white uppercase tracking-wider mb-1">Drag & Drop Your Image</p>
                      <p className="text-sm text-gray-500">or click to browse files</p>
                    </div>
                    <div className="absolute bottom-4 flex gap-4 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      <span>JPG</span>
                      <span>PNG</span>
                      <span>TIFF</span>
                      <span>Max 50MB</span>
                    </div>
                  </label>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Estimated Price</span>
                    <span className="font-[family-name:var(--font-display)] text-3xl text-[#0a0a0a] font-bold tracking-wide">Starting from ₹199</span>
                  </div>
                  <button type="button" className="w-full sm:w-auto px-8 h-12 bg-[var(--color-accent-black)] hover:bg-black text-white font-bold uppercase tracking-widest rounded shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    Next: Choose Size <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative h-full min-h-[400px] lg:min-h-auto">
                <div className="sticky top-24">
                  <div className="relative w-full aspect-[4/5] bg-gray-200 dark:bg-[#1a1612] rounded-xl overflow-hidden shadow-2xl">
                    <img alt="Gallery wall context" className="w-full h-full object-cover opacity-90 blur-[2px]" src={PREVIEW_IMG} />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-[3/4] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden border-8 border-white dark:border-black">
                      {uploadedImage ? (
                        <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                          <span className="material-symbols-outlined text-4xl mb-2">image</span>
                          <span className="text-xs uppercase font-bold tracking-widest">Your Image Preview</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded shadow-lg">
                      <span className="text-xs font-bold text-[var(--color-accent-black)] uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Live Preview
                      </span>
                    </div>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-4 uppercase tracking-widest">Visual representation on a standard gallery wall</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
