/**
 * CitizenReportPage — TODO: Member 1
 *
 * Features to build:
 * - Camera / file upload for issue photo
 * - Auto-detect GPS via navigator.geolocation
 * - Description textarea
 * - Submit button → POST /api/tickets
 * - Success / error feedback (react-hot-toast)
 * - Map showing pin of selected location
 */

function CitizenReportPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">📸 Report a Civic Issue</h1>
                <p className="text-gray-500">Member 1 — Build the citizen report form here.</p>
            </div>
        </div>
    );
}

export default CitizenReportPage;
