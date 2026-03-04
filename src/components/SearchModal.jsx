import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

export default function SearchModal({ isOpen, onClose }) {
    const { products } = useProducts();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.trim().length > 1 && products) {
            const filtered = (products || []).filter((p) =>
                p.title.toLowerCase().includes(query.toLowerCase()) ||
                (p.category || '').toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query, products]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-white animate-fade-in flex flex-col pt-20 px-6 md:px-20 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase tracking-tighter">Search</h2>
                    <button onClick={onClose} className="p-4 bg-[#f8f7f6] rounded-full hover:bg-gray-200 transition-colors">
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>

                <div className="relative mb-16">
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search by product, category, or style..."
                        className="w-full text-3xl md:text-5xl border-none border-b-2 border-black focus:ring-0 focus:border-black font-[family-name:var(--font-display)] placeholder:text-gray-200 outline-none pb-4"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <span className="absolute right-0 bottom-4 material-symbols-outlined text-4xl md:text-5xl text-gray-200">search</span>
                </div>

                {results.length > 0 ? (
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#80786b] mb-8">Suggestions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {results.slice(0, 4).map((p) => (
                                <div key={p.id} onClick={() => { navigate(`/product/${p.slug || p.id}`); onClose(); }} className="cursor-pointer group">
                                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-[#f8f7f6] mb-3">
                                        <img src={p.image || p.primaryImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <p className="font-bold text-xs uppercase tracking-tight">{p.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : query.trim().length > 1 ? (
                    <p className="text-xl text-gray-400">No results found for "{query}"</p>
                ) : (
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#80786b] mb-6">Popular Searches</h3>
                        <div className="flex flex-wrap gap-2 text-xs font-bold">
                            {['Anime', 'Formula 1', 'Minimalist', 'Retro', 'Cars'].map(tag => (
                                <button key={tag} onClick={() => setQuery(tag)} className="px-4 py-2 border border-gray-100 rounded-full hover:border-black transition-colors uppercase tracking-widest">{tag}</button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
