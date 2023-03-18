import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MiembroComponent } from './miembro.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MiembroComponent }
    ])],
    exports: [RouterModule]
})
export class MiembroRoutingModule { }
