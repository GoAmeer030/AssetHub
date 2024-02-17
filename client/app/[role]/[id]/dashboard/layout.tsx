import { BackgroundBeams } from '@/components/ui/background-beams';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      {children}

      <BackgroundBeams />
    </div>
  );
}
