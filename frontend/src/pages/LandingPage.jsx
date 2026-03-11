import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, CheckCircle, Users } from 'lucide-react';

const stats = [
  { label: 'Issues Reported', value: '2,481', icon: AlertTriangle },
  { label: 'Resolved',        value: '1,834', icon: CheckCircle },
  { label: 'Active Citizens', value: '9,203', icon: Users },
  { label: 'Wards Covered',   value: '198',   icon: MapPin },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ── Nav ── */}
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CivicAlert</span>
          <Badge variant="secondary">SIH25031</Badge>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" asChild><Link to="/issues">Browse Issues</Link></Button>
          <Button asChild><Link to="/report">Report an Issue</Link></Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4">Crowdsourced Civic Reporting</Badge>
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
          Your City, Your Voice
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Report potholes, water leaks, power outages, and sanitation problems in seconds.
          AI-powered classification routes your issue to the right municipal authority instantly.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild><Link to="/report">Report an Issue</Link></Button>
          <Button size="lg" variant="outline" asChild><Link to="/issues">View All Issues</Link></Button>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardHeader className="pb-2">
                <Icon className="h-5 w-5 text-primary mb-1" />
                <CardTitle className="text-3xl font-bold">{value}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{label}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="border-t bg-muted/40 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Report', desc: 'Describe the issue and upload a photo. Location is auto-detected.' },
              { step: '02', title: 'AI Classification', desc: 'Our model categorises the issue and routes it to the correct department.' },
              { step: '03', title: 'Track & Resolve', desc: 'Get notified as the status changes from Open → In Progress → Resolved.' },
            ].map(({ step, title, desc }) => (
              <Card key={step}>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">{step}</Badge>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © 2025 CivicAlert · Built for SIH 2025 · Team SIH25031
      </footer>
    </main>
  );
}
