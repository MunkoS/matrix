import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-population-generation',
  templateUrl: './population-generation.component.html',
  styleUrls: ['./population-generation.component.scss']
})
export class PopulationGenerationComponent {
  public matrixIteration:number[][][][] = [];


  public form = new FormGroup({
    countColumnCreditUnits: new FormArray([]),
    countMatrix: new FormControl(0),
    countColumn: new FormControl(0),
    countPopulation: new FormControl(0),
    countCompetencies: new FormControl(0),
    countCompetenciesMatrix: new FormArray([]),
  });

  public get countColumnCreditUnits(): FormArray { return this.form.get('countColumnCreditUnits') as FormArray; }
  public get countCompetenciesMatrix(): FormArray { return this.form.get('countCompetenciesMatrix') as FormArray; }

  public countColumnChanged($event: Event) {
    const newCountColumn =  +($event.target as any).value;
    this.form.get('countColumn')?.setValue(newCountColumn);

    const newArray:FormControl[] = [];
    for(let i = 0; i< newCountColumn;i++){
      newArray.push(new FormControl(0));
    }

    this.form.setControl('countColumnCreditUnits', new FormArray(newArray))
  }

  public countCompetenciesChanged($event: Event) {
    this.countCompetenciesMatrix.clear();
    const newCountCompetencies =  +($event.target as any).value;
    for(let i = 0;i < newCountCompetencies;i++){
      const newArray:FormControl[] = [];
      for(let i = 0; i < this.form.get('countColumn')?.value;i++){
        newArray.push(new FormControl(0));
      }

      this.countCompetenciesMatrix.push(new FormArray(newArray));
    }
  }


  public calculation(): void {
    const resultMatrixArray:number[][][] = [];
    this.matrixIteration = [];
    for(let countMatrix = 0; countMatrix < this.form.get('countMatrix')?.value; countMatrix++){
      const currentMatrix:number[][]  = [];
      for(let row = 0;row < 2; row++){
        const currentRow: number[] = [];
        for(let column = 0;column < this.form.get('countColumn')?.value; column++) {
          const isOne = currentMatrix.some(row=>row[column] === 1);
          let oneOrZero = (Math.random()>=0.5)? 1 : 0;
          if(isOne){
            oneOrZero = 0;
          }
          currentRow.push(oneOrZero)
        }
        currentMatrix.push(currentRow)
      }
      resultMatrixArray.push(currentMatrix);
    }

    this.matrixIteration.push(resultMatrixArray);

  }
}
