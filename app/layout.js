import './globals.css';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'StudyHouse — Your One-Stop Resource Destination',
  description: 'Access notes, PYQs, video lectures, quizzes & more for RGPV engineering students.',
  openGraph: {
    title: 'StudyHouse — Your One-Stop Resource Destination',
    description: 'Access notes, PYQs, video lectures, quizzes & more for RGPV engineering students.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
