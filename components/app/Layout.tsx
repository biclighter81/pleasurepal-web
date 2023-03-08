import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-light-dark h-screen">
      <Header />
      {children}
    </div>
  );
}
