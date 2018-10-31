import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Livro } from 'app/shared/model/livro.model';
import { LivroService } from './livro.service';
import { LivroComponent } from './livro.component';
import { LivroDetailComponent } from './livro-detail.component';
import { LivroUpdateComponent } from './livro-update.component';
import { LivroDeletePopupComponent } from './livro-delete-dialog.component';
import { ILivro } from 'app/shared/model/livro.model';

@Injectable({ providedIn: 'root' })
export class LivroResolve implements Resolve<ILivro> {
    constructor(private service: LivroService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((livro: HttpResponse<Livro>) => livro.body));
        }
        return of(new Livro());
    }
}

export const livroRoute: Routes = [
    {
        path: 'livro',
        component: LivroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sysFirstApp.livro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'livro/:id/view',
        component: LivroDetailComponent,
        resolve: {
            livro: LivroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sysFirstApp.livro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'livro/new',
        component: LivroUpdateComponent,
        resolve: {
            livro: LivroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sysFirstApp.livro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'livro/:id/edit',
        component: LivroUpdateComponent,
        resolve: {
            livro: LivroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sysFirstApp.livro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const livroPopupRoute: Routes = [
    {
        path: 'livro/:id/delete',
        component: LivroDeletePopupComponent,
        resolve: {
            livro: LivroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sysFirstApp.livro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
