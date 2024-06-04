import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Transaction, TransactionWithRelations } from './transaction.model';
import { Item, ItemWithRelations } from './item.model';

@model({name: 'transaction_items'})
export class TransactionItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // transactionId: number;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // itemId: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  unitPrice: number;

  @belongsTo(() => Transaction)
  transactionId: number

  @belongsTo(() => Item)
  itemId: number
  
  constructor(data?: Partial<TransactionItem>) {
    super(data);
  }
}

export interface TransactionItemRelations {
  // describe navigational properties here
  item?: ItemWithRelations;
}

export type TransactionItemWithRelations = TransactionItem & TransactionItemRelations;
