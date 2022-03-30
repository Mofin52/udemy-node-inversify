import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { UserService } from './users.service';
import { IUserService } from './users.service.interface';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};
const UserRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UserRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('create user', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce((user: UserModel) => ({
			name: user.name,
			email: user.email,
			password: user.password,
			id: 1,
		}));
		createdUser = await usersService.createUser({
			email: 'a@a.ru',
			name: 'Alex',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});

	it('validate - correct password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await usersService.validateUser({
			email: 'a@a.ru',
			password: '1',
		});
		expect(result).toBeTruthy();
	});

	it('validate - wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await usersService.validateUser({
			email: 'a@a.ru',
			password: '2',
		});
		expect(result).toBeFalsy();
	});

	it('validate - wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const result = await usersService.validateUser({
			email: 'a@a.ru',
			password: '1',
		});
		expect(result).toBeFalsy();
	});
});
