import { useState, useRef, useCallback } from 'react';

const WALL_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBLz2NPPy2GgxiWdF7Qs96IBtoF3QO3i-3o1aV7szEyq2DlZoRV_7eCKi6nhVsT1KnFZdGZ-OgPVDjIC3jZGZVXFhYqgukhWcz-rpJyv6bDsHmbFaeOegWcUikHuHWGVNmTyY5lClkeiCD11oq5DHD1kViwmvhhFJB8cHjYhL2Ab__zF5cq5DkWjckHeYZcrlzmCOPmz4Uc-yIrtMT_y4Uo_Q1mBx4TPV52PwbFtWjBm0cf5fm-OAetLbojF3PhUslt9hJUzWdDnaA2";

const SIZES = [
  { label: 'A4', dims: '21 × 29.7 cm', price: 199, description: 'Perfect for desks & small walls' },
  { label: 'A3', dims: '29.7 × 42 cm', price: 349, description: 'Most popular size' },
  { label: 'A2', dims: '42 × 59.4 cm', price: 549, description: 'Statement wall piece' },
];

const PAPERS = [
  {
    label: 'Matte',
    icon: '🖤',
    description: 'No glare, ultra-smooth finish. Best for dark & minimal designs.',
    finish: 'Anti-reflective coating',
    extra: 0,
  },
  {
    label: 'Glossy',
    icon: '✨',
    description: 'Vivid colours, sharp contrast. Great for photos & vibrant art.',
    finish: 'High-gloss UV coating',
    extra: 50,
  },
  {
    label: 'Canvas',
    icon: '🎨',
    description: 'Textured premium feel. Gallery-worthy museum quality.',
    finish: 'Cotton-blend canvas',
    extra: 150,
  },
];

const STEPS = ['Upload', 'Size', 'Paper', 'Preview'];

