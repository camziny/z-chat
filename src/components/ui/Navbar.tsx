'use client';

import Link from 'next/link';
import { LogoImage } from './LogoImage';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  rightContent?: React.ReactNode;
}

export function Navbar({ rightContent }: NavbarProps) {
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';

  return (
    <header className="py-4 px-6 border-b border-zinc-800 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <LogoImage />
        <h1 className="text-xl font-bold">Z Chat</h1>
      </Link>
      
      <div className="flex items-center gap-4">
        {isAboutPage ? (
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm">
            Back to Chat
          </Link>
        ) : (
          <>
            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors text-sm">
              What is this app?
            </Link>
            {rightContent}
          </>
        )}
      </div>
    </header>
  );
} 