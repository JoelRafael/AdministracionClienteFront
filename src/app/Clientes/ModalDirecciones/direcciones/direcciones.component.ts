import { Component, OnInit, Inject,  ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ClientesComponent} from "../../clientes/clientes.component"
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl,FormGroup, Validators} from "@angular/forms"
@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  bolean=0;
  formgroup = new FormGroup({})

  constructor(
    public dialogRef: MatDialogRef<ClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.FormVali()
  }
  FormVali(){
    this.formgroup = this.fb.group({
      direccion: new FormControl("", Validators.required)
    })
  }
  save(){}
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  nuevadireccion(valor:number){
if(valor ==1){
this.bolean=1
}
if(valor == 0){
this.bolean=0
}
  }
  cerrar():void{
    this.dialogRef.close();
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
];
