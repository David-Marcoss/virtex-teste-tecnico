import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!file) return;
    // Enviar arquivo para a API
    const formData = new FormData();
    formData.append("file", file);
    fetch("/api/upload-logs", {
      method: "POST",
      body: formData,
    });
  };

  const logs = [
    {
      id: 1,
      device: "OLT-ZTE-001",
      slot: "1/1/1",
      event: "ONU offline",
      date: "2025-10-26 09:43",
    },
    {
      id: 2,
      device: "OLT-ZTE-002",
      slot: "1/1/2",
      event: "Port up",
      date: "2025-10-26 10:01",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Network Logs</h1>

      {/* Filtros */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-end gap-4 p-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Search</label>
            <Input
              placeholder="Device name or slot..."
              className="min-w-[200px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Event Type</label>
            <Select>
              <SelectTrigger className="min-w-[160px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Date</label>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} /> Select date
            </Button>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white">
                Upload Logs
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Log File</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3 py-4">
                <Input
                  type="file"
                  accept=".txt,.log,.csv"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-sm text-gray-500">
                  Accepted formats: .log, .txt, .csv
                </p>
              </div>
              <DialogFooter>
                <Button onClick={handleUpload} disabled={!file}>
                  Send
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Slot</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.id}</TableCell>
                  <TableCell>{log.device}</TableCell>
                  <TableCell>{log.slot}</TableCell>
                  <TableCell>{log.event}</TableCell>
                  <TableCell>{log.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
