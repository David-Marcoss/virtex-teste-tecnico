import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "lucide-react";
import type { IOltInfos } from "@/shared/interfaces/oltInfos";
import { OltInfosService } from "@/shared/services/oltInfosService";
import { OltInfosTable } from "./components/oltInfosTable";
import { Card, CardContent } from "@/components/ui/card";
import { OltInfosModal } from "./components/oltInfosModal";

export default function DashboardPage() {
  const [oltInfos, setOltInfos] = useState<IOltInfos[]>([]);

  const handleGetOltsData = useCallback(() => {
    OltInfosService.findAll().then((result) => {
      if (result.statusCode === 200 && result.data?.data) {
        setOltInfos(result.data.data);
      }
    });
  }, []);

  useEffect(() => {
    handleGetOltsData();
  }, [handleGetOltsData]);

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

          <OltInfosModal />
        </CardContent>
      </Card>

      {/* Tabela */}
      <OltInfosTable data={oltInfos} />
    </div>
  );
}
