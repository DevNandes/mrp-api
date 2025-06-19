import { DepositService } from './DepositService';
import { DepositRepository } from '../repositories/DepositRepository';
import { IDeposit } from '../models/Deposit';

jest.mock('../repositories/DepositRepository');

describe('Serviço de Depósito', () => {
  let service: DepositService;
  let repoMock: jest.Mocked<DepositRepository>;

  // Prepara mocks antes de cada teste
  beforeEach(() => {
    repoMock = new DepositRepository() as jest.Mocked<DepositRepository>;
    service = new DepositService();
    (service as any).repo = repoMock;
  });

  // Testa listagem de depósitos
  it('deve listar os depósitos', async () => {
    const deposits: IDeposit[] = [{ title: 'T1', description: 'D1', active: true } as any];
    repoMock.findAll.mockResolvedValue(deposits);

    const result = await service.list();
    expect(result).toBe(deposits);
    expect(repoMock.findAll).toHaveBeenCalledWith(undefined);
  });

  // Testa criação de depósito
  it('deve criar um depósito', async () => {
    const deposit: IDeposit = { title: 'T2', description: 'D2', active: true } as any;
    repoMock.create.mockResolvedValue(deposit);

    const result = await service.create('T2', 'D2');
    expect(result).toBe(deposit);
    expect(repoMock.create).toHaveBeenCalledWith({ title: 'T2', description: 'D2' });
  });

  // Testa atualização de depósito
  it('deve atualizar um depósito', async () => {
    const deposit: IDeposit = { title: 'T3', description: 'D3', active: true } as any;
    repoMock.update.mockResolvedValue(deposit);

    const result = await service.update('id', 'T3', 'D3');
    expect(result).toBe(deposit);
    expect(repoMock.update).toHaveBeenCalledWith('id', { title: 'T3', description: 'D3' });
  });

  // Testa marcação como inativo
  it('deve marcar o depósito como inativo', async () => {
    const deposit: IDeposit = { title: 'T4', description: 'D4', active: false } as any;
    repoMock.markInactive.mockResolvedValue(deposit);

    const result = await service.markInactive('id');
    expect(result).toBe(deposit);
    expect(repoMock.markInactive).toHaveBeenCalledWith('id');
  });
});
