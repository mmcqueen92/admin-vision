import {Entity, model, property} from '@loopback/repository';

@model({name: 'users'})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  optIn?: boolean;

  @property({
    type: 'string',
    length: 255,
  })
  preferredCategories?: string;

  @property({
    type: 'date',
  })
  dateOfBirth?: string;

  @property({
    type: 'string'
  })
  gender?: string;

  @property({
    type: 'string',
  })
  country?: string;
  
  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
