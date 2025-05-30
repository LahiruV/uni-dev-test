import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Heart } from 'lucide-react'

export function AuthFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-white mt-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-2">
                        <GraduationCap className="h-6 w-6 text-yellow-500" />
                        <span className="text-xl font-bold text-gray-900">Deakin University</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                        <Link to="/login" className="hover:text-yellow-500">Student Login</Link>
                        <Link to="/register" className="hover:text-yellow-500">Student Registration</Link>
                        <Link to="/admin/login" className="hover:text-yellow-500">Admin Login</Link>
                        <Link to="/admin/register" className="hover:text-yellow-500">Admin Registration</Link>
                    </div>

                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <span>Made with</span>
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>at Deakin</span>
                    </div>

                    <p className="text-sm text-gray-600">
                        © {currentYear} Deakin University. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}