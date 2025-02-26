import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-raleway-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl">synchrone</h1>
        <p className="text-lg">Your tool for code editing with others</p>
        <Link href="/editor" className="bg-neutral-900 py-2 px-4 rounded-xl font-medium">
        Go to editor
        </Link>
      </main>
    </div>
  );
}