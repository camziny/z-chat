'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text border-t border-zinc-800 bg-black py-2 px-2 md:px-2">
      <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center">
        <div className="mb-4 sm:mb-0">
          <p className="text-zinc-400 text-xs">
            © {currentYear} Z Chat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 