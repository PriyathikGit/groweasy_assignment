import { useState } from "react";
import { ChevronDown, X, Calendar, RotateCcw, RefreshCcw } from "lucide-react";

const dateRanges = ["Today", "Last 7 Days", "Last 30 Days", "Last 2 Months"];

const statusOptions = ["Not Dialed", "Dialed", "Converted", "Follow Up", "Not Interested"];
const qualityOptions = ["Hot", "Warm", "Cold"];
const sourceOptions = ["Facebook", "Instagram", "Google", "Organic", "Referral"];
const ownerOptions = ["Me", "Team Member 1", "Team Member 2"];
const dateOptions = ["Today", "Last 7 Days", "Last 30 Days", "Last 2 Months"]

function DropdownFilter({ label, options }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);

    const toggle = (opt) => {
        setSelected((prev) =>
            prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt]
        );
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-100 rounded-2xl bg-white hover:bg-gray-50  font-bold transition-colors "
            >
                {label}
                {selected.length > 0 && (
                    <span className="bg-emerald-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                        {selected.length}
                    </span>
                )}
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute top-full mt-1 left-0 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-40">
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => toggle(opt)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                            >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${selected.includes(opt) ? "bg-emerald-600 border-emerald-600" : "border-gray-300"}`}>
                                    {selected.includes(opt) && (
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                                {opt}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function FiltersBar({ activeFilter, onFilterChange, activeTags, onRemoveTag }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
            {/* Filter row */}
            <div className="flex items-center gap-2 flex-wrap">
                <DropdownFilter label="Status" options={statusOptions} />
                <DropdownFilter label="Quality" options={qualityOptions} />
                <DropdownFilter label="Source" options={sourceOptions} />
                <DropdownFilter label="Owner" options={ownerOptions} />
                <div className="md:ml-auto border border-slate-200 rounded-xl px-2 py-1">
                    <button className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-700">
                        <RefreshCcw size={13} />
                        Clear All
                    </button>
                </div>
            </div>

            {/* Date range */}
            <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1 font-semibold">Created Date Range</p>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-1 py-1.5 text-sm  w-full md:w-100 justify-between">
                        <div className="flex items-center gap-3">
                            <Calendar size={13} className="text-gray-400" />
                            <span className="text-xs font-medium">19 Apr 2026 – 18 May 2026</span>
                        </div>
                        <button className="ml-1 text-white  bg-emerald-800 rounded-xl p-1">
                            <X size={8} />
                        </button>
                    </div>
                </div>

                {/* Quick date pills */}
                <div className="flex items-center gap-2 mt-2">
                    {dateOptions.map((range) => (
                        <button
                            key={range}
                            onClick={() => onFilterChange(range)}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors font-bold ${activeFilter === range
                                ? "border-emerald-500  text-emerald-800 bg-emerald-50"
                                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            {range}
                        </button>
                    ))}

                </div>
            </div>

            <div className="flex flex-col mt-4 gap-2">
                <button className="text-xs text-gray-500 hover:text-gray-600 flex items-center gap-1 border border-slate-200 w-fit py-1 px-2 rounded-xl">
                    <X size={11} />
                    Clear Date
                </button>
                {/* Active tags */}
                {activeTags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                        {activeTags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium"
                            >
                                {tag}
                                <button
                                    onClick={() => onRemoveTag(tag)}
                                    className="hover:text-emerald-900 ml-0.5"
                                >
                                    <X size={11} />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}