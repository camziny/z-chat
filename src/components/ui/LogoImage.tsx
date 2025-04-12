'use client';

interface LogoImageProps {
  className?: string;
}

export function LogoImage({ className = "h-8 w-8" }: LogoImageProps) {
  return (
    <img 
      src="/z-chat.png" 
      alt="Z Chat" 
      className={className}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  );
} 