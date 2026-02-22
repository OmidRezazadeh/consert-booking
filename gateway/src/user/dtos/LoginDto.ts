import { IsNotEmpty, MinLength, Matches } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'شماره موبایل الزامی است' })
  @Matches(/^09\d{9}$/, { message: 'فرمت شماره موبایل صحیح نیست (مثال: 09123456789)' })
  mobile!: string;

  @IsNotEmpty({ message: 'رمز عبور الزامی است' })
  @MinLength(6, { message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' })
  password!: string;
}