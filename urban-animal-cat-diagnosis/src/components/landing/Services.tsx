import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint, Stethoscope, Syringe } from 'lucide-react';

const services = [
  {
    icon: <Stethoscope className="h-10 w-10 text-primary" />,
    title: 'AI-Powered Diagnostics',
    description: 'Our advanced AI tool helps you get a preliminary diagnosis for your cat based on symptoms and images.',
  },
  {
    icon: <PawPrint className="h-10 w-10 text-primary" />,
    title: 'Wellness Exams',
    description: 'Comprehensive check-ups to ensure your pet is healthy and to catch any potential issues early.',
  },
  {
    icon: <Syringe className="h-10 w-10 text-primary" />,
    title: 'Vaccinations',
    description: 'Protect your pet from common diseases with our recommended vaccination schedules.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We offer a wide range of services to keep your pets healthy and happy.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <CardHeader className="items-center">
                {service.icon}
                <CardTitle className="mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
