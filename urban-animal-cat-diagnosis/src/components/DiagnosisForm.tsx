'use client';

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DiagnosisSkeleton from './DiagnosisSkeleton';
import { useAppContext } from '@/context/AppContext';

interface Diagnosis {
  disease: string;
  description: string;
  recommendation: string;
}

export default function DiagnosisForm() {
  const { userName, diagnosisResult, setDiagnosisResult } = useAppContext();
  const [symptoms, setSymptoms] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setDiagnosisResult(null);

    try {
      const formData = new FormData();
      formData.append('symptoms', symptoms);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch('/api/diagnose', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get diagnosis. Please try again.');
      }

      const data: Diagnosis = await response.json();
      setDiagnosisResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareToWhatsApp = () => {
    if (!diagnosisResult) return;

    const message = `
Hello ${userName || 'there'},

Here is the diagnosis result for your cat:

*Disease:*
${diagnosisResult.disease}

*Description:*
${diagnosisResult.description}

*Recommendation:*
${diagnosisResult.recommendation}

Please consult with a veterinarian for further advice.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">AI-Powered Diagnosis</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {userName ? `Hello, ${userName}! ` : ''}Enter your cat's symptoms and optionally upload an image for a comprehensive AI-powered diagnosis.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Diagnosis Form</CardTitle>
          <CardDescription className="text-center">
            Provide detailed information about your cat's condition for the most accurate results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="symptoms" className="text-base font-medium">
                Symptoms
              </Label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., sneezing, coughing, loss of appetite, lethargy, fever..."
                required
                rows={5}
                className="text-base"
              />
              <p className="text-sm text-muted-foreground">
                Please describe all symptoms you've observed in your cat
              </p>
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="image" className="text-base font-medium">
                Image (Optional)
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  className="cursor-pointer"
                />
                {image && (
                  <span className="text-sm text-muted-foreground">
                    Selected: {image.name}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Upload a photo of your cat or the affected area to help with diagnosis
              </p>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full h-12 text-base">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Get AI Diagnosis'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && <DiagnosisSkeleton />}

      {error && (
        <Card className="mt-8 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {diagnosisResult && (
        <Card className="mt-8 border-2 border-primary/20 shadow-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl">Diagnosis Result</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-l-blue-500">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2 uppercase tracking-wide">
                Detected Condition
              </h3>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                {diagnosisResult.disease}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded"></span>
                Description
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {diagnosisResult.description}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded"></span>
                Recommendations
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {diagnosisResult.recommendation}
              </p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-900 dark:text-amber-100">
                <strong>Important:</strong> This is a preliminary AI-powered diagnosis. Please consult with a licensed veterinarian for professional medical advice and treatment.
              </p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30">
            <Button onClick={handleShareToWhatsApp} className="w-full" size="lg">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Share to WhatsApp
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
