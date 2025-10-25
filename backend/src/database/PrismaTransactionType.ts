import { PrismaClient } from '@prisma/generated/client';

// Definindo um alias para o cliente transacional
export type TxClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
