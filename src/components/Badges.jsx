const statusStyles = {
    "Not Dialed": "bg-gray-100 text-gray-600 border-gray-200",
    "Dialed": "bg-blue-50 text-blue-700 border-blue-200",
    "Converted": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Follow Up": "bg-amber-50 text-amber-700 border-amber-200",
    "Not Interested": "bg-red-50 text-red-600 border-red-200",
};

const qualityStyles = {
    Hot: "bg-red-50 text-red-600 border-red-200",
    Warm: "bg-orange-50 text-orange-600 border-orange-200",
    Cold: "bg-sky-50 text-sky-600 border-sky-200",
};

export function StatusBadge({ status }) {
    const style = statusStyles[status] || statusStyles["Not Dialed"];
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${style}`}>
            {status}
        </span>
    );
}

export function QualityBadge({ quality }) {
    if (!quality) {
        return (
            <span className="inline-flex items-center justify-center w-7 h-6 rounded-xl bg-gray-100 text-gray-400 text-sm font-extrabold">
                —
            </span>
        );
    }
    const style = qualityStyles[quality] || "";
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${style}`}>
            {quality}
        </span>
    );
}