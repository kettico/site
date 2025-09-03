import NavBar from "@/components/Navbar/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <NavBar />
        <div>
            {children}
        </div>
    </div>
  );
}
