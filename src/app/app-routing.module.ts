import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapLayerComponent } from './map-layer/map-layer.component';

const routes: Routes = [
  { path: 'map-layer', component: MapLayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
