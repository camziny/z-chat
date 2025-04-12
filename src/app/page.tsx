import { ChatContainer } from '@/components/chat/ChatContainer';
import { Navbar } from '@/components/ui/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        <ChatContainer />
      </main>
    </div>
  );
}
