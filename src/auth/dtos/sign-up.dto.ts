import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class SignUpDto extends PickType(User, [
  'email',
  'password',
  'nickname',
]) {
  @IsNotEmpty({ message: '비밀번호 확인' })
  @IsStrongPassword(
    {},
    {
      message:
        '비밀번호는 8자리 이상으로 입력.',
    },
  )
  passwordConfirm: string;
}
