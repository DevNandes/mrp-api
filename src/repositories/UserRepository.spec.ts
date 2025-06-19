import { UserRepository } from './UserRepository';
import { User, IUser } from '../models/User';

describe('Repositório de Usuário', () => {
  let repo: UserRepository;

  beforeEach(() => {
    repo = new UserRepository();
    jest.restoreAllMocks();
  });

  it('deve criar um usuário e salvar', async () => {
    const data: IUser = { name: 'N', email: 'E', password: 'P', createdAt: new Date() } as any;
    const saveSpy = jest.spyOn(User.prototype, 'save').mockResolvedValue(data);

    const result = await repo.create({ name: 'N', email: 'E', password: 'P' });
    expect(saveSpy).toHaveBeenCalled();
    expect(result).toBe(data);
  });

  it('deve buscar usuário por email', async () => {
    const user: IUser = { name: 'N', email: 'E', password: 'P', createdAt: new Date() } as any;
    jest.spyOn(User, 'findOne').mockResolvedValue(user);

    const result = await repo.findByEmail('E');
    expect(User.findOne).toHaveBeenCalledWith({ email: 'E' });
    expect(result).toBe(user);
  });

  it('deve atualizar refreshToken', async () => {
    const user: IUser = { name: 'N', email: 'E', password: 'P', refreshToken: 'old', createdAt: new Date() } as any;
    jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue(user);

    const result = await repo.updateRefreshToken('123', 'new');
    expect(User.findByIdAndUpdate)
      .toHaveBeenCalledWith('123', { refreshToken: 'new' }, { new: true });
    expect(result).toBe(user);
  });

  it('deve buscar usuário por refreshToken', async () => {
    const user: IUser = { name: 'N', email: 'E', password: 'P', refreshToken: 'tok', createdAt: new Date() } as any;
    jest.spyOn(User, 'findOne').mockResolvedValue(user);

    const result = await repo.findByRefreshToken('tok');
    expect(User.findOne).toHaveBeenCalledWith({ refreshToken: 'tok' });
    expect(result).toBe(user);
  });
});
