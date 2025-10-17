import { useState, useEffect, useMemo } from "react";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Payment {
  id: string;
  studentName: string;
  course: string;
  amount: number;
  date: string;
  method: string;
  status: "completed" | "pending" | "failed";
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    const stored = localStorage.getItem("payments");
    if (stored) {
      setPayments(JSON.parse(stored));
    } else {
      // Sample data
      const samplePayments: Payment[] = [
        {
          id: "1",
          studentName: "Emma Chen",
          course: "Full Stack Web Development",
          amount: 25000,
          date: "2025-01-20",
          method: "UPI",
          status: "completed",
        },
        {
          id: "2",
          studentName: "Mike Ross",
          course: "AI & Machine Learning Fundamentals",
          amount: 30000,
          date: "2025-01-19",
          method: "Card",
          status: "completed",
        },
        {
          id: "3",
          studentName: "Sarah Johnson",
          course: "Full Stack Web Development",
          amount: 25000,
          date: "2025-01-18",
          method: "Net Banking",
          status: "pending",
        },
        {
          id: "4",
          studentName: "David Kim",
          course: "Data Science & Analytics",
          amount: 28000,
          date: "2025-01-17",
          method: "UPI",
          status: "completed",
        },
        {
          id: "5",
          studentName: "Lisa Wang",
          course: "Cloud Computing with AWS",
          amount: 22000,
          date: "2025-01-16",
          method: "Card",
          status: "completed",
        },
        {
          id: "6",
          studentName: "James Miller",
          course: "DevOps & CI/CD Pipeline",
          amount: 20000,
          date: "2025-01-15",
          method: "UPI",
          status: "failed",
        },
      ];
      localStorage.setItem("payments", JSON.stringify(samplePayments));
      setPayments(samplePayments);
    }
  };

  const filteredPayments = useMemo(() => 
    payments.filter((p) => {
      const matchesSearch =
        p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.course.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    }),
    [payments, searchQuery, statusFilter]
  );

  const totalRevenue = useMemo(() => 
    payments
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0),
    [payments]
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">Payments</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Total Revenue: ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg border shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Student Name</TableHead>
                <TableHead className="whitespace-nowrap hidden md:table-cell">Course</TableHead>
                <TableHead className="whitespace-nowrap">Amount</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">Date</TableHead>
                <TableHead className="whitespace-nowrap hidden xl:table-cell">Method</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium whitespace-nowrap">{payment.studentName}</TableCell>
                  <TableCell className="hidden md:table-cell">{payment.course}</TableCell>
                  <TableCell className="whitespace-nowrap">₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell className="hidden lg:table-cell">{payment.date}</TableCell>
                  <TableCell className="hidden xl:table-cell">{payment.method}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "completed"
                          ? "default"
                          : payment.status === "pending"
                          ? "outline"
                        : "destructive"
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  );
}
