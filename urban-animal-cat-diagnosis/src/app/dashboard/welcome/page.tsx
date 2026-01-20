'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import { Heart, ArrowRight } from 'lucide-react';

export default function WelcomePage() {
  const { userName, setUserName } = useAppContext();
  const [localName, setLocalName] = useState(userName || '');
  const router = useRouter();

  useEffect(() => {
    // If name already exists, redirect to diagnose page
    if (userName) {
      router.push('/dashboard/diagnose');
    }
  }, [userName, router]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && localName.trim()) {
      handleContinue();
    }
  };

  const handleContinue = () => {
    if (localName.trim()) {
      setUserName(localName.trim());
      router.push('/dashboard/diagnose');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Welcome to Urban Animal
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your trusted companion for keeping your feline friend healthy and happy
        </p>
      </div>

      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">Let's Get Started</CardTitle>
          <CardDescription className="text-base">
            Enter your name to begin your pet care journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="grid w-full max-w-md mx-auto items-center gap-2">
            <Label htmlFor="name" className="text-base font-medium">
              Your Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 text-base"
              autoFocus
            />
          </div>
          <div className="flex justify-center pt-2">
            <button
              onClick={handleContinue}
              disabled={!localName.trim()}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            We'll automatically take you to the diagnosis page once you enter your name
          </p>
        </CardContent>
      </Card>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center p-6">
          <div className="text-3xl mb-3">🔍</div>
          <h3 className="font-semibold text-lg mb-2">AI Diagnosis</h3>
          <p className="text-sm text-muted-foreground">
            Get instant preliminary diagnosis for your cat's symptoms
          </p>
        </Card>
        <Card className="text-center p-6">
          <div className="text-3xl mb-3">📋</div>
          <h3 className="font-semibold text-lg mb-2">Health Tracker</h3>
          <p className="text-sm text-muted-foreground">
            Track vaccinations, health records, and set reminders
          </p>
        </Card>
        <Card className="text-center p-6">
          <div className="text-3xl mb-3">❤️</div>
          <h3 className="font-semibold text-lg mb-2">Wellness Care</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive health management for your pet
          </p>
        </Card>
      </div>
    </div>
  );
}

