/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<User, 'id'>, schemaOptions: { title: 'NewUser', exclude: [ 'id' ] })
 */
export interface NewUser {
  country?: string;
  createdAt: string;
  dateOfBirth?: string;
  email: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  optIn?: boolean;
  password: string;
  preferredCategories?: string;
  updatedAt?: string;
  userName: string;
}
