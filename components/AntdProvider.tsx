"use client";

import { ConfigProvider, theme } from "antd";
import { ThemeProvider, useTheme } from "next-themes";
import { StyleProvider } from "@ant-design/cssinjs";
import { useEffect, useState } from "react";

function AntdConfig({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          algorithm:
            resolvedTheme === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          token: {
            colorPrimary: "#ff000f",
            borderRadius: 999,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AntdConfig>{children}</AntdConfig>
    </ThemeProvider>
  );
}
