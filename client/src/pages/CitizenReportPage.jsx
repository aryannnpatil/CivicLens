/**
 * CitizenReportPage — Liquid Glass Design
 *
 * Features:
 * ✅ Camera / file upload with live preview
 * ✅ Auto-detect GPS via navigator.geolocation
 * ✅ Click-to-reposition map pin
 * ✅ Description textarea (max 500 chars)
 * ✅ POST /api/tickets via Axios with loading state
 * ✅ Success / error feedback via react-hot-toast
 * ✅ Responsive — designed thumb-friendly at 375 px
 */
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import MapView from '../components/MapView';
import { submitTicket } from '../services/api';

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

function Icon({ name, className = '' }) {
    return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

function CitizenReportPage() {
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState('');
    const [coords, setCoords] = useState(null);
    const [locating, setLocating] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview); };
    }, [preview]);

    // --- Handlers ---
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > MAX_FILE_BYTES) {
            toast.error('Image too large. Max 5 MB.');
            return;
        }
        setPhoto(file);
        setPreview(URL.createObjectURL(file));
    };

    const clearPhoto = () => {
        setPhoto(null);
        setPreview(null);
    };

    const detectGPS = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation not supported by this browser.');
            return;
        }
        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            ({ coords: { longitude, latitude } }) => {
                setCoords({ lng: longitude, lat: latitude });
                setLocating(false);
                toast.success('Location detected!');
            },
            () => {
                setLocating(false);
                toast.error('Could not get location. Tap the map to pin manually.');
            },
            { timeout: 10000, maximumAge: 5000 },
        );
    };

    const handleMapClick = ({ lng, lat }) => setCoords({ lng, lat });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!photo)   return toast.error('Please select a photo first.');
        if (!coords)  return toast.error('Please set your location.');

        const fd = new FormData();
        fd.append('photo', photo);
        fd.append('description', description.trim());
        fd.append('longitude', String(coords.lng));
        fd.append('latitude', String(coords.lat));

        setSubmitting(true);
        try {
            await submitTicket(fd);
            toast.success('Issue reported! Thank you for helping your city.');
            clearPhoto();
            setDescription('');
            setCoords(null);
        } catch (err) {
            const msg = err.response?.data?.error ?? 'Submission failed. Please try again.';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const mapMarkers = coords
        ? [{ lng: coords.lng, lat: coords.lat, color: '#1337ec' }]
        : [];

    return (
        <div className="min-h-screen bg-[#f6f6f8] font-display text-slate-900 pb-24">

            {/* ── Floating Glass Header ── */}
            <header className="fixed top-4 left-4 right-4 z-40">
                <div className="glass rounded-xl px-4 py-3 flex items-center justify-center">
                    <h1 className="text-lg font-bold tracking-tight">Report a Civic Issue</h1>
                </div>
            </header>

            {/* ── Form ── */}
            <main className="pt-24 px-4 space-y-6 max-w-md mx-auto">

                {/* Photo Upload */}
                <section className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-600 px-1">
                        Visual Evidence
                    </label>

                    {preview ? (
                        <div className="relative rounded-xl overflow-hidden h-64">
                            <img
                                src={preview}
                                alt="Issue preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={clearPhoto}
                                className="absolute top-3 right-3 bg-black/50 hover:bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                                aria-label="Remove photo"
                            >
                                <Icon name="close" className="text-[20px]" />
                            </button>
                        </div>
                    ) : (
                        <label className="refractive-glass rounded-xl h-64 flex flex-col items-center justify-center border-dashed border-2 border-primary/20 group cursor-pointer transition-all active:scale-[0.98]">
                            <div className="bg-primary text-white rounded-full p-4 shadow-lg shadow-primary/30 mb-4 group-hover:scale-110 transition-transform relative z-10">
                                <Icon name="photo_camera" className="text-4xl" />
                            </div>
                            <p className="text-primary font-semibold relative z-10">Tap to capture or upload</p>
                            <p className="text-xs text-slate-500 mt-1 relative z-10">High-quality photos help faster resolution</p>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                capture="environment"
                                className="hidden"
                                onChange={handleFile}
                            />
                        </label>
                    )}
                </section>

                {/* Description */}
                <section className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-600 px-1">
                        Issue Description
                    </label>
                    <div className="glass rounded-xl p-1 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide details about the issue (e.g., broken streetlight, pothole, illegal dumping)..."
                            maxLength={500}
                            className="w-full bg-transparent border-none focus:ring-0 text-slate-900 p-3 min-h-[140px] placeholder:text-slate-400 text-base resize-none"
                        />
                        <div className="flex justify-end p-2">
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                                {description.length} / 500
                            </span>
                        </div>
                    </div>
                </section>

                {/* Location */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-sm font-semibold text-slate-600">
                            Incident Location
                        </label>
                        <button
                            type="button"
                            onClick={detectGPS}
                            disabled={locating}
                            className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-wider hover:underline disabled:opacity-60 transition-colors"
                        >
                            <Icon name="my_location" className="text-sm" />
                            {locating ? 'Detecting…' : 'Auto-detect GPS'}
                        </button>
                    </div>

                    <div className="relative rounded-xl overflow-hidden glass h-48 border border-slate-200">
                        <MapView
                            center={coords ? [coords.lng, coords.lat] : [78.9629, 20.5937]}
                            zoom={coords ? 14 : 4}
                            markers={mapMarkers}
                            onMapClick={handleMapClick}
                            interactive
                        />
                        {/* Location indicator overlay */}
                        {!coords && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="relative">
                                    <Icon name="location_on" className="text-primary text-4xl drop-shadow-md" />
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 blur-sm rounded-full" />
                                </div>
                            </div>
                        )}
                        {/* Address bar at bottom */}
                        <div className="absolute bottom-2 left-2 right-2">
                            <div className="glass px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2">
                                <Icon name="map" className="text-sm text-primary" />
                                <span className="truncate">
                                    {coords
                                        ? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)} — tap map to reposition`
                                        : 'Tap the map or use GPS to pin location'}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Shortcuts */}
                <section className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-600 px-1">
                        Common Categories
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {['Pothole', 'Lighting', 'Sanitation', 'Waterlogging', 'Other'].map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                    const prefix = cat + ': ';
                                    if (!description.startsWith(prefix)) {
                                        setDescription(prefix + description);
                                    }
                                }}
                                className="flex-none glass px-4 py-2 rounded-full text-xs font-semibold hover:bg-primary hover:text-white transition-all active:scale-95"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>
            </main>

            {/* ── Sticky Footer Button ── */}
            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#f6f6f8] via-[#f6f6f8]/90 to-transparent z-40">
                <div className="max-w-md mx-auto">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting || !photo || !coords}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <span>{submitting ? 'Submitting…' : 'Submit Report'}</span>
                        <Icon name={submitting ? 'hourglass_empty' : 'send'} />
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default CitizenReportPage;

