import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MatrixResult, PopulationResult} from "../../models";

@Component({
  selector: 'app-population-generation',
  templateUrl: './population-generation.component.html',
  styleUrls: ['./population-generation.component.scss']
})
export class PopulationGenerationComponent {
  public matrixIteration: PopulationResult[] = [];

  public form = new FormGroup({
    countColumnCreditUnits: new FormArray([]),
    bottomCreditUnits: new FormControl(0),
    topCreditUnits: new FormControl(0),
    countMatrix: new FormControl(0),
    countColumn: new FormControl(0),
    countPopulation: new FormControl(0),
    countCompetencies: new FormControl(0),
    countCompetenciesMatrix: new FormArray([]),
  });

  public get countColumnCreditUnits(): FormArray { return this.form.get('countColumnCreditUnits') as FormArray; }
  public get countCompetenciesMatrix(): FormArray { return this.form.get('countCompetenciesMatrix') as FormArray; }

  private sum = (previousValue: number, currentValue: number) => previousValue + currentValue;
  private sumMatrix(matrix:number[][],index: number): number {
    let sum = 0;
    matrix.forEach(row=>{
      sum+=row[index];
    })
    return sum;
  }
  public countColumnChanged($event: Event) {
    const newCountColumn =  +($event.target as any).value;
    this.form.get('countColumn')?.setValue(newCountColumn);

    const newArray:FormControl[] = [];
    for(let i = 0; i< newCountColumn;i++){
      newArray.push(new FormControl(0));
    }

    this.form.setControl('countColumnCreditUnits', new FormArray(newArray))
  }
  private sumMatrixCompetencions(competencions: number[],matrix:number[][]): boolean {
    let sum = 0
    competencions.forEach((c,index)=>{
      if(c >= 0.5){
        sum+= this.sumMatrix(matrix,index);
      }
    })
    return sum >= 1;
  }

  private closingCompetenciesCalc(firstMatrixRow: number[]): boolean {
    let sum = 0;
    firstMatrixRow.forEach((v,i)=>{
      sum+= v * this.countColumnCreditUnits.value[i];
    })
    return sum >= this.form.get('bottomCreditUnits')?.value && this.form.get('topCreditUnits')?.value <= sum;
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
    const resultMatrixArray:MatrixResult[] = [];
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

      const firstRowCompetenciesMatrix = (this.countCompetenciesMatrix.value[0] as number[]);
      resultMatrixArray.push({
        matrix: currentMatrix,
        fX: +firstRowCompetenciesMatrix.reduce((previousValue, currentValue,index ) =>{
          if(currentValue >= 0.5){
            currentValue * this.sumMatrix(currentMatrix,index);
          } else {
            currentValue = 0;
          }
          return  previousValue + currentValue;
        }).toFixed(2),
        fMax: +firstRowCompetenciesMatrix.filter(x => x >= 0.5).reduce(this.sum).toFixed(2),
        creditUnits: (this.countCompetenciesMatrix.value as number[][]).every(v=> this.sumMatrixCompetencions(v,currentMatrix)),
        closingCompetencies: this.closingCompetenciesCalc(currentMatrix[0])
      });
    }

    this.matrixIteration.push({
      resultMatrixArray: resultMatrixArray
    });

    console.log( this.matrixIteration);

  }
}
