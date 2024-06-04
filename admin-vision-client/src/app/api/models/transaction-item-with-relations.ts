/* tslint:disable */
/* eslint-disable */
import { TransactionWithRelations } from '../models/transaction-with-relations';

/**
 * (tsType: TransactionItemWithRelations, schemaOptions: { includeRelations: true })
 */
export interface TransactionItemWithRelations {
  foreignKey?: any;
  id?: number;
  itemId: number;
  quantity: number;
  transaction?: TransactionWithRelations;
  transactionId?: number;
  unitPrice: number;
}
