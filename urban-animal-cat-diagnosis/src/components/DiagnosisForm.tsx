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
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Cat Disease Diagnosis</CardTitle>
          <CardDescription className="text-center">Enter your cat's symptoms and optionally upload an image for a more accurate diagnosis.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., sneezing, coughing, loss of appetite"
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="image">Image (Optional)</Label>
              <Input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Diagnosing...' : 'Get Diagnosis'}
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
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Diagnosis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground">Disease</h3>
              <p className="text-xl font-bold">{diagnosisResult.disease}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground">Description</h3>
              <p>{diagnosisResult.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground">Recommendation</h3>
              <p>{diagnosisResult.recommendation}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleShareToWhatsApp}>Share to WhatsApp</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
