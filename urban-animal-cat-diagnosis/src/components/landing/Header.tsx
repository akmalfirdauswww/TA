import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-background/80 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Urban Animal</span>
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          <Link href="#about" className="hover:text-primary">
            About
          </Link>
          <Link href="#services" className="hover:text-primary">
            Services
          </Link>
          <Link href="#contact" className="hover:text-primary">
            Contact
          </Link>
        </nav>
        <Button asChild>
          <Link href="/dashboard/diagnose">Get Diagnosis</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
