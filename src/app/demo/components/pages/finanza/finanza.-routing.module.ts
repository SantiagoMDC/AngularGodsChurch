import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinanzaComponent } from './finanza.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FinanzaComponent }
    ])],
    exports: [RouterModule]
})
export class FinanzaRoutingModule { }
