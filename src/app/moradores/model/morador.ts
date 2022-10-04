export interface Morador {
  idMorador: number;
  idApto: string;
  nome: string;
  rg: string;
  cpf: string;
  telefone1: string;
  telefone2?: string;
  email: string;
  contatoEmerg?: string;
  telefoneEmerg?: string;
  obs?: string;//?: dado pode ser nulo !dado não será nulo em nenhum caso
}
