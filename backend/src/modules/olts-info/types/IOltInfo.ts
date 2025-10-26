export interface IOntInfo {
  slot: string;
  port: string;
  ont_id: string;
  sn?: string;
  state?: 'ONLINE' | 'OFFLINE';
}
