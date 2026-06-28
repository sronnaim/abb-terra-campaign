"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: "en" | "id") => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    const newPath = pathname.replace(/^\/(en|id)(?=\/|$)/, `/${locale}`);

    router.push(newPath);
  };

  return (
    <div className="absolute flex items-center gap-2">
      <Button onClick={() => switchLanguage("id")}>🇮🇩</Button>

      <Button onClick={() => switchLanguage("en")}>🇺🇸</Button>

      <ModeToggle />
    </div>
  );
}
