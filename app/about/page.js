'use client';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { FiBookOpen, FiUsers, FiFileText, FiTarget } from 'react-icons/fi';

const team = [
  { name: 'Geeta Thakur', role: 'Developer', initials: 'GT', color: 'bg-primary-600' },
  { name: 'Adarsh Sahu', role: 'Developer', initials: 'AS', color: 'bg-green-600' },
  { name: 'Aakanksha Gendiya', role: 'Developer', initials: 'AG', color: 'bg-purple-600' },
];

const stats = [
  { value: '200+', label: 'Study Materials', icon: FiFileText },
  { value: '40+', label: 'Subjects', icon: FiBookOpen },
  { value: '500+', label: 'Students', icon: FiUsers },
];

export default function AboutPage() {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <Image src="/logo.png" alt="StudyHouse" width={64} height={64} className="mx-auto mb-4 rounded-xl" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">About StudyHouse</h1>
          <p className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            StudyHouse is a student-built academic resource platform for RGPV (Rajiv Gandhi Proudyogiki Vishwavidyalaya) engineering students. We provide free access to notes, previous year questions, video lectures, quizzes, and more.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 md:p-8 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <FiTarget size={20} className="text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            To democratize access to quality study materials for every RGPV engineering student. We believe that no student should struggle to find notes or past papers. By building this platform, we aim to create a community where students share knowledge and help each other succeed.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="text-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5">
              <s.icon size={24} className="text-primary-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {team.map((member, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}>
                  {member.initials}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who we are */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Who We Are</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
            We are CSE students at RGPV who experienced first-hand the difficulty of finding organized study materials. StudyHouse was born out of our desire to build something that genuinely helps students prepare for exams, learn concepts deeply, and stay on track with their coursework. This platform is built by students, for students.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
