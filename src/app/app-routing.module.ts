import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Comp1Component } from './comp1/comp1.component';
import { CoinsComponent } from './coins/coins.component';

const routes: Routes = [
  {
    path:'', component:Comp1Component
  },
  {
    path:'coins', component:CoinsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
