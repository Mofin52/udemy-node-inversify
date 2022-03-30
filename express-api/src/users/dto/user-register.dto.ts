import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Wrong email' })
	email: string;

	@IsString({ message: 'No password specified' })
	password: string;

	@IsString({ message: 'No name specified' })
	name: string;
}