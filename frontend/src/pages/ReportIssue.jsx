import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Upload, ArrowLeft } from 'lucide-react';

export default function ReportIssue() {
  return (
    <main className="min-h-screen bg-background">
      {/* ── Nav ── */}
      <nav className="border-b px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-bold">CivicAlert</span>
        </div>
      </nav>

      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <Badge className="mb-3">New Report</Badge>
          <h1 className="text-3xl font-bold">Report a Civic Issue</h1>
          <p className="text-muted-foreground mt-2">
            Provide as much detail as possible. Our AI will automatically classify and route your report.
          </p>
        </div>

        {/* ── Form Card ── */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>All fields marked * are required</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input id="title" placeholder="e.g. Large pothole on MG Road near Bus Stop 12" />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="road">🛣️ Road & Pavement</SelectItem>
                  <SelectItem value="water">💧 Water Supply</SelectItem>
                  <SelectItem value="electricity">⚡ Electricity</SelectItem>
                  <SelectItem value="sanitation">🗑️ Sanitation & Garbage</SelectItem>
                  <SelectItem value="other">📋 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail — size, impact, how long it has existed..."
                rows={5}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="address">Address / Landmark *</Label>
              <Input id="address" placeholder="e.g. 5th Cross, 8th Main, Jayanagar, Bengaluru" />
            </div>

            {/* Ward */}
            <div className="space-y-2">
              <Label htmlFor="ward">Municipal Ward</Label>
              <Input id="ward" placeholder="e.g. Ward 76" />
            </div>

            {/* Photo upload */}
            <div className="space-y-2">
              <Label htmlFor="photo">Photo (optional)</Label>
              <div className="flex items-center gap-3">
                <Input id="photo" type="file" accept="image/*" className="cursor-pointer" />
                <Upload className="h-5 w-5 text-muted-foreground shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground">JPEG / PNG, max 10 MB. Uploaded to Azure Blob Storage.</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button className="flex-1">Submit Report</Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/issues">Cancel</Link>
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
