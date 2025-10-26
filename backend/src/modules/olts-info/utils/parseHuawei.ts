import { IOntInfo } from '../types/IOltInfo';

// Parse Huawei file
export function parseHuawei(content: string): IOntInfo[] {
  // Captura: F / S / P   ONT-ID   SN   ...   (online|offline)
  const regex =
    /(\d+)\/\s*(\d+)\/\s*(\d+)\s+(\d+)\s+([A-Fa-f0-9]+)\s+\S+\s+(online|offline)/gi;

  const results: IOntInfo[] = [];
  let match;
  while ((match = regex.exec(content))) {
    results.push({
      // match[1] = F (frame), match[2] = S (slot), match[3] = P (port)
      slot: match[2],
      port: match[3],
      ont_id: match[4],
      sn: match[5],
      state: match[6].toLowerCase() === 'online' ? 'ONLINE' : 'OFFLINE',
    });
  }

  return results;
}
