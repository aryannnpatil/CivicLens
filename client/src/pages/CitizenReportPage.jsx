/**
 * CitizenReportPage — Member 1 (Phase 1 + Phase 2)
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

function CitizenReportPage() {
    const [photo, setPhoto] = useState(null);       // File object
    const [preview, setPreview] = useState(null);   // Object URL for <img>
    const [description, setDescription] = useState('');
    const [coords, setCoords] = useState(null);     // { lng, lat }
    const [locating, setLocating] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Clean up object URL on unmount / photo change to prevent memory leaks
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
                toast.success('📍 Location detected!');
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
            toast.success('✅ Issue reported! Thank you for helping your city.');
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
        ? [{ lng: coords.lng, lat: coords.lat, color: '#2563eb' }]
        : [];

    // --- Render ---
    return (
        <div className="min-h-screen bg-gray-50">
            {/* ── Header ── */}
            <div className="bg-white border-b border-gray-200 px-4 py-4 pt-16 sticky top-0 z-10 shadow-sm">
                <h1 className="text-lg font-bold text-gray-900">📸 Report a Civic Issue</h1>
                <p className="text-xs text-gray-400 mt-0.5">
                    Snap a photo · Pin location · Hit Submit
                </p>
            </div>

            {/* ── Form ── */}
            <div className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-24">

                {/* Photo Upload */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                        📷 Photo <span className="text-red-500">*</span>
                    </p>

                    {preview ? (
                        <div className="relative">
                            <img
                                src={preview}
                                alt="Issue preview"
                                className="w-full h-52 object-cover rounded-xl"
                            />
                            <button
                                type="button"
                                onClick={clearPhoto}
                                className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors"
                                aria-label="Remove photo"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary-400 hover:bg-blue-50/30 transition-all">
                            <span className="text-4xl mb-2">📷</span>
                            <span className="text-sm font-medium text-gray-600">
                                Take photo or upload
                            </span>
                            <span className="text-xs text-gray-400 mt-1">JPEG / PNG · max 5 MB</span>
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
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <label
                        htmlFor="desc"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        📝 Description
                    </label>
                    <textarea
                        id="desc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Large pothole near Main St & 5th Ave intersection…"
                        rows={3}
                        maxLength={500}
                        className="w-full text-sm text-gray-700 border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-400 text-right mt-1">
                        {description.length}/500
                    </p>
                </section>

                {/* Location */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-gray-700">
                            📍 Location <span className="text-red-500">*</span>
                        </p>
                        <button
                            type="button"
                            onClick={detectGPS}
                            disabled={locating}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-60 transition-colors"
                        >
                            {locating ? (
                                <>
                                    <span className="animate-spin inline-block">⟳</span>
                                    Detecting…
                                </>
                            ) : (
                                '🎯 Auto-detect GPS'
                            )}
                        </button>
                    </div>

                    <div className="h-52 rounded-xl overflow-hidden border border-gray-200">
                        <MapView
                            center={coords ? [coords.lng, coords.lat] : [78.9629, 20.5937]}
                            zoom={coords ? 14 : 4}
                            markers={mapMarkers}
                            onMapClick={handleMapClick}
                            interactive
                        />
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                        {coords
                            ? `📍 ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)} — tap map to reposition`
                            : 'Use GPS button or tap the map to pin your location'}
                    </p>
                </section>

                {/* Submit */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting || !photo || !coords}
                    className="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm text-base"
                >
                    {submitting ? '⏳ Submitting…' : '🚀 Submit Report'}
                </button>
            </div>
        </div>
    );
}

export default CitizenReportPage;

