/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SysFirstTestModule } from '../../../test.module';
import { LivroComponent } from 'app/entities/livro/livro.component';
import { LivroService } from 'app/entities/livro/livro.service';
import { Livro } from 'app/shared/model/livro.model';

describe('Component Tests', () => {
    describe('Livro Management Component', () => {
        let comp: LivroComponent;
        let fixture: ComponentFixture<LivroComponent>;
        let service: LivroService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SysFirstTestModule],
                declarations: [LivroComponent],
                providers: []
            })
                .overrideTemplate(LivroComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LivroComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LivroService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Livro(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.livros[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
