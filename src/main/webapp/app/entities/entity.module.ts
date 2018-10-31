import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SysFirstAlunoModule } from './aluno/aluno.module';
import { SysFirstTurmaModule } from './turma/turma.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SysFirstAlunoModule,
        SysFirstTurmaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysFirstEntityModule {}
