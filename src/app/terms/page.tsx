import { Navbar } from '@/components/ui/Navbar';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 container mx-auto py-16 px-4 max-w-3xl">
        <div className="bg-zinc-900/70 border border-zinc-800 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-zinc-700">Terms of Service</h1>
          
          <div className="space-y-6 text-zinc-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. Introduction</h2>
              <p className="mb-4">
                These Terms of Service govern your use of Z Chat, an experimental project for learning purposes.
                By accessing or using our service, you agree to be bound by these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. Use of Service</h2>
              <p className="mb-4">
                Z Chat is provided for educational and entertainment purposes only. The service does not guarantee accuracy or availability and may be modified at any time without notice.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. User Responsibilities</h2>
              <p className="mb-4">
                You agree to use Z Chat in compliance with applicable laws and these Terms. You are responsible for all content that you submit through the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. Intellectual Property</h2>
              <p className="mb-4">
                All content, features, and functionality of Z Chat are owned by the creator and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. Limitation of Liability</h2>
              <p className="mb-4">
                Z Chat is provided &quot;as is&quot; without any warranties. The creator is not liable for any damages arising from your use of the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Your continued use of Z Chat after such changes constitutes your acceptance of the new Terms.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title: 'Terms of Service - Z Chat',
  description: 'Terms of service for Z Chat',
}; 