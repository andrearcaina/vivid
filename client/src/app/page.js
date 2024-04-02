'use client';
import { useDarkMode } from '@/hooks/useDarkModeContext';

export default function Home() {
  const { darkMode } = useDarkMode();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="h-[80vh] dark:bg-gray-900">
        <h3 className="dark:text-neutral-300">hello world this is the home page</h3>
      </main>
    </div>
  );
}
