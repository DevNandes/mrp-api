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
    // Arranjo: cria um array de depósitos simulados, cada um com título, descrição e ativo = true
    const deposits: IDeposit[] = [{ title: 'T1', description: 'D1', active: true } as any];
    // Simulação: o método findAll do repositório retorna o array acima
    repoMock.findAll.mockResolvedValue(deposits);

    // Ação: chama o serviço para obter a lista de depósitos
    const result = await service.list();
    // Verificação 1: o resultado deve ser exatamente o array simulado
    expect(result).toBe(deposits);
    // Verificação 2: garante que findAll foi chamado sem filtros (undefined)
    expect(repoMock.findAll).toHaveBeenCalledWith(undefined);
  });

  // Testa criação de depósito
  it('deve criar um depósito', async () => {
    // Arranjo: cria um objeto de depósito simulado com título, descrição e ativo = true
    const deposit: IDeposit = { title: 'T2', description: 'D2', active: true } as any;
    // Simulação: o método create do repositório retorna o depósito simulado
    repoMock.create.mockResolvedValue(deposit);

    // Ação: chama o serviço para criar um depósito com título 'T2' e descrição 'D2'
    const result = await service.create('T2', 'D2');
    // Verificação 1: o resultado deve ser o objeto simulado
    expect(result).toBe(deposit);
    // Verificação 2: garante que create foi chamado com os dados corretos
    expect(repoMock.create).toHaveBeenCalledWith({ title: 'T2', description: 'D2' });
  });

  // Testa atualização de depósito
  it('deve atualizar um depósito', async () => {
    // Arranjo: cria um objeto de depósito simulado com novos valores
    const deposit: IDeposit = { title: 'T3', description: 'D3', active: true } as any;
    // Simulação: update retorna o depósito atualizado
    repoMock.update.mockResolvedValue(deposit);

    // Ação: chama o serviço para atualizar o depósito com id 'id' e novos dados
    const result = await service.update('id', 'T3', 'D3');
    // Verificação 1: resultado deve ser o objeto atualizado simulado
    expect(result).toBe(deposit);
    // Verificação 2: garante que update foi chamado com id e dados corretos
    expect(repoMock.update).toHaveBeenCalledWith('id', { title: 'T3', description: 'D3' });
  });

  // Testa marcação como inativo
  it('deve marcar o depósito como inativo', async () => {
    // Arranjo: cria um objeto de depósito simulado com active = false
    const deposit: IDeposit = { title: 'T4', description: 'D4', active: false } as any;
    // Simulação: markInactive retorna o depósito inativo
    repoMock.markInactive.mockResolvedValue(deposit);

    // Ação: chama o serviço para marcar como inativo o depósito com id 'id'
    const result = await service.markInactive('id');
    // Verificação 1: resultado deve ser o objeto com active = false
    expect(result).toBe(deposit);
    // Verificação 2: garante que markInactive foi chamado com o id correto
    expect(repoMock.markInactive).toHaveBeenCalledWith('id');
  });
});
