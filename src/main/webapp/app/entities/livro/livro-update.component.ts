import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILivro } from 'app/shared/model/livro.model';
import { LivroService } from './livro.service';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno';

@Component({
    selector: 'jhi-livro-update',
    templateUrl: './livro-update.component.html'
})
export class LivroUpdateComponent implements OnInit {
    livro: ILivro;
    isSaving: boolean;

    alunos: IAluno[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private livroService: LivroService,
        private alunoService: AlunoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ livro }) => {
            this.livro = livro;
        });
        this.alunoService.query({ filter: 'livro-is-null' }).subscribe(
            (res: HttpResponse<IAluno[]>) => {
                if (!this.livro.aluno || !this.livro.aluno.id) {
                    this.alunos = res.body;
                } else {
                    this.alunoService.find(this.livro.aluno.id).subscribe(
                        (subRes: HttpResponse<IAluno>) => {
                            this.alunos = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.livro.id !== undefined) {
            this.subscribeToSaveResponse(this.livroService.update(this.livro));
        } else {
            this.subscribeToSaveResponse(this.livroService.create(this.livro));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILivro>>) {
        result.subscribe((res: HttpResponse<ILivro>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAlunoById(index: number, item: IAluno) {
        return item.id;
    }
}
