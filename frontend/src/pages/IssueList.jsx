import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, ArrowLeft, Plus } from 'lucide-react';

// Status → Badge variant map
const statusVariant = {
  open:        'destructive',
  in_progress: 'secondary',
  resolved:    'default',
};

// Placeholder data — replace with API fetch
const SAMPLE = [
  { id: '1', title: 'Pothole on MG Road', category: 'road',        status: 'open',        ward: 'Ward 76', upvotes: 14, reporter: 'Priya S.' },
  { id: '2', title: 'Burst water main',   category: 'water',       status: 'in_progress', ward: 'Ward 63', upvotes: 31, reporter: 'Arjun M.' },
  { id: '3', title: 'Street lights down', category: 'electricity', status: 'resolved',    ward: 'Ward 68', upvotes: 22, reporter: 'Ravi K.' },
  { id: '4', title: 'Garbage pile-up',    category: 'sanitation',  status: 'open',        ward: 'Ward 174',upvotes: 8,  reporter: 'Meera P.' },
  { id: '5', title: 'Fallen tree',        category: 'other',       status: 'in_progress', ward: 'Ward 83', upvotes: 45, reporter: 'Suresh T.' },
];

function IssueCard({ issue }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{issue.title}</CardTitle>
          <Badge variant={statusVariant[issue.status]} className="shrink-0 capitalize">
            {issue.status.replace('_', ' ')}
          </Badge>
        </div>
        <div className="flex gap-2 mt-1">
          <Badge variant="outline" className="capitalize text-xs">{issue.category}</Badge>
          <Badge variant="outline" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />{issue.ward}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs">{issue.reporter.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardDescription className="text-xs">{issue.reporter}</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">▲ {issue.upvotes}</span>
            <Button size="sm" variant="outline">View</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function IssueList() {
  // TODO: replace with useEffect + fetch from /api/issues
  const loading = false;
  const issues  = SAMPLE;

  return (
    <main className="min-h-screen bg-background">
      {/* ── Nav ── */}
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-bold">CivicAlert</span>
          </div>
        </div>
        <Button asChild>
          <Link to="/report"><Plus className="h-4 w-4 mr-2" />Report Issue</Link>
        </Button>
      </nav>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Issues</h1>
          <p className="text-muted-foreground mt-1">{issues.length} issues reported across the city</p>
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Input placeholder="Search issues..." className="sm:max-w-xs" />
          <Select>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="sm:w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="road">Road</SelectItem>
              <SelectItem value="water">Water</SelectItem>
              <SelectItem value="electricity">Electricity</SelectItem>
              <SelectItem value="sanitation">Sanitation</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ── Issue Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <LoadingSkeleton key={i} />)
            : issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
          }
        </div>
      </div>
    </main>
  );
}
