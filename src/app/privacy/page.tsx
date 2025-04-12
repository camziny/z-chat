import { Navbar } from '@/components/ui/Navbar';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 container mx-auto py-16 px-4 max-w-3xl">
        <div className="bg-zinc-900/70 border border-zinc-800 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-zinc-700">Privacy Policy</h1>
          
          <div className="space-y-6 text-zinc-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Overview</h2>
              <p className="mb-4">
                Z Chat is an experimental project for learning purposes. This privacy policy describes how we collect, use, and handle your information when you use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Information Collection</h2>
              <p className="mb-4">
                When you use Z Chat, we may collect and store your messages to provide and improve the service. We temporarily store the chat history in your browser&apos;s local storage for functionality purposes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Use of Information</h2>
              <p className="mb-4">
                The information collected is used solely to provide the chat service. We may use anonymized and aggregated data to improve our models and services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Data Storage</h2>
              <p className="mb-4">
                Chat history is stored in your browser&apos;s local storage and is not transmitted to our servers except when processing your current request.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title: 'Privacy Policy - Z Chat',
  description: 'Privacy policy for Z Chat',
}; 