import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="max-w-xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-stone-900 sm:text-6xl">Page not found</h1>
        <p className="mt-5 text-base text-stone-600">The page you are looking for does not exist or has moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-stone-50">
          Return home
        </Link>
      </div>
    </Container>
  );
}
