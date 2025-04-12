import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Calendar,
  Users,
  LayoutDashboard,
  X,
  User,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Planning', icon: Calendar, path: '/planning' },
  { name: 'Liste des patients', icon: Users, path: '/patients' },
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
      <div className="h-full flex flex-col justify-between">

        {/* Top: Logo & Navigation */}
        <div>
          {/* Brand & Close */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold">M</span>
              </div>
              <span className="text-xl font-semibold text-blue-900">MedPortal</span>
            </div>
            <button onClick={toggleSidebar} className="md:hidden text-gray-600">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-2 py-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={toggleSidebar}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom: User Info + Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Dr. A. Karim</p>
              <p className="text-xs text-gray-500">Administrateur</p>
            </div>
          </div>
          <div className="flex gap-2">
           
            <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 w-full">
              <LogOut className="w-4 h-4" />
              <span>Deconnexion</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}