export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm px-8 py-12 bg-white rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
}
