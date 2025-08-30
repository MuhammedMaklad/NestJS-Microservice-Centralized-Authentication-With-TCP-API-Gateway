

export class UserEntity {
  id: string;

  user: string;

  email: string;

  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}