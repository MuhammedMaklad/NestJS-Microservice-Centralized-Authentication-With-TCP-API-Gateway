

export class UserEntity {
  id: string;

  username: string;

  email: string;

  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}