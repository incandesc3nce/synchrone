import { CodeSection } from '@/components/editor/';

export default function EditorPage() {
  return (
    <div className="grid items-center justify-items-center min-h-screen pt-8 pl-8 pb-20 gap-16 font-[family-name:var(--font-raleway-sans)]">
      <main className="size-full flex flex-col gap-4 items-center">
        <CodeSection />
      </main>
    </div>
  );
}
