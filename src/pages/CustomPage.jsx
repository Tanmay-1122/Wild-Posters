import { useState, useRef, useCallback } from 'react';

const WALL_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBLz2NPPy2GgxiWdF7Qs96IBtoF3QO3i-3o1aV7szEyq2DlZoRV_7eCKi6nhVsT1KnFZdGZ-OgPVDjIC3jZGZVXFhYqgukhWcz-rpJyv6bDsHmbFaeOegWcUikHuHWGVNmTyY5lClkeiCD11oq5DHD1kViwmvhhFJB8cHjYhL2Ab__zF5cq5DkWjckHeYZcrlzmCOPmz4Uc-yIrtMT_y4Uo_Q1mBx4TPV52PwbFtWjBm0cf5fm-OAetLbojF3PhUslt9hJUzWdDnaA2";

const PINK = '#FF2D78';
const PINK_DARK = '#e0185d';
const PINK_GLOW = 'rgba(255,45,120,0.25)';
const PINK_SOFT = 'rgba(255,45,120,0.08)';

const SIZES = [
  { label: 'A4', dims: '21 × 29.7 cm', price: 199, description: 'Perfect for desks & small walls' },
  { label: 'A3', dims: '29.7 × 42 cm', price: 349, description: 'Most popular size' },
  { label: 'A2', dims: '42 × 59.4 cm', price: 549, description: 'Statement wall piece' },
];

