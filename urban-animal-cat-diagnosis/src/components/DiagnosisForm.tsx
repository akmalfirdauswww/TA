'use client';

import { useState } from 'react';

interface Diagnosis {
  disease: string;
  description: string;
  recommendation: string;
}

export default function DiagnosisForm() {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setDiagnosis(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error('Failed to get diagnosis. Please try again.');
      }

      const data: Diagnosis = await response.json();
      setDiagnosis(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Cat Disease Diagnosis</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">Enter Symptoms</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g., sneezing, coughing, loss of appetite"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-400 transition-colors duration-200"
        >
          {isLoading ? 'Diagnosing...' : 'Get Diagnosis'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {diagnosis && (
        <div className="mt-6 p-6 border border-gray-200 rounded-md bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">Diagnosis Result</h2>
          <div>
            <h3 className="text-lg font-bold">Disease:</h3>
            <p className="mb-3">{diagnosis.disease}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Description:</h3>
            <p className="mb-3">{diagnosis.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Recommendation:</h3>
            <p>{diagnosis.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
