import {Entity, model, property, hasMany} from '@loopback/repository';
import {TransactionItem, TransactionItemWithRelations} from './transaction-item.model';

@model({name: 'transactions'})
export class Transaction extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'number',
    required: true,
  })
  totalPrice: number;

  @hasMany(() => TransactionItem, {keyTo: 'transactionId'})
  transactionItems?: TransactionItem[]

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
  transactionItems?: TransactionItemWithRelations[];
}

export type TransactionWithRelations = Transaction & TransactionRelations;
