"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);
  return (
    <header className="nav">
      <Link className="brand" href="/" aria-label="Grom Lab home">
        <span className="brand-mark"><img src="/grom-logo.png" alt="" /></span>
        <span>GROM-LAB</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#projects">Projects</Link>
        <Link href="/research/exploit-prediction">MSc research</Link>
        <Link href="/#about">About</Link>
      </nav>
      <button className="theme" type="button" onClick={() => setLight((value) => !value)} aria-label="Toggle colour theme">
        {light ? "DAY" : "NIGHT"}
      </button>
    </header>
  );
}
