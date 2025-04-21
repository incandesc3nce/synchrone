import { Header } from '@/components/common';
import { FeaturesSection, HeroSection, QuestionsSection } from '@/components/landing';

export default function HomePage() {
  return (
    <div className="font-raleway">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen gap-16 mb-12">
        <main className="flex flex-col gap-8 items-center justify-center">
          <HeroSection />
          <FeaturesSection />
          <QuestionsSection />
        </main>
      </div>
      <footer className="flex flex-col items-center justify-center gap-4 py-8 bg-neutral-900 text-gray-100">
        <p>&copy; 2025 Synchrone. All rights reserved.</p>
      </footer>
    </div>
  );
}
