"use client";

import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Layout, Space, Typography, Button, theme } from "antd";
const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
  const router = useRouter();
  const { Header } = Layout;
  const pathname = usePathname();
  const { token } = theme.useToken();

  const switchLanguage = (locale: "en" | "id") => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    const newPath = pathname.replace(/^\/(en|id)(?=\/|$)/, `/${locale}`);

    router.push(newPath);
  };

  return (
    <AntHeader
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: token.colorBgBase,
      }}
    >
      <Space>
        <Button onClick={() => switchLanguage("id")}>ID</Button>

        <Button onClick={() => switchLanguage("en")}>EN</Button>

        <ThemeToggle />
      </Space>
    </AntHeader>
  );
}
