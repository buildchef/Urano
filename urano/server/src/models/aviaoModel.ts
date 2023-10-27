import mongoose from 'mongoose';

const aviaoSchema = new mongoose.Schema({
  numeroSerie: {
    type: String,
    required: true,
    unique: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  fabricante: {
    type: String,
    required: true,
  },
  anoFabricacao: {
    type: Number,
    required: true,
  },
  capacidadePassageiros: {
    type: Number,
    required: true,
  },
  historicoManutencao: [{
    tipoManutencao: String,
    data: Date,
    descricao: String,
    custo: Number,
  }],
  statusDisponibilidade: {
    type: String,
    enum: ['Em Serviço', 'Fora de Serviço'],
    required: true,
  },
  localizacaoAtual: {
    type: String,
  },
  historicoVoos: [{
    destino: String,
    data: Date,
    duracao: Number,
  }],
  picture: {
    type: String,
    required: true,
  },
});

const Aviao = mongoose.model('Aviao', aviaoSchema, 'aviao');

export default Aviao;
