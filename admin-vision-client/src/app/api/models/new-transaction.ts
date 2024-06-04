/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Transaction, 'id'>, schemaOptions: { title: 'NewTransaction', exclude: [ 'id' ] })
 */
export interface NewTransaction {
  createdAt: string;
  totalPrice: number;
  userId: number;
}
