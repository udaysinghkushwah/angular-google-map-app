import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoiSearchComponent } from './poi-search/poi-search.component';

const routes: Routes = [
  {
    path: '',
    component: PoiSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
