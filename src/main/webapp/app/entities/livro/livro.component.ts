import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILivro } from 'app/shared/model/livro.model';
import { Principal } from 'app/core';
import { LivroService } from './livro.service';

@Component({
    selector: 'jhi-livro',
    templateUrl: './livro.component.html'
})
export class LivroComponent implements OnInit, OnDestroy {
    livros: ILivro[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private livroService: LivroService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.livroService.query().subscribe(
            (res: HttpResponse<ILivro[]>) => {
                this.livros = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLivros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILivro) {
        return item.id;
    }

    registerChangeInLivros() {
        this.eventSubscriber = this.eventManager.subscribe('livroListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
