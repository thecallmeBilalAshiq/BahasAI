import { ChatLayout } from '@/components/chat/chat-layout';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-background font-body antialiased">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-4xl h-[calc(100vh-10rem)]">
          <ChatLayout />
        </div>
      </main>
      <Footer />
    </div>
  );
}
