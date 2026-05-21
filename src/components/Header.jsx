import React from 'react'
import { Menu } from 'lucide-react'

const Header = ({ isMobileOpen, setIsMobileOpen }) => {
    return (
        <div className="bg-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu size={24} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="md:text-2xl font-bold text-gray-900">Manage Your Leads</h1>
                    <p className="text-[10px] md:text-sm font-semibold text-gray-500 mt-0.5">
                        Monitor lead status, assign tasks, and close deals faster.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header