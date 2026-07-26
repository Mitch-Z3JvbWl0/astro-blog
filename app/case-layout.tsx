import Link from "next/link";
import { Header } from "./site-header";

export function CaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <Header />
      <main>{children}</main>
      <section className="next shell">
        <p className="eyebrow">Back to the lab book</p>
        <Link className="button" href="/#projects">Back to all projects →</Link>
      </section>
      <footer><div className="shell"><span>© 2026 Mitch Hart</span><span>Made in Bristol · Powered by tea and threat models</span></div></footer>
    </div>
  );
}
