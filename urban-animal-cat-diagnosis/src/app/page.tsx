import DiagnosisForm from '@/components/DiagnosisForm';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm">
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Urban Animal Cat Diagnosis</h1>
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center p-4 sm:p-6 md:p-8">
        <DiagnosisForm />
      </main>
    </div>
  );
}
