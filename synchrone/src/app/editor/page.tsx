import { CodeArea } from "@/components/common/CodeArea";

export default function EditorPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16  font-[family-name:var(--font-raleway-sans)]">
      <main className="row-start-2 size-full flex flex-col gap-4 items-center">
        <CodeArea />
      </main>
    </div>
  );
}
