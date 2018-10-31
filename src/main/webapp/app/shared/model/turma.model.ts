import { IAluno } from 'app/shared/model//aluno.model';

export interface ITurma {
    id?: number;
    numero?: number;
    quantidadeAlunos?: number;
    descricao?: string;
    numeros?: IAluno[];
}

export class Turma implements ITurma {
    constructor(
        public id?: number,
        public numero?: number,
        public quantidadeAlunos?: number,
        public descricao?: string,
        public numeros?: IAluno[]
    ) {}
}
