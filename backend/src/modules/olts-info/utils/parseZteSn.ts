import { IOntInfo } from '../types/IOltInfo';

// Parse ZTE SN file
export function parseZteSn(content: string) {
  // Captura: gpon-onu_<chassi>/<slot>/<porta>:<ont_id> ... SN:<serial>
  const regex =
    /gpon-onu_(\d+)\/(\d+)\/(\d+):(\d+)\s+\S+\s+\S+\s+SN:([A-Z0-9]+)\s+\S+/gi;

  const results: IOntInfo[] = [];
  let match;
  while ((match = regex.exec(content))) {
    const _chassi = match[1];
    const slot = match[2];
    const port = match[3];
    const ont_id = match[4];
    const sn = match[5];

    results.push({
      // match[1] = F (frame), match[2] = S (slot), match[3] = P (port)
      slot,
      port,
      ont_id,
      sn,
    });
  }

  return results;
}
