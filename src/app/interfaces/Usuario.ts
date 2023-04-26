export interface Usuario {
  id?: number;
  nome: string;
  login: string;
  senha?: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  nomeMae: string;
  idStatus: number;
  dataInclusao: Date | null;
  dataAlteracao: Date | null;
}
