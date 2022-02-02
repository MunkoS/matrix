import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})


export class MatrixComponent  implements OnInit {
  public form = new FormGroup({
    matrix: new FormArray([])
  }
);

  public countRow = 5;
  public countColumn = 5;

  public getMatrix(): FormArray {
    return this.form.get('matrix') as FormArray
  }

  public getCell(row: any): FormArray {
    return row;
  }

  private generateMatrix(): void {
   this.getMatrix().clear();
    for (let i = 0; i < this.countRow; i++) {
      this.getMatrix().push(new FormArray([]))
      for (let j = 0; j < this.countColumn; j++) {
       (this.getMatrix().at(i) as FormArray).push(new FormControl())
      }
    }
  }

  public onRowChanged($event: Event) {
    this.countRow = +($event.target as any).value;
    this.generateMatrix();
  }

  public onColumnChanged($event: Event) {
    this.countColumn = +($event.target as any).value;
    this.generateMatrix();
  }

  public ngOnInit(): void {
    this.generateMatrix();
  }

  public calculate(): void {
    this.getMatrix().controls.forEach(row=>{
      ((row as FormControl).value as Array<number>).forEach(cel=>{
        console.info(cel);
      })
    })
  }
}
