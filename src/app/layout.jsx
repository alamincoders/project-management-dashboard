import { SidebarProvider } from "@/context/SidebarProvider";
import DashboardLayout from "@/layout/DashboardLayout";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Inter } from "next/font/google";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Management Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AntdRegistry>
            <SidebarProvider>
              <DashboardLayout>{children}</DashboardLayout>
            </SidebarProvider>
          </AntdRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
