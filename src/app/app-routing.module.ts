import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PopulationGenerationComponent} from "./modules/matrix/components/population-generation/population-generation.component";
import {MatrixComponent} from "./modules/matrix/components/matrix/matrix.component";

const routes: Routes = [
  {
    path: 'matrix',
    component: MatrixComponent
  },
  {
  path: '**',
  component: PopulationGenerationComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
