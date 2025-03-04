import { Header } from '@/components/common';
import { FeaturesSection, HeroSection } from '@/components/landing';

export default function HomePage() {
  return (
    <div className="font-raleway">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen gap-16">
        <main className="flex flex-col gap-8 items-center justify-center">
          <HeroSection />
          <FeaturesSection />
        </main>
      </div>
    </div>
  );
}
