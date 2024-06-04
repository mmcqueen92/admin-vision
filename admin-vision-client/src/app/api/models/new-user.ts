/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<User, 'id'>, schemaOptions: { title: 'NewUser', exclude: [ 'id' ] })
 */
export interface NewUser {
  createdAt: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  updatedAt?: string;
  userName: string;
}
