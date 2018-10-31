import { IAluno } from 'app/shared/model//aluno.model';

export interface ILivro {
    id?: number;
    nome?: string;
    aluno?: IAluno;
}

export class Livro implements ILivro {
    constructor(public id?: number, public nome?: string, public aluno?: IAluno) {}
}
