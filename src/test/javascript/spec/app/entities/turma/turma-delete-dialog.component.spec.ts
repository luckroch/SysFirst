/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SysFirstTestModule } from '../../../test.module';
import { TurmaDeleteDialogComponent } from 'app/entities/turma/turma-delete-dialog.component';
import { TurmaService } from 'app/entities/turma/turma.service';

describe('Component Tests', () => {
    describe('Turma Management Delete Component', () => {
        let comp: TurmaDeleteDialogComponent;
        let fixture: ComponentFixture<TurmaDeleteDialogComponent>;
        let service: TurmaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SysFirstTestModule],
                declarations: [TurmaDeleteDialogComponent]
            })
                .overrideTemplate(TurmaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TurmaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurmaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
