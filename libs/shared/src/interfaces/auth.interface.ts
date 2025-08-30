import { Exclude } from "class-transformer";

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export class CreateUserResponse {
  @Exclude()
  id: string;

  username: string;
  email: string;

  @Exclude()
  password: string
}

// Message patterns
export interface MessagePatterns {
  CHECK_USER_EXIST: { cmd: 'check_user_exist' };
  CREATE_USER: { cmd: 'create_user' };
}

export const MESSAGE_PATTERNS: MessagePatterns = {
  CHECK_USER_EXIST: { cmd: 'check_user_exist' },
  CREATE_USER: { cmd: 'create_user' },
};