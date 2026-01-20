'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Plus, Syringe, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

interface Vaccination {
  id: string;
  name: string;
  date: string;
  nextDue?: string;
  notes?: string;
}

interface HealthRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  notes?: string;
}

export default function HealthTrackerPage() {
  const { userName } = useAppContext();
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [showVaccineForm, setShowVaccineForm] = useState(false);
  const [showRecordForm, setShowRecordForm] = useState(false);

  const [vaccineForm, setVaccineForm] = useState({
    name: '',
    date: '',
    nextDue: '',
    notes: '',
  });

  const [recordForm, setRecordForm] = useState({
    date: '',
    type: '',
    description: '',
    notes: '',
  });

  const handleAddVaccination = (e: React.FormEvent) => {
    e.preventDefault();
    const newVaccination: Vaccination = {
      id: Date.now().toString(),
      name: vaccineForm.name,
      date: vaccineForm.date,
      nextDue: vaccineForm.nextDue || undefined,
      notes: vaccineForm.notes || undefined,
    };
    setVaccinations([...vaccinations, newVaccination]);
    setVaccineForm({ name: '', date: '', nextDue: '', notes: '' });
    setShowVaccineForm(false);
  };

  const handleAddHealthRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: HealthRecord = {
      id: Date.now().toString(),
      date: recordForm.date,
      type: recordForm.type,
      description: recordForm.description,
      notes: recordForm.notes || undefined,
    };
    setHealthRecords([...healthRecords, newRecord]);
    setRecordForm({ date: '', type: '', description: '', notes: '' });
    setShowRecordForm(false);
  };

  const getUpcomingVaccinations = () => {
    const today = new Date();
    return vaccinations.filter((v) => {
      if (!v.nextDue) return false;
      const dueDate = new Date(v.nextDue);
      const daysUntil = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 30;
    });
  };

  const upcoming = getUpcomingVaccinations();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Health Tracker</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {userName ? `Welcome back, ${userName}! ` : ''}Manage your cat's health records, vaccinations, and wellness information all in one place.
        </p>
      </div>

      {/* Upcoming Vaccinations Alert */}
      {upcoming.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-amber-900 dark:text-amber-100">
                Upcoming Vaccinations
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcoming.map((vaccine) => (
                <div key={vaccine.id} className="flex items-center justify-between p-3 bg-white dark:bg-amber-900 rounded-lg">
                  <div>
                    <p className="font-semibold">{vaccine.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(vaccine.nextDue!).toLocaleDateString()}
                    </p>
                  </div>
                  <Syringe className="w-5 h-5 text-amber-600" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vaccinations Section */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Syringe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Vaccinations</CardTitle>
                  <CardDescription>Track your cat's vaccination schedule</CardDescription>
                </div>
              </div>
              <Button
                onClick={() => setShowVaccineForm(!showVaccineForm)}
                size="sm"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {showVaccineForm && (
              <Card className="border-2 p-4">
                <form onSubmit={handleAddVaccination} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vaccine-name">Vaccine Name</Label>
                    <Input
                      id="vaccine-name"
                      value={vaccineForm.name}
                      onChange={(e) => setVaccineForm({ ...vaccineForm, name: e.target.value })}
                      placeholder="e.g., FVRCP, Rabies"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vaccine-date">Date Given</Label>
                      <Input
                        id="vaccine-date"
                        type="date"
                        value={vaccineForm.date}
                        onChange={(e) => setVaccineForm({ ...vaccineForm, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vaccine-next">Next Due Date</Label>
                      <Input
                        id="vaccine-next"
                        type="date"
                        value={vaccineForm.nextDue}
                        onChange={(e) =>
                          setVaccineForm({ ...vaccineForm, nextDue: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vaccine-notes">Notes</Label>
                    <Textarea
                      id="vaccine-notes"
                      value={vaccineForm.notes}
                      onChange={(e) => setVaccineForm({ ...vaccineForm, notes: e.target.value })}
                      placeholder="Additional information..."
                      rows={2}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowVaccineForm(false);
                        setVaccineForm({ name: '', date: '', nextDue: '', notes: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {vaccinations.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Syringe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No vaccinations recorded yet</p>
                <p className="text-sm">Click "Add" to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {vaccinations
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((vaccine) => (
                    <Card key={vaccine.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{vaccine.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Given: {new Date(vaccine.date).toLocaleDateString()}
                              </div>
                              {vaccine.nextDue && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Next: {new Date(vaccine.nextDue).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                            {vaccine.notes && (
                              <p className="text-sm text-muted-foreground mt-2">{vaccine.notes}</p>
                            )}
                          </div>
                          {vaccine.nextDue &&
                            new Date(vaccine.nextDue) > new Date() &&
                            new Date(vaccine.nextDue) <=
                              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                              <CheckCircle2 className="w-5 h-5 text-amber-500" />
                            )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Health Records Section */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Health Records</CardTitle>
                  <CardDescription>Track visits, treatments, and health events</CardDescription>
                </div>
              </div>
              <Button
                onClick={() => setShowRecordForm(!showRecordForm)}
                size="sm"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {showRecordForm && (
              <Card className="border-2 p-4">
                <form onSubmit={handleAddHealthRecord} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="record-date">Date</Label>
                      <Input
                        id="record-date"
                        type="date"
                        value={recordForm.date}
                        onChange={(e) => setRecordForm({ ...recordForm, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="record-type">Type</Label>
                      <Input
                        id="record-type"
                        value={recordForm.type}
                        onChange={(e) => setRecordForm({ ...recordForm, type: e.target.value })}
                        placeholder="e.g., Check-up, Treatment"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="record-description">Description</Label>
                    <Textarea
                      id="record-description"
                      value={recordForm.description}
                      onChange={(e) =>
                        setRecordForm({ ...recordForm, description: e.target.value })
                      }
                      placeholder="Describe the health event..."
                      required
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="record-notes">Notes</Label>
                    <Textarea
                      id="record-notes"
                      value={recordForm.notes}
                      onChange={(e) => setRecordForm({ ...recordForm, notes: e.target.value })}
                      placeholder="Additional notes..."
                      rows={2}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowRecordForm(false);
                        setRecordForm({ date: '', type: '', description: '', notes: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {healthRecords.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No health records yet</p>
                <p className="text-sm">Click "Add" to record a health event</p>
              </div>
            ) : (
              <div className="space-y-3">
                {healthRecords
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((record) => (
                    <Card key={record.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{record.type}</h3>
                              <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
                                {new Date(record.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {record.description}
                            </p>
                            {record.notes && (
                              <p className="text-sm text-muted-foreground italic">
                                Note: {record.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle>Health Summary</CardTitle>
          <CardDescription>Quick overview of your pet's health status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">{vaccinations.length}</div>
              <div className="text-sm text-muted-foreground">Vaccinations Recorded</div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">{upcoming.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming Vaccinations</div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">{healthRecords.length}</div>
              <div className="text-sm text-muted-foreground">Health Records</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
