import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrixComponent } from './components/matrix/matrix.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PopulationGenerationComponent } from './components/population-generation/population-generation.component';



@NgModule({
  declarations: [
    MatrixComponent,
    PopulationGenerationComponent
  ],
  exports: [
    MatrixComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class MatrixModule { }
