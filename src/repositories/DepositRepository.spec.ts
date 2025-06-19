import { DepositRepository } from './DepositRepository';
import { Deposit, IDeposit } from '../models/Deposit';

describe('Repositório de Depósito', () => {
  let repo: DepositRepository;

  beforeEach(() => {
    repo = new DepositRepository();
    jest.restoreAllMocks();
  });

  it('deve buscar todos ativos por padrão', async () => {
    const data: IDeposit[] = [{ title: 'T', description: 'D', active: true } as any];
    jest.spyOn(Deposit, 'find').mockResolvedValue(data);

    const result = await repo.findAll();
    expect(Deposit.find).toHaveBeenCalledWith({ active: true });
    expect(result).toBe(data);
  });

  it('deve filtrar por ativo=false', async () => {
    const data: IDeposit[] = [];
    jest.spyOn(Deposit, 'find').mockResolvedValue(data);

    const result = await repo.findAll({ active: false });
    expect(Deposit.find).toHaveBeenCalledWith({ active: false });
    expect(result).toBe(data);
  });

  it('deve buscar por ID', async () => {
    const item: IDeposit = { title: 'T', description: 'D', active: true } as any;
    jest.spyOn(Deposit, 'findById').mockResolvedValue(item);

    const result = await repo.findById('123');
    expect(Deposit.findById).toHaveBeenCalledWith('123');
    expect(result).toBe(item);
  });

  it('deve criar um depósito', async () => {
    const data: IDeposit = { title: 'T', description: 'D', active: true } as any;
    const saveSpy = jest.spyOn(Deposit.prototype, 'save').mockResolvedValue(data);

    const result = await repo.create({ title: 'T', description: 'D' });
    expect(saveSpy).toHaveBeenCalled();
    expect(result).toBe(data);
  });

  it('deve atualizar um depósito', async () => {
    const data: IDeposit = { title: 'T', description: 'D', active: true } as any;
    jest.spyOn(Deposit, 'findByIdAndUpdate').mockResolvedValue(data);

    const result = await repo.update('123', { title: 'T', description: 'D' });
    expect(Deposit.findByIdAndUpdate)
      .toHaveBeenCalledWith('123', { title: 'T', description: 'D' }, { new: true });
    expect(result).toBe(data);
  });

  it('deve marcar como inativo', async () => {
    const data: IDeposit = { title: 'T', description: 'D', active: false } as any;
    jest.spyOn(Deposit, 'findByIdAndUpdate').mockResolvedValue(data);

    const result = await repo.markInactive('123');
    expect(Deposit.findByIdAndUpdate)
      .toHaveBeenCalledWith('123', { active: false }, { new: true });
    expect(result).toBe(data);
  });

  it('deve filtrar pelo id', async () => {
    const data: IDeposit[] = [];
    jest.spyOn(Deposit, 'find').mockResolvedValue(data);

    const result = await repo.findAll({ id: '123' });
    expect(Deposit.find).toHaveBeenCalledWith({ active: true, _id: '123' });
    expect(result).toBe(data);
  });

  it('deve filtrar pelo título', async () => {
    const data: IDeposit[] = [];
    jest.spyOn(Deposit, 'find').mockResolvedValue(data);

    const result = await repo.findAll({ title: 'abc' });
    expect(Deposit.find).toHaveBeenCalledWith({ active: true, title: { $regex: 'abc', $options: 'i' } });
    expect(result).toBe(data);
  });

  it('deve filtrar pela descrição', async () => {
    const data: IDeposit[] = [];
    jest.spyOn(Deposit, 'find').mockResolvedValue(data);

    const result = await repo.findAll({ description: 'desc' });
    expect(Deposit.find).toHaveBeenCalledWith({ active: true, description: { $regex: 'desc', $options: 'i' } });
    expect(result).toBe(data);
  });
});
