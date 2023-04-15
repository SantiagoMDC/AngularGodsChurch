import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectivaComponent } from './directiva.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DirectivaComponent }
	])],
	exports: [RouterModule]
})
export class DirectivaRoutingModule { }
