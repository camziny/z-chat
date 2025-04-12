import { ChatContainer } from '@/components/chat/ChatContainer';
import { Navbar } from '@/components/ui/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        <ChatContainer />
      </main>
      
      <footer className="py-2 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Z Chat. All rights reserved.</p>
      </footer>
    </div>
  );
}