export default function CustomPage() {
  const [step, setStep] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [animDir, setAnimDir] = useState('forward'); // for slide direction
  const [animating, setAnimating] = useState(false);
  const fileInputRef = useRef();

  const totalPrice = selectedSize && selectedPaper
    ? selectedSize.price + selectedPaper.extra
    : selectedSize ? selectedSize.price : 199;

  // ── File handling ──────────────────────────────────────────
  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setFileName(file.name);
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 25;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          setUploadedImage(URL.createObjectURL(file));
        }, 300);
      }
      setUploadProgress(Math.min(Math.round(prog), 100));
    }, 120);
  }, []);

  const handleFileChange = (e) => processFile(e.target.files?.[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  // ── Step navigation ────────────────────────────────────────
  const goTo = (next) => {
    if (animating) return;
    setAnimDir(next > step ? 'forward' : 'back');
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 220);
  };

  const canNext = () => {
    if (step === 0) return !!uploadedImage;
    if (step === 1) return !!selectedSize;
    if (step === 2) return !!selectedPaper;
    return true;
  };

  // ── Slide animation classes ────────────────────────────────
  const slideClass = animating
    ? animDir === 'forward'
      ? 'opacity-0 translate-x-6'
      : 'opacity-0 -translate-x-6'
    : 'opacity-100 translate-x-0';

  return (
    <div className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col">

        {/* ── Step Indicator ───────────────────────────────── */}
        <div className="w-full bg-white dark:bg-[#1a1612] border-b border-gray-100 dark:border-gray-800 py-4 sticky top-0 z-20">
          <div className="max-w-[900px] mx-auto px-4">
            <div className="flex items-center justify-between">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <button
                    onClick={() => i < step && goTo(i)}
                    className={`flex items-center gap-2 transition-all duration-300 ${i < step ? 'cursor-pointer' : 'cursor-default'
                      }`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${i === step
                        ? 'bg-[#0a0a0a] text-white scale-110 shadow-lg'
                        : i < step
                          ? 'bg-green-500 text-white'
                          : 'border-2 border-gray-300 dark:border-gray-600 text-gray-400'
                      }`}>
                      {i < step ? '✓' : i + 1}
                    </span>
                    <span className={`hidden sm:inline text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${i === step ? 'text-[#0a0a0a] dark:text-white' : i < step ? 'text-green-500' : 'text-gray-400'
                      }`}>
                      {s}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 mx-2 sm:mx-4 h-[2px] rounded transition-all duration-500 ${i < step ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────── */}
        <div className="flex-grow">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

              {/* LEFT: Step Content */}
              <div className={`flex flex-col gap-6 order-2 lg:order-1 transition-all duration-220 ease-out ${slideClass}`}>

                {/* ── STEP 0: Upload ── */}
                {step === 0 && (
                  <>
                    <div>
                      <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-[var(--color-accent-black)] dark:text-white mb-2 leading-none">
                        CREATE YOUR<br /><span className="text-gray-400">MASTERPIECE</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mt-3">
                        Turn your digital art, photos, or designs into premium gallery-quality wall posters.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-[#1a1612] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                      {/* Drop zone */}
                      <label
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-xl h-60 md:h-72 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${dragging
                            ? 'border-[#0a0a0a] bg-[#0a0a0a]/10 scale-[1.01]'
                            : uploadedImage
                              ? 'border-green-400 bg-green-50 dark:bg-green-900/10'
                              : 'border-gray-300 dark:border-gray-700 hover:border-[#0a0a0a] hover:bg-[#0a0a0a]/5'
                          }`}
                      >
                        <input
                          ref={fileInputRef}
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          type="file"
                          onChange={handleFileChange}
                        />

                        {uploading ? (
                          <div className="flex flex-col items-center gap-4 w-full px-8">
                            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center animate-pulse">
                              <span className="material-symbols-outlined text-3xl text-gray-400">cloud_upload</span>
                            </div>
                            <p className="font-bold text-sm uppercase tracking-widest text-gray-600 dark:text-gray-300 truncate max-w-[200px]">{fileName}</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-[#0a0a0a] h-2 rounded-full transition-all duration-150"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500">{uploadProgress}% uploaded</p>
                          </div>
                        ) : uploadedImage ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-4xl">✅</span>
                            <p className="font-bold text-sm uppercase tracking-widest text-green-600 truncate max-w-[220px]">{fileName}</p>
                            <p className="text-xs text-gray-500">Click to replace image</p>
                          </div>
                        ) : (
                          <>
                            <div className={`w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center transition-transform duration-300 ${dragging ? 'scale-125' : ''}`}>
                              <span className="material-symbols-outlined text-3xl text-gray-400">cloud_upload</span>
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-base uppercase tracking-wider text-[var(--color-accent-black)] dark:text-white mb-1">
                                {dragging ? 'Drop it here!' : 'Drag & Drop Your Image'}
                              </p>
                              <p className="text-sm text-gray-500">or click to browse files</p>
                            </div>
                            <div className="flex gap-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                              <span>JPG</span><span>•</span><span>PNG</span><span>•</span><span>TIFF</span><span>•</span><span>Max 50MB</span>
                            </div>
                          </>
                        )}
                      </label>
                    </div>
                  </>
                )}

                {/* ── STEP 1: Size ── */}
                {step === 1 && (
                  <>
                    <div>
                      <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-[var(--color-accent-black)] dark:text-white mb-2 leading-none">
                        CHOOSE<br /><span className="text-gray-400">YOUR SIZE</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-base mt-3">Select the perfect size for your space.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      {SIZES.map((s) => (
                        <button
                          key={s.label}
                          onClick={() => setSelectedSize(s)}
                          className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-250 flex items-center justify-between group ${selectedSize?.label === s.label
                              ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-xl scale-[1.01]'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1612] hover:border-gray-400 hover:scale-[1.005]'
                            }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`font-[family-name:var(--font-display)] text-3xl font-bold ${selectedSize?.label === s.label ? 'text-white' : 'text-[#0a0a0a] dark:text-white'
                              }`}>{s.label}</span>
                            <div>
                              <p className={`text-xs font-bold uppercase tracking-widest ${selectedSize?.label === s.label ? 'text-white/80' : 'text-gray-500'
                                }`}>{s.dims}</p>
                              <p className={`text-sm mt-0.5 ${selectedSize?.label === s.label ? 'text-white/70' : 'text-gray-400'
                                }`}>{s.description}</p>
                            </div>
                          </div>
                          <span className={`font-bold text-xl ${selectedSize?.label === s.label ? 'text-white' : 'text-[#0a0a0a] dark:text-white'
                            }`}>₹{s.price}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* ── STEP 2: Paper ── */}
                {step === 2 && (
                  <>
                    <div>
                      <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-[var(--color-accent-black)] dark:text-white mb-2 leading-none">
                        PAPER<br /><span className="text-gray-400">FINISH</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-base mt-3">The finish defines how your poster feels and looks.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      {PAPERS.map((p) => (
                        <button
                          key={p.label}
                          onClick={() => setSelectedPaper(p)}
                          className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-250 ${selectedPaper?.label === p.label
                              ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-xl scale-[1.01]'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1612] hover:border-gray-400'
                            }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{p.icon}</span>
                              <div>
                                <p className={`font-bold text-base uppercase tracking-widest ${selectedPaper?.label === p.label ? 'text-white' : 'text-[#0a0a0a] dark:text-white'
                                  }`}>{p.label}</p>
                                <p className={`text-xs mt-0.5 ${selectedPaper?.label === p.label ? 'text-white/70' : 'text-gray-500'
                                  }`}>{p.finish}</p>
                                <p className={`text-sm mt-1 ${selectedPaper?.label === p.label ? 'text-white/80' : 'text-gray-400'
                                  }`}>{p.description}</p>
                              </div>
                            </div>
                            <span className={`font-bold text-sm shrink-0 ${selectedPaper?.label === p.label ? 'text-white' : 'text-gray-500'
                              }`}>
                              {p.extra === 0 ? 'Included' : `+₹${p.extra}`}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* ── STEP 3: Preview / Summary ── */}
                {step === 3 && (
                  <>
                    <div>
                      <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-[var(--color-accent-black)] dark:text-white mb-2 leading-none">
                        YOUR<br /><span className="text-gray-400">ORDER</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-base mt-3">Looks great! Review your custom poster before ordering.</p>
                    </div>

                    <div className="bg-white dark:bg-[#1a1612] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                      {/* Summary rows */}
                      {[
                        { label: 'Image', value: fileName || 'Custom Upload', icon: '🖼️' },
                        { label: 'Size', value: selectedSize ? `${selectedSize.label} — ${selectedSize.dims}` : '—', icon: '📐' },
                        { label: 'Paper', value: selectedPaper ? `${selectedPaper.label} (${selectedPaper.finish})` : '—', icon: '📄' },
                      ].map((row, i) => (
                        <div key={i} className={`flex items-center gap-4 px-6 py-4 ${i < 2 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                          <span className="text-xl">{row.icon}</span>
                          <div className="flex-1">
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{row.label}</p>
                            <p className="font-bold text-[#0a0a0a] dark:text-white text-sm mt-0.5">{row.value}</p>
                          </div>
                          <button onClick={() => goTo(i)} className="text-xs text-gray-400 hover:text-[#0a0a0a] dark:hover:text-white underline transition-colors">Edit</button>
                        </div>
                      ))}

                      {/* Price breakdown */}
                      <div className="px-6 py-4 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>Base price ({selectedSize?.label})</span>
                          <span>₹{selectedSize?.price}</span>
                        </div>
                        {selectedPaper?.extra > 0 && (
                          <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>{selectedPaper?.label} finish</span>
                            <span>+₹{selectedPaper?.extra}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold text-lg text-[#0a0a0a] dark:text-white mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <span className="uppercase tracking-widest text-sm">Total</span>
                          <span className="font-[family-name:var(--font-display)] text-2xl">₹{totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full h-14 bg-[#0a0a0a] hover:bg-black text-white font-bold uppercase tracking-widest rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-base">shopping_cart</span>
                      Add to Cart — ₹{totalPrice}
                    </button>
                  </>
                )}

                {/* ── Navigation buttons ── */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">
                  {/* Price display */}
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">
                      {step === 3 ? 'Total' : 'Starting from'}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-2xl text-[#0a0a0a] dark:text-white font-bold">
                      ₹{totalPrice}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    {step > 0 && (
                      <button
                        onClick={() => goTo(step - 1)}
                        className="px-6 h-11 border-2 border-gray-300 dark:border-gray-600 text-[#0a0a0a] dark:text-white font-bold uppercase tracking-widest rounded-lg hover:border-gray-500 transition-all text-xs"
                      >
                        ← Back
                      </button>
                    )}
                    {step < 3 && (
                      <button
                        onClick={() => canNext() && goTo(step + 1)}
                        disabled={!canNext()}
                        className={`px-8 h-11 font-bold uppercase tracking-widest rounded-lg text-xs transition-all flex items-center gap-2 ${canNext()
                            ? 'bg-[#0a0a0a] text-white hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          }`}
                      >
                        {step === 0 ? 'Choose Size' : step === 1 ? 'Choose Paper' : 'Preview Order'} →
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT: Live Preview */}
              <div className="order-1 lg:order-2">
                <div className="sticky top-24">
                  <div className="relative w-full aspect-[4/5] bg-gray-200 dark:bg-[#1a1612] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      alt="Gallery wall"
                      className="w-full h-full object-cover opacity-80 blur-[2px] scale-105"
                      src={WALL_IMG}
                    />
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Poster frame */}
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out ${uploadedImage ? 'w-[58%] shadow-[0_30px_80px_rgba(0,0,0,0.7)]' : 'w-[55%] shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                      } aspect-[3/4] bg-white flex items-center justify-center overflow-hidden border-[10px] border-white dark:border-[#111]`}>
                      {uploadedImage ? (
                        <img
                          src={uploadedImage}
                          alt="Your poster"
                          className={`w-full h-full object-cover transition-all duration-700 ${selectedPaper?.label === 'Glossy' ? 'brightness-110 contrast-105 saturate-110' :
                              selectedPaper?.label === 'Canvas' ? 'contrast-95 saturate-90' :
                                'brightness-95'
                            }`}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                          <span className="material-symbols-outlined text-4xl mb-2">image</span>
                          <span className="text-xs uppercase font-bold tracking-widest">Your Image Preview</span>
                        </div>
                      )}
                      {/* Paper finish overlay */}
                      {selectedPaper?.label === 'Glossy' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                      )}
                      {selectedPaper?.label === 'Canvas' && (
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                          style={{ backgroundImage: 'repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 0,transparent 4px),repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 0,transparent 4px)' }}
                        />
                      )}
                    </div>

                    {/* Live badge */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg">
                      <span className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Live Preview
                      </span>
                    </div>

                    {/* Size badge */}
                    {selectedSize && (
                      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{selectedSize.label} — {selectedSize.dims}</span>
                      </div>
                    )}

                    {/* Paper badge */}
                    {selectedPaper && (
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{selectedPaper.icon} {selectedPaper.label}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-center text-xs text-gray-400 mt-3 uppercase tracking-widest">
                    Visual representation on a standard gallery wall
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}