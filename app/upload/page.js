'use client';
import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Footer from '@/components/Footer';
import { subjects, semesters } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { storage, db, isFirebaseConfigured } from '@/lib/firebase';
import { FiUpload, FiCheck, FiFile, FiAlertCircle } from 'react-icons/fi';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const LOCAL_UPLOADS_KEY = 'studyhouse_uploads';
const LOCAL_DATAURL_LIMIT = 2 * 1024 * 1024; // inline files up to 2MB in localStorage

function saveLocalUpload(meta) {
  const list = JSON.parse(localStorage.getItem(LOCAL_UPLOADS_KEY) || '[]');
  list.unshift(meta);
  localStorage.setItem(LOCAL_UPLOADS_KEY, JSON.stringify(list));
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <UploadForm />
    </ProtectedRoute>
  );
}

function UploadForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ semester: '', subject: '', unit: '', description: '' });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const filteredSubjects = form.semester ? subjects.filter(s => s.semester === parseInt(form.semester)) : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!file || !form.subject || !form.semester) return;
    if (file.size > MAX_FILE_SIZE) {
      setError('File is too large. Maximum size is 10 MB.');
      return;
    }

    setUploading(true);

    const baseMeta = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      semester: parseInt(form.semester),
      subject: form.subject,
      unit: form.unit || '',
      description: form.description || '',
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadedAt: Date.now(),
      uploader: {
        uid: user?.uid || null,
        name: user?.name || '',
        email: user?.email || '',
      },
    };

    try {
      if (isFirebaseConfigured && storage && db) {
        // Real upload: Firebase Storage + Firestore metadata
        const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

        const safeName = file.name.replace(/[^\w.\-]/g, '_');
        const path = `uploads/${user?.uid || 'anon'}/${Date.now()}-${safeName}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        const fileURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'uploads'), {
          ...baseMeta,
          fileURL,
          storagePath: path,
          uploadedAt: serverTimestamp(),
        });
      } else {
        // Local fallback: keep metadata, inline small files as data URL
        let dataURL = null;
        if (file.size <= LOCAL_DATAURL_LIMIT) {
          dataURL = await fileToDataURL(file);
        }
        saveLocalUpload({ ...baseMeta, dataURL });
      }

      setUploading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('[StudyHouse] Upload failed:', err);
      setError(err?.message || 'Upload failed. Please try again.');
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
          <FiCheck size={28} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Uploaded Successfully!</h2>
        <p className="text-gray-500 dark:text-slate-400 mb-6">Your notes will be reviewed and made available soon.</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ semester: '', subject: '', unit: '', description: '' });
            setFile(null);
          }}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
          Upload More
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-lg mx-auto px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Upload Notes</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-8">Share your notes to help fellow students</p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
              <FiAlertCircle className="flex-shrink-0 mt-0.5" size={16} />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Semester</label>
            <select value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value, subject: '' })} required
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30">
              <option value="">Select semester</option>
              {semesters.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Subject</label>
            <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30">
              <option value="">Select subject</option>
              {filteredSubjects.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Unit / Topic</label>
            <input value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}
              placeholder="e.g., Unit 3 - Trees and Graphs"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">File (PDF, DOC, images — max 10MB)</label>
            <label className="flex items-center justify-center gap-3 px-4 py-6 bg-gray-50 dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" />
              {file ? (
                <>
                  <FiFile size={18} className="text-primary-600" />
                  <span className="text-sm text-gray-700 dark:text-slate-300">{file.name}</span>
                </>
              ) : (
                <>
                  <FiUpload size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-500">Click to choose a file</span>
                </>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Description (optional)</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3} placeholder="Brief description of the notes..."
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30 resize-none" />
          </div>

          <button type="submit" disabled={!file || !form.subject || uploading}
            className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
            {uploading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Uploading...</> : <><FiUpload size={16} /> Upload Notes</>}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
