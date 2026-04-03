import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'
import { LogOut, User } from 'lucide-react'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }

  return (
    <div className='sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm'>
      <nav className='max-w-7xl mx-auto px-6 py-3 flex justify-between items-center'>

        {/* Logo */}
        <Link to='/' className='group'>
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="ResumeAI" className="h-10 w-auto" />
          </div>
        </Link>

        {/* Right Side */}
        <div className='flex items-center gap-4'>

          {/* Welcome Box */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="size-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Welcome back,</p>
              <p className="text-sm font-semibold text-slate-900 truncate max-w-[120px]">
                {user?.name || 'User'}
              </p>
            </div>
          </div>

          {/* Logout Button Only */}
          <button 
            onClick={logoutUser}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-50 to-white border border-red-300 text-red-700 font-medium rounded-xl hover:border-red-500 hover:shadow-md transition-all"
          >
            <LogOut className="size-4" />
            <span className="hidden md:inline">Logout</span>
          </button>

        </div>
      </nav>
    </div>
  )
}

export default Navbar
