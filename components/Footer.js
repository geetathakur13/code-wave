'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.png" alt="StudyHouse" width={32} height={32} className="rounded-lg" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">StudyHouse</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
              Your One-Stop Resource Destination for RGPV engineering students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Resources</h4>
            <div className="space-y-2">
              {[{ name: 'Semesters', href: '/semesters' }, { name: 'PYQ', href: '/pyq' }, { name: 'Videos', href: '/videos' }, { name: 'Quiz', href: '/quiz' }].map(l => (
                <Link key={l.href} href={l.href} className="block text-sm text-gray-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{l.name}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Platform</h4>
            <div className="space-y-2">
              {[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Syllabus', href: '/syllabus' }, { name: 'About Us', href: '/about' }, { name: 'Contact', href: '/contact' }].map(l => (
                <Link key={l.href} href={l.href} className="block text-sm text-gray-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{l.name}</Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Connect</h4>
            <div className="space-y-2">
              <a href="https://wa.me/919584452490" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-green-600 transition-colors">
                <FaWhatsapp size={16} /> WhatsApp
              </a>
              <a href="mailto:geetathakurr13@gmail.com" className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-primary-600 transition-colors">
                <MdOutlineMailOutline size={16} /> Email Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400 dark:text-slate-500">© 2025 StudyHouse | All rights reserved</p>
          <p className="text-xs text-gray-400 dark:text-slate-500">Made with ❤️ by Geeta, Adarsh & Aakanksha</p>
        </div>
      </div>
    </footer>
  );
}
