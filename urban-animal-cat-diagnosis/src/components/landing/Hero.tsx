import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Compassionate Care for Your Urban Companion
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Providing expert veterinary services and AI-powered diagnostics to keep your pets healthy and happy in the city.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button asChild size="lg">
            <Link href="/dashboard/diagnose">Get a Diagnosis</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
