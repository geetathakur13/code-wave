'use client';
import { useState } from 'react';
import Footer from '@/components/Footer';
import { FiMail, FiCheck, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // In production, save to Firestore `contacts` collection
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-8">Have a question, feedback, or suggestion? We&apos;d love to hear from you.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Cards */}
          <div className="space-y-4 md:col-span-1">
            <a href="mailto:geetathakurr13@gmail.com"
              className="block bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-3">
                <FiMail size={18} className="text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Email</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 break-all">geetathakurr13@gmail.com</p>
            </a>

            <a href="https://wa.me/919584452490" target="_blank" rel="noopener noreferrer"
              className="block bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 hover:border-green-300 dark:hover:border-green-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-3">
                <FaWhatsapp size={18} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">WhatsApp</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">+91 95844 52490</p>
            </a>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                  <FiCheck size={28} className="text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">We&apos;ll get back to you as soon as possible.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="text-primary-600 hover:underline text-sm font-medium">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Subject</label>
                  <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={4}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30 resize-none" />
                </div>
                <button type="submit" disabled={sending}
                  className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                  {sending ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiSend size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
