const About = () => {
  return (
    <section id="about" className="bg-secondary py-20">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Urban Animal</h2>
          <p className="text-muted-foreground">
            Urban Animal is dedicated to providing the highest level of veterinary medicine along with friendly, compassionate service. We believe in treating every patient as if they were our own pet, and we are honored to be a partner in your pet's healthcare.
          </p>
          <p className="text-muted-foreground">
            Our team of experienced veterinarians and staff are committed to providing comprehensive care for your pets. From wellness exams and vaccines to advanced diagnostics and complex surgical procedures, your pet will receive high-quality care at our hospital.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src="/placeholder.svg" alt="A happy pet" className="rounded-lg" style={{ aspectRatio: '500/500', objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  );
};

export default About;
