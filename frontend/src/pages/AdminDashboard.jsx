import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogTrigger,
} from '@/components/ui/dialog';
import { MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const statusVariant = { open: 'destructive', in_progress: 'secondary', resolved: 'default', rejected: 'outline' };

const ISSUES = [
  { id: '1', title: 'Pothole on MG Road',   category: 'road',        status: 'open',        ward: 'Ward 76',  upvotes: 14, reporter: 'Priya S.',  date: '2026-03-10' },
  { id: '2', title: 'Burst water main',     category: 'water',       status: 'in_progress', ward: 'Ward 63',  upvotes: 31, reporter: 'Arjun M.', date: '2026-03-09' },
  { id: '3', title: 'Street lights down',   category: 'electricity', status: 'resolved',    ward: 'Ward 68',  upvotes: 22, reporter: 'Ravi K.',   date: '2026-03-08' },
  { id: '4', title: 'Garbage pile-up',      category: 'sanitation',  status: 'open',        ward: 'Ward 174', upvotes: 8,  reporter: 'Meera P.',  date: '2026-03-11' },
  { id: '5', title: 'Fallen tree blocking', category: 'other',       status: 'in_progress', ward: 'Ward 83',  upvotes: 45, reporter: 'Suresh T.', date: '2026-03-11' },
];

const stats = [
  { label: 'Total Issues',  value: 5,  icon: AlertTriangle, color: 'text-primary' },
  { label: 'Open',          value: 2,  icon: AlertTriangle, color: 'text-destructive' },
  { label: 'In Progress',   value: 2,  icon: Clock,         color: 'text-yellow-500' },
  { label: 'Resolved',      value: 1,  icon: CheckCircle,   color: 'text-green-600' },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-background">
      {/* ── Nav ── */}
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-bold">CivicAlert</span>
          <Badge>Admin</Badge>
        </div>
        <Button variant="outline" asChild><Link to="/">Citizen View</Link></Button>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardHeader className="pb-2">
                <Icon className={`h-5 w-5 ${color} mb-1`} />
                <CardTitle className="text-3xl font-bold">{value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Tabs ── */}
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Issues</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          {['all', 'open', 'in_progress', 'resolved'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Ward</TableHead>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ISSUES
                        .filter((i) => tab === 'all' || i.status === tab)
                        .map((issue) => (
                          <TableRow key={issue.id}>
                            <TableCell className="font-medium max-w-[180px] truncate">{issue.title}</TableCell>
                            <TableCell><Badge variant="outline" className="capitalize">{issue.category}</Badge></TableCell>
                            <TableCell className="text-sm text-muted-foreground">{issue.ward}</TableCell>
                            <TableCell className="text-sm">{issue.reporter}</TableCell>
                            <TableCell>
                              <Badge variant={statusVariant[issue.status]} className="capitalize">
                                {issue.status.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{issue.date}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">View</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{issue.title}</DialogTitle>
                                    <DialogDescription>
                                      {issue.category} · {issue.ward} · Reported by {issue.reporter}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex gap-2 py-2">
                                    <Badge variant={statusVariant[issue.status]} className="capitalize">
                                      {issue.status.replace('_', ' ')}
                                    </Badge>
                                    <Badge variant="outline">▲ {issue.upvotes} upvotes</Badge>
                                  </div>
                                  <DialogFooter className="gap-2">
                                    <Button variant="secondary">Mark In Progress</Button>
                                    <Button>Mark Resolved</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
