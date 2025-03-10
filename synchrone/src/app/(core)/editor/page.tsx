import { CodeSection } from '@/components/editor/';

export default function EditorPage() {
  return (
    <div className="grid justify-items-center min-h-screen pt-8 font-sans">
      <main className="size-full flex flex-col gap-4 items-center">
        <CodeSection />
      </main>
    </div>
  );
}
