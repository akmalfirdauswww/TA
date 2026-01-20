'use client';

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';

export default function WelcomePage() {
  const { userName, setUserName } = useAppContext();
  const [localName, setLocalName] = useState(userName);

  const handleSave = () => {
    setUserName(localName);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome!</CardTitle>
          <CardDescription>Please enter your name below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
            />
          </div>
          <Button onClick={handleSave}>Save Name</Button>
          {userName && (
            <p className="text-lg">Hello, <span className="font-semibold">{userName}</span>!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

