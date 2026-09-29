import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-200">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <p className="text-2xl font-semibold tracking-[-0.06em] text-white">EM Move Logistics</p>
          <p className="mt-4 text-base text-stone-300">Nigeria ↔ United Kingdom ↔ Europe</p>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">Navigation</p>
          <ul className="mt-4 space-y-3 text-sm text-stone-300">
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/track" className="hover:text-white">Track shipment</Link></li>
            <li><Link href="/quote" className="hover:text-white">Request a quote</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">Services</p>
          <ul className="mt-4 space-y-3 text-sm text-stone-300">
            <li><Link href="/services/air-freight" className="hover:text-white">Air Freight</Link></li>
            <li><Link href="/services/sea-freight" className="hover:text-white">Sea Freight</Link></li>
            <li><Link href="/services/uk-to-nigeria" className="hover:text-white">UK → Nigeria</Link></li>
            <li><Link href="/services/nigeria-to-uk" className="hover:text-white">Nigeria → UK</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-stone-300">
            <li>Email</li>
            <li><a href="mailto:info@emmovelogistics.com" className="hover:text-white">info@emmovelogistics.com</a></li>
            <li>Phone</li>
            <li><a href="tel:+447944036116" className="hover:text-white">+44 7944 036 116</a></li>
          </ul>
        </div>

        <div className="md:col-span-4 border-t border-stone-800 pt-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">Customer policies</p>
          <nav aria-label="Customer policies" className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-stone-300">
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/refunds" className="hover:text-white">Refund &amp; Cancellation</Link>
            <Link href="/shipping-policy" className="hover:text-white">Shipping &amp; Tracking</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