const PAPERS = [
  { label: 'Matte', icon: '🖤', description: 'No glare, ultra-smooth. Best for dark & minimal designs.', finish: 'Anti-reflective coating', extra: 0 },
  { label: 'Glossy', icon: '✨', description: 'Vivid colours, sharp contrast. Great for photos & vibrant art.', finish: 'High-gloss UV coating', extra: 50 },
  { label: 'Canvas', icon: '🎨', description: 'Textured premium feel. Gallery-worthy museum quality.', finish: 'Cotton-blend canvas', extra: 150 },
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
  const [animDir, setAnimDir] = useState('forward');
  const [animating, setAnimating] = useState(false);
  const fileInputRef = useRef();

  const totalPrice = (selectedSize?.price ?? 199) + (selectedPaper?.extra ?? 0);

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setFileName(file.name);
    setUploading(true);
    setUploadProgress(0);
    let prog = 0;
    const iv = setInterval(() => {
      prog += Math.random() * 25;
      if (prog >= 100) {
        prog = 100; clearInterval(iv);
        setTimeout(() => { setUploading(false); setUploadedImage(URL.createObjectURL(file)); }, 300);
      }
      setUploadProgress(Math.min(Math.round(prog), 100));
    }, 120);
  }, []);

  const handleFileChange = (e) => processFile(e.target.files?.[0]);
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); processFile(e.dataTransfer.files?.[0]); };

  const goTo = (next) => {
    if (animating) return;
    setAnimDir(next > step ? 'forward' : 'back');
    setAnimating(true);
    setTimeout(() => { setStep(next); setAnimating(false); }, 220);
  };
  const canNext = () => (step === 0 ? !!uploadedImage : step === 1 ? !!selectedSize : step === 2 ? !!selectedPaper : true);

  const slide = animating
    ? (animDir === 'forward' ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8')
    : 'opacity-100 translate-x-0';

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh' }} className="text-white flex flex-col">

      {/* ── Step bar ── */}
      <div style={{ background: '#111', borderBottom: '1px solid #1e1e1e' }} className="sticky top-0 z-20 py-4">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <button onClick={() => i < step && goTo(i)} className={`flex items-center gap-2 ${i < step ? 'cursor-pointer' : 'cursor-default'}`}>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, transition: 'all 0.3s',
                    background: i === step ? PINK : 'transparent',
                    border: `2px solid ${i <= step ? PINK : '#2a2a2a'}`,
                    color: i === step ? '#fff' : i < step ? PINK : '#444',
                    boxShadow: i === step ? `0 0 16px ${PINK_GLOW}` : 'none',
                  }}>{i < step ? '✓' : i + 1}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: i === step ? PINK : i < step ? PINK : '#333',
                  }} className="hidden sm:inline">{s}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 2, margin: '0 8px', borderRadius: 2, background: i < step ? PINK : '#1e1e1e', transition: 'background 0.5s' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="flex-grow">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

            {/* LEFT */}
            <div className={`flex flex-col gap-6 order-2 lg:order-1 transition-all duration-200 ease-out ${slide}`}>

              {/* STEP 0 — Upload */}
              {step === 0 && (<>
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 1 }} className="text-5xl md:text-6xl font-bold mb-3">
                    CREATE YOUR<br />
                    <span style={{ color: PINK, textShadow: `0 0 40px ${PINK_GLOW}` }}>MASTERPIECE</span>
                  </h1>
                  <p style={{ color: '#555' }} className="text-base max-w-md mt-3">Turn your art, photos, or designs into premium gallery-quality wall posters.</p>
                </div>
                <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16 }} className="p-6">
                  <label
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: 16, height: 280, borderRadius: 12, cursor: 'pointer', position: 'relative',
                      border: dragging ? `2px dashed ${PINK}` : uploadedImage ? '2px dashed #1db954' : '2px dashed #2a2a2a',
                      background: dragging ? PINK_SOFT : uploadedImage ? 'rgba(29,185,84,0.05)' : 'transparent',
                      transition: 'all 0.3s',
                      boxShadow: dragging ? `0 0 30px ${PINK_GLOW}` : 'none',
                    }}
                  >
                    <input ref={fileInputRef} accept="image/*" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }} type="file" onChange={handleFileChange} />
                    {uploading ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%', padding: '0 32px' }}>
                        <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="material-symbols-outlined" style={{ color: PINK, fontSize: 28 }}>cloud_upload</span>
                        </div>
                        <p style={{ color: '#888', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }} className="truncate max-w-[220px]">{fileName}</p>
                        <div style={{ width: '100%', background: '#222', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                          <div style={{ width: `${uploadProgress}%`, height: '100%', background: `linear-gradient(90deg,${PINK_DARK},${PINK})`, borderRadius: 99, transition: 'width 0.15s', boxShadow: `0 0 10px ${PINK_GLOW}` }} />
                        </div>
                        <p style={{ color: '#444', fontSize: 12 }}>{uploadProgress}% uploaded</p>
                      </div>
                    ) : uploadedImage ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 40 }}>✅</span>
                        <p style={{ color: '#1db954', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em' }} className="truncate max-w-[220px]">{fileName}</p>
                        <p style={{ color: '#444', fontSize: 12 }}>Click to replace image</p>
                      </div>
                    ) : (
                      <>
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: dragging ? `0 0 20px ${PINK_GLOW}` : 'none', transition: 'all 0.3s' }}>
                          <span className="material-symbols-outlined" style={{ color: dragging ? PINK : '#333', fontSize: 30, transition: 'color 0.3s' }}>cloud_upload</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ fontWeight: 700, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.15em', color: dragging ? PINK : '#fff', marginBottom: 4, transition: 'color 0.3s' }}>
                            {dragging ? 'Drop it here! 🎯' : 'Drag & Drop Your Image'}
                          </p>
                          <p style={{ color: '#444', fontSize: 13 }}>or click to browse files</p>
                        </div>
                        <div style={{ display: 'flex', gap: 12, fontSize: 10, fontWeight: 700, color: '#2a2a2a', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                          <span>JPG</span><span>•</span><span>PNG</span><span>•</span><span>TIFF</span><span>•</span><span>Max 50MB</span>
                        </div>
                      </>
                    )}
                  </label>
                </div>
              </>)}

              {/* STEP 1 — Size */}
              {step === 1 && (<>
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 1 }} className="text-5xl md:text-6xl font-bold mb-3">
                    CHOOSE<br /><span style={{ color: PINK, textShadow: `0 0 40px ${PINK_GLOW}` }}>YOUR SIZE</span>
                  </h1>
                  <p style={{ color: '#555' }} className="text-base">Select the perfect size for your space.</p>
                </div>
                <div className="flex flex-col gap-3">
                  {SIZES.map((s) => {
                    const active = selectedSize?.label === s.label;
                    return (
                      <button key={s.label} onClick={() => setSelectedSize(s)} style={{
                        padding: '20px 24px', borderRadius: 14,
                        border: `2px solid ${active ? PINK : '#1e1e1e'}`,
                        background: active ? 'linear-gradient(135deg,#1a0810,#200d14)' : '#111',
                        boxShadow: active ? `0 0 30px ${PINK_GLOW}` : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        cursor: 'pointer', transition: 'all 0.25s', textAlign: 'left',
                        transform: active ? 'scale(1.01)' : 'scale(1)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: active ? PINK : '#fff' }}>{s.label}</span>
                          <div>
                            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: active ? '#ff85b0' : '#444' }}>{s.dims}</p>
                            <p style={{ fontSize: 13, marginTop: 3, color: active ? '#cc6688' : '#333' }}>{s.description}</p>
                          </div>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 20, color: active ? PINK : '#555' }}>₹{s.price}</span>
                      </button>
                    );
                  })}
                </div>
              </>)}

              {/* STEP 2 — Paper */}
              {step === 2 && (<>
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 1 }} className="text-5xl md:text-6xl font-bold mb-3">
                    PAPER<br /><span style={{ color: PINK, textShadow: `0 0 40px ${PINK_GLOW}` }}>FINISH</span>
                  </h1>
                  <p style={{ color: '#555' }} className="text-base">The finish defines how your poster feels and looks.</p>
                </div>
                <div className="flex flex-col gap-3">
                  {PAPERS.map((p) => {
                    const active = selectedPaper?.label === p.label;
                    return (
                      <button key={p.label} onClick={() => setSelectedPaper(p)} style={{
                        padding: '20px 24px', borderRadius: 14,
                        border: `2px solid ${active ? PINK : '#1e1e1e'}`,
                        background: active ? 'linear-gradient(135deg,#1a0810,#200d14)' : '#111',
                        boxShadow: active ? `0 0 30px ${PINK_GLOW}` : 'none',
                        cursor: 'pointer', transition: 'all 0.25s', textAlign: 'left',
                        transform: active ? 'scale(1.01)' : 'scale(1)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                            <span style={{ fontSize: 24 }}>{p.icon}</span>
                            <div>
                              <p style={{ fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.15em', color: active ? PINK : '#fff' }}>{p.label}</p>
                              <p style={{ fontSize: 11, color: active ? '#ff85b0' : '#444', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.finish}</p>
                              <p style={{ fontSize: 13, color: active ? '#cc6688' : '#333', marginTop: 6 }}>{p.description}</p>
                            </div>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: 13, color: active ? PINK : '#444', whiteSpace: 'nowrap' }}>
                            {p.extra === 0 ? 'Included' : `+₹${p.extra}`}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>)}

              {/* STEP 3 — Summary */}
              {step === 3 && (<>
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 1 }} className="text-5xl md:text-6xl font-bold mb-3">
                    YOUR<br /><span style={{ color: PINK, textShadow: `0 0 40px ${PINK_GLOW}` }}>ORDER</span>
                  </h1>
                  <p style={{ color: '#555' }} className="text-base">Looks amazing! Review before adding to cart.</p>
                </div>
                <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, overflow: 'hidden' }}>
                  {[
                    { label: 'Image', value: fileName || 'Custom Upload', icon: '🖼️' },
                    { label: 'Size', value: selectedSize ? `${selectedSize.label} — ${selectedSize.dims}` : '—', icon: '📐' },
                    { label: 'Paper', value: selectedPaper ? `${selectedPaper.label} (${selectedPaper.finish})` : '—', icon: '📄' },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', borderBottom: i < 2 ? '1px solid #1a1a1a' : 'none' }}>
                      <span style={{ fontSize: 20 }}>{row.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>{row.label}</p>
                        <p style={{ fontWeight: 700, color: '#fff', fontSize: 13, marginTop: 3 }}>{row.value}</p>
                      </div>
                      <button onClick={() => goTo(i)} style={{ fontSize: 11, color: PINK, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                    </div>
                  ))}
                  <div style={{ padding: '20px 24px', background: '#0d0d0d', borderTop: '1px solid #1a1a1a' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444', fontSize: 13, marginBottom: 6 }}>
                      <span>Base ({selectedSize?.label})</span><span>₹{selectedSize?.price}</span>
                    </div>
                    {selectedPaper?.extra > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444', fontSize: 13, marginBottom: 6 }}>
                        <span>{selectedPaper?.label} finish</span><span>+₹{selectedPaper?.extra}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1e1e1e', paddingTop: 16, marginTop: 12 }}>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 12, color: '#666' }}>Total</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: PINK, textShadow: `0 0 20px ${PINK_GLOW}` }}>₹{totalPrice}</span>
                    </div>
                  </div>
                </div>
                <button
                  style={{ width: '100%', height: 56, borderRadius: 14, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg,${PINK_DARK},${PINK})`, color: '#fff', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.2em', boxShadow: `0 8px 32px ${PINK_GLOW}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${PINK_GLOW}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 32px ${PINK_GLOW}`; }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>shopping_cart</span>
                  Add to Cart — ₹{totalPrice}
                </button>
              </>)}

              {/* Nav */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #1a1a1a', marginTop: 8 }}>
                <div>
                  <p style={{ fontSize: 10, color: '#333', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginBottom: 4 }}>{step === 3 ? 'Total' : 'Starting from'}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: PINK, textShadow: `0 0 20px ${PINK_GLOW}` }}>₹{totalPrice}</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {step > 0 && (
                    <button onClick={() => goTo(step - 1)} style={{ padding: '0 24px', height: 44, borderRadius: 10, border: '2px solid #2a2a2a', background: 'transparent', color: '#666', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#666'; }}>
                      ← Back
                    </button>
                  )}
                  {step < 3 && (
                    <button onClick={() => canNext() && goTo(step + 1)} disabled={!canNext()} style={{ padding: '0 28px', height: 44, borderRadius: 10, border: 'none', cursor: canNext() ? 'pointer' : 'not-allowed', background: canNext() ? `linear-gradient(135deg,${PINK_DARK},${PINK})` : '#1a1a1a', color: canNext() ? '#fff' : '#333', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', boxShadow: canNext() ? `0 4px 20px ${PINK_GLOW}` : 'none', transition: 'all 0.2s' }}>
                      {step === 0 ? 'Choose Size' : step === 1 ? 'Choose Paper' : 'Preview Order'} →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT — Preview */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-24">
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5', boxShadow: '0 0 80px rgba(0,0,0,0.9)' }}>
                  <img alt="Gallery wall" className="w-full h-full object-cover" style={{ filter: 'blur(2px) brightness(0.6)', transform: 'scale(1.05)' }} src={WALL_IMG} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${PINK_SOFT},rgba(0,0,0,0.5))` }} />

                  {/* Frame */}
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                    width: uploadedImage ? '58%' : '55%', aspectRatio: '3/4',
                    background: '#fff', border: '10px solid #fff',
                    boxShadow: uploadedImage ? `0 30px 80px rgba(0,0,0,0.8),0 0 40px ${PINK_GLOW}` : '0 20px 50px rgba(0,0,0,0.6)',
                    overflow: 'hidden', transition: 'all 0.7s ease',
                  }}>
                    {uploadedImage ? (
                      <img src={uploadedImage} alt="Your poster" style={{
                        width: '100%', height: '100%', objectFit: 'cover', transition: 'filter 0.5s',
                        filter: selectedPaper?.label === 'Glossy' ? 'brightness(1.1) contrast(1.05) saturate(1.1)' : selectedPaper?.label === 'Canvas' ? 'contrast(0.95) saturate(0.9)' : 'brightness(0.97)',
                      }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#2a2a2a' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 40, marginBottom: 8 }}>image</span>
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Your Image Preview</span>
                      </div>
                    )}
                    {selectedPaper?.label === 'Glossy' && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.2) 0%,transparent 60%)', pointerEvents: 'none' }} />}
                    {selectedPaper?.label === 'Canvas' && <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 0,transparent 4px),repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 0,transparent 4px)' }} />}
                  </div>

                  {/* Badges */}
                  <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', padding: '8px 14px', borderRadius: 8, border: `1px solid ${PINK}33` }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: PINK, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: PINK, display: 'inline-block', boxShadow: `0 0 8px ${PINK}`, animation: 'pulse 2s infinite' }} />
                      Live Preview
                    </span>
                  </div>
                  {selectedSize && (
                    <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: 8, border: '1px solid #2a2a2a' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{selectedSize.label} — {selectedSize.dims}</span>
                    </div>
                  )}
                  {selectedPaper && (
                    <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: 8, border: `1px solid ${PINK}44` }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: PINK, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{selectedPaper.icon} {selectedPaper.label}</span>
                    </div>
                  )}
                </div>
                <p style={{ textAlign: 'center', fontSize: 10, color: '#2a2a2a', marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Visual representation on a standard gallery wall
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}