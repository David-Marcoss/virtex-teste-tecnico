import { IOntInfo } from '../types/IOltInfo';

// Parse ZTE State file
export function parseZteState(content: string) {
  // Captura: 1/1/1:1 enable enable working ...
  const regex = /(\d+)\/(\d+)\/(\d+):(\d+)\s+\S+\s+\S+\s+(\w+)/gi;

  const results: IOntInfo[] = [];
  let match;
  while ((match = regex.exec(content))) {
    const _chassi = match[1];
    const slot = match[2];
    const port = match[3];
    const ont_id = match[4];
    const phaseState = match[5].toLowerCase();

    results.push({
      slot,
      port,
      ont_id,
      sn: '',
      state: phaseState === 'working' ? 'ONLINE' : 'OFFLINE',
    });
  }

  return results;
}
