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
  statusManutencao: {
    type: String,
    required: true,
  },
  dataUltimaAtualizacao: {
    type: Date,
    default: Date.now,
  },
});

const Aviao = mongoose.model('Aviao', aviaoSchema, 'aviao');

export default Aviao;
