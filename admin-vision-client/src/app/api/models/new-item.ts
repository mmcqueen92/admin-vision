/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Item, 'id'>, schemaOptions: { title: 'NewItem', exclude: [ 'id' ] })
 */
export interface NewItem {
  category?: string;
  createdAt?: string;
  description?: string;
  name: string;
  onSale?: boolean;
  price: number;
  quantity: number;
  updatedAt?: string;
}
