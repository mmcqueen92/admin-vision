/* tslint:disable */
/* eslint-disable */
import { ItemWithRelations } from '../models/item-with-relations';
import { TransactionWithRelations } from '../models/transaction-with-relations';

/**
 * (tsType: TransactionItemWithRelations, schemaOptions: { includeRelations: true })
 */
export interface TransactionItemWithRelations {
  foreignKey?: any;
  id?: number;
  item?: ItemWithRelations;
  itemId?: number;
  quantity: number;
  transaction?: TransactionWithRelations;
  transactionId?: number;
  unitPrice: number;
}
