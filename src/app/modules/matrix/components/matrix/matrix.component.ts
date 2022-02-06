import {Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup} from "@angular/forms";
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})


export class MatrixComponent  implements OnInit {
  public firstForm: FormGroup | null = null;


  public form = new FormGroup({
    matrix: new FormArray([]),
    algorithm : new FormControl(''),
  }
);

  public forms:FormGroup[] = [];


  public countRow = 6;
  public countColumn = 7;


  private  sumArray(previousValue: number, currentValue: number): number {
    return previousValue + currentValue;
  }

  private sortingMatrix = (a:number[],b:number[]): number => {
      if (a.reduce(this.sumArray) < b.reduce(this.sumArray)) {
        return 1;
      }
      if (a.reduce(this.sumArray) > b.reduce(this.sumArray)) {
        return -1;
      }

      return 0;
  };

  private removeColumnAndRowMatrixFirstStep(matrix: any[]): any[] {

    const lastColumn = matrix[matrix.length - 1] as number[];
    const oneIndexes: number[] = [];
    lastColumn.forEach((x,index)=>{
      if(x === 1) {
        oneIndexes.push(index);
      }
    })

    if(oneIndexes.length !==  lastColumn.length){
      matrix.pop();
      matrix.forEach(row=>{
        oneIndexes.forEach((deleteIndex,index)=>{
          (row as number[]).splice(deleteIndex - index,1);
        })
      })
      this.showNewMatrix(matrix,'Удаление избыточный дисциплин ');
      return this.removeColumnAndRowMatrixFirstStep(matrix);
    }


    return matrix;
  }


  private removeColumnAndRowMatrixTwoStep(matrix: any[],currentIndex = 0): any[] {
    const minIndex: number[] = [];
    const currentColumn = matrix[currentIndex] as number[];
    currentColumn.forEach((v,index) => {
      if(v === 0){
        minIndex.push(index)
      }
    })


    if(minIndex.length > 0 && minIndex.length !== currentColumn.length){
      matrix.forEach(row=>{
        minIndex.forEach((deleteIndex,index)=>{
          (row as number[]).splice(deleteIndex - index,1);
        })
      })
    }



      this.showNewMatrix(matrix,'Парето(оптимальное решение)');
      currentIndex++;
      if(matrix[currentIndex] && currentColumn.length > 1){
        return this.removeColumnAndRowMatrixTwoStep(matrix,currentIndex);
      }

    return matrix;
  }


  public getMatrixsAlgorithm(index: number): FormControl {
    return this.forms[index].get('algorithm') as FormControl ;
  }

  public getMatrixs(index: number): FormArray {
    return this.forms[index].get('matrix') as FormArray
  }

  public getMatrix(form: FormGroup = this.form): FormArray {
    return form.get('matrix') as FormArray
  }

  private generateMatrix(): void {
   this.getMatrix().clear();
    for (let i = 0; i < this.countRow; i++) {
      this.getMatrix().push(new FormArray([]))
      for (let j = 0; j < this.countColumn; j++) {
       (this.getMatrix().at(i) as FormArray).push(new FormControl(1))
      }
    }
  }

  private showNewMatrix(newMatrix: any[],algorithm: string): void {
    this.getMatrix().clear();
    const rowLength = newMatrix[0].length;
    newMatrix.forEach(column =>{
      this.getMatrix().push(new FormArray([]))
    });

    this.getMatrix().controls.forEach((row,rowIndex)=>{
      for(let i = 0; i< rowLength; i++){
        (this.getMatrix().at(i) as FormArray).push(new FormControl(newMatrix[rowIndex][i]))
      }

    })
    this.form.get('algorithm')?.setValue(algorithm);
    this.forms.push(cloneDeep(this.form))
  }

  private getArrayForForm(): any[] {
    const matrix = new Array((this.getMatrix().controls[0] as FormControl).value.length);
    this.getMatrix().controls.forEach((row,rowIndex)=>{
      ((row as FormControl).value as Array<number>).forEach((cel,celIndex)=>{
        if(!matrix[celIndex]){
          matrix[celIndex] = [];
        }
        matrix[celIndex].push(cel);
      })
    })

    return matrix;
  }

  public onRowChanged($event: Event) {
    this.firstForm = null;
    this.countRow = +($event.target as any).value;
    this.generateMatrix();
  }

  public onColumnChanged($event: Event) {
    this.firstForm = null;
    this.countColumn = +($event.target as any).value;
    this.generateMatrix();
  }

  public ngOnInit(): void {
    this.generateMatrix();
  }

  public sortMatrix(): void {
    this.forms = [];
    this.firstForm = cloneDeep(this.form);
    const matrix = this.getArrayForForm();
    this.showNewMatrix(matrix.sort(this.sortingMatrix) as [[]],'сортировка');
    const newMatrix = this.removeColumnAndRowMatrixFirstStep(this.getArrayForForm());
    this.removeColumnAndRowMatrixTwoStep(newMatrix)
    // this.showNewMatrix(newMatrix);
  }
}
