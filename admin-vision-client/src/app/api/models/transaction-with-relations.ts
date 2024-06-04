/* tslint:disable */
/* eslint-disable */
import { TransactionItemWithRelations } from '../models/transaction-item-with-relations';

/**
 * (tsType: TransactionWithRelations, schemaOptions: { includeRelations: true })
 */
export interface TransactionWithRelations {
  createdAt: string;
  id?: number;
  totalPrice: number;
  transactionItems?: Array<TransactionItemWithRelations>;
  userId: number;
}
