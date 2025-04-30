import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Deposit } from '../models/Deposit';
dotenv.config();

export const connectDB = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI não definido');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB conectado');

  // Seed depósitos padrão
  const defaults = [
    { title: 'Em Produção', description: 'Depósito Em Produção' },
    { title: 'Almoxarifado', description: 'Depósito Almoxarifado' },
    { title: 'Produto Acabado', description: 'Depósito Produto Acabado' }
  ];
  for (const def of defaults) {
    const exists = await Deposit.findOne({ title: def.title });
    if (!exists) {
      await Deposit.create({ title: def.title, description: def.description });
      console.log(`Deposit '${def.title}' criado`);
    }
  }

  // Sincronizar índices de depósitos
  // Isso é necessário para garantir que os índices sejam criados com o index correto
  try {
    await Deposit.syncIndexes();
    console.log('Indexes de depósitos sincronizados');
  } catch (err) {
    console.error('Falha ao sincronizar índices de depósitos:', err);
  }
};
