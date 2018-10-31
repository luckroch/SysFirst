import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from './turma.service';

@Component({
    selector: 'jhi-turma-update',
    templateUrl: './turma-update.component.html'
})
export class TurmaUpdateComponent implements OnInit {
    turma: ITurma;
    isSaving: boolean;

    constructor(private turmaService: TurmaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ turma }) => {
            this.turma = turma;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.turma.id !== undefined) {
            this.subscribeToSaveResponse(this.turmaService.update(this.turma));
        } else {
            this.subscribeToSaveResponse(this.turmaService.create(this.turma));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITurma>>) {
        result.subscribe((res: HttpResponse<ITurma>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
