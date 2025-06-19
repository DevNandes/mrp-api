import { AuthService } from './AuthService';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../repositories/UserRepository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

// Define variáveis de ambiente para testes de token
beforeAll(() => {
  process.env.JWT_SECRET = 'test';
  process.env.REFRESH_SECRET = 'test2';
});

// Suite de testes do serviço de autenticação
describe('Serviço de Autenticação', () => {
  let service: AuthService;
  let repoMock: jest.Mocked<UserRepository>;

  // Prepara mocks antes de cada teste
  beforeEach(() => {
    repoMock = new UserRepository() as jest.Mocked<UserRepository>;
    service = new AuthService();
    (service as any).userRepo = repoMock;
    jest.clearAllMocks();
  });

  // Testes do registro
  describe('registro', () => {
    // lança se e-mail já cadastrado
    it('deve lançar se e-mail já cadastrado', async () => {
      repoMock.findByEmail.mockResolvedValue({} as any);
      await expect(service.register('n', 'e', 'p')).rejects.toThrow('Email já cadastrado');
      expect(repoMock.findByEmail).toHaveBeenCalledWith('e');
    });

    // gera hash da senha e cria usuário
    it('deve gerar hash da senha e criar usuário', async () => {
      repoMock.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('h');
      const user = { name: 'n', email: 'e', password: 'h' } as any;
      repoMock.create.mockResolvedValue(user);

      const result = await service.register('n', 'e', 'p');
      expect(bcrypt.hash).toHaveBeenCalledWith('p', expect.any(Number));
      expect(repoMock.create).toHaveBeenCalledWith({ name: 'n', email: 'e', password: 'h' });
      expect(result).toBe(user);
    });
  });

  // Testes de login
  describe('login', () => {
    // lança se usuário não encontrado
    it('deve lançar se usuário não encontrado', async () => {
      repoMock.findByEmail.mockResolvedValue(null);
      await expect(service.login('e', 'p')).rejects.toThrow('Credenciais inválidas');
    });

    // lança se senha inválida
    it('deve lançar se senha inválida', async () => {
      repoMock.findByEmail.mockResolvedValue({ password: 'pw' } as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(service.login('e', 'p')).rejects.toThrow('Credenciais inválidas');
    });

    // retorna tokens e atualiza refresh token
    it('deve retornar tokens e atualizar refresh token', async () => {
      const user = { id: 'id', password: 'pw' } as any;
      repoMock.findByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce('at')
        .mockReturnValueOnce('rt');

      const result = await service.login('e', 'p');
      expect(jwt.sign).toHaveBeenNthCalledWith(1, { id: 'id' }, expect.any(String), { expiresIn: '30m' });
      expect(jwt.sign).toHaveBeenNthCalledWith(2, { id: 'id' }, expect.any(String), { expiresIn: '7d' });
      expect(repoMock.updateRefreshToken).toHaveBeenCalledWith('id', 'rt');
      expect(result).toEqual({ accessToken: 'at', refreshToken: 'rt' });
    });
  });

  // Testes de refresh de token
  describe('atualização de token', () => {
    // lança se token inválido
    it('deve lançar se token inválido', async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ id: 'id' });
      repoMock.findByRefreshToken.mockResolvedValue(null as any);
      await expect(service.refresh('tk')).rejects.toThrow('Token inválido');
    });

    // retorna novos tokens
    it('deve retornar novos tokens', async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ id: 'id' });
      const user = { id: 'id' } as any;
      repoMock.findByRefreshToken.mockResolvedValue(user);
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce('at2')
        .mockReturnValueOnce('rt2');

      const result = await service.refresh('tk');
      expect(jwt.sign).toHaveBeenNthCalledWith(1, { id: 'id' }, expect.any(String), { expiresIn: '30m' });
      expect(jwt.sign).toHaveBeenNthCalledWith(2, { id: 'id' }, expect.any(String), { expiresIn: '7d' });
      expect(repoMock.updateRefreshToken).toHaveBeenCalledWith('id', 'rt2');
      expect(result).toEqual({ accessToken: 'at2', refreshToken: 'rt2' });
    });
  });

  // Testes de logout
  describe('logout', () => {
    // lança se token inválido
    it('deve lançar se token inválido', async () => {
      repoMock.findByRefreshToken.mockResolvedValue(null as any);
      await expect(service.logout('tk')).rejects.toThrow('Token inválido');
    });

    // define refresh token como null
    it('deve definir refresh token como nulo', async () => {
      const user = { id: 'id' } as any;
      repoMock.findByRefreshToken.mockResolvedValue(user);
      await service.logout('tk');
      expect(repoMock.updateRefreshToken).toHaveBeenCalledWith('id', null);
    });
  });
});
