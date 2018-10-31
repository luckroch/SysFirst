import { ITurma } from 'app/shared/model//turma.model';

export const enum Sexo {
    MASCULINO = 'MASCULINO',
    FEMININO = 'FEMININO'
}

export interface IAluno {
    id?: number;
    nome?: string;
    matricula?: number;
    cpf?: number;
    ativo?: boolean;
    sexo?: Sexo;
    nome?: ITurma;
}

export class Aluno implements IAluno {
    constructor(
        public id?: number,
        public nome?: string,
        public matricula?: number,
        public cpf?: number,
        public ativo?: boolean,
        public sexo?: Sexo,
        public nome?: ITurma
    ) {
        this.ativo = this.ativo || false;
    }
}
