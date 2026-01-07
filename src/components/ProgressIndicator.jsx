import React from 'react'

const ProgressIndicator = () => {
    return (
        <div className="w-full bg-gray-200 h-1 mb-6 overflow-hidden">
            <div className="bg-blue-600 h-1 w-full animate-[slide_1s_ease-in-out_infinite] origin-left">
                <style>{`
             @keyframes slide {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
             }
          `}</style>
            </div>
        </div>
    )
}

export default ProgressIndicator