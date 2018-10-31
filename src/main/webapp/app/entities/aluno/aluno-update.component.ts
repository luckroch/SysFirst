import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from './aluno.service';
import { ILivro } from 'app/shared/model/livro.model';
import { LivroService } from 'app/entities/livro';
import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from 'app/entities/turma';

@Component({
    selector: 'jhi-aluno-update',
    templateUrl: './aluno-update.component.html'
})
export class AlunoUpdateComponent implements OnInit {
    aluno: IAluno;
    isSaving: boolean;

    livros: ILivro[];

    turmas: ITurma[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private alunoService: AlunoService,
        private livroService: LivroService,
        private turmaService: TurmaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ aluno }) => {
            this.aluno = aluno;
        });
        this.livroService.query().subscribe(
            (res: HttpResponse<ILivro[]>) => {
                this.livros = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.turmaService.query().subscribe(
            (res: HttpResponse<ITurma[]>) => {
                this.turmas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.aluno.id !== undefined) {
            this.subscribeToSaveResponse(this.alunoService.update(this.aluno));
        } else {
            this.subscribeToSaveResponse(this.alunoService.create(this.aluno));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAluno>>) {
        result.subscribe((res: HttpResponse<IAluno>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLivroById(index: number, item: ILivro) {
        return item.id;
    }

    trackTurmaById(index: number, item: ITurma) {
        return item.id;
    }
}
