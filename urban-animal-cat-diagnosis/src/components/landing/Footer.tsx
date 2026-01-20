const Footer = () => {
  return (
    <footer className="bg-card py-6">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Urban Animal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
