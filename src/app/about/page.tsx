import { Navbar } from '@/components/ui/Navbar';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <Navbar />
      
      <main className="flex-1 container mx-auto py-16 px-4 max-w-2xl flex items-center justify-center">
        <div className="bg-zinc-900/70 border border-zinc-800 p-10 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="mb-8">
            <p className="text-zinc-300 text-lg leading-relaxed mb-8 text-center">
              Just practicing this stuff:
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                  <span>Fine-tuning</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                  <span>RAG</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                  <span>Prompt engineering</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                  <span>Vector databases</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                  <span>Agents</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                  <span>NLP</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                  <span>Multimodal</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                  <span>Custom model training</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title: 'About - Z Chat',
  description: 'An experimental LLM project',
}; 