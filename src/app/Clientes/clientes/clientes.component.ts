import { Component, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DireccionesComponent} from "../ModalDirecciones/direcciones/direcciones.component"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Posiciones', 'Nombre', 'Fecha Constituida', 'Acciones'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  formgroup = new FormGroup({})
  cambiopanel=0
  constructor(private fb:FormBuilder, public dialog: MatDialog, private toastr: ToastrService ) {

  }

  ngOnInit(): void {
    this.FormVali()
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
   }
   FormVali(){
     this.formgroup = this.fb.group({
       nombre: new FormControl("", Validators.required),
       apellido: new FormControl("", Validators.required),
       cedula: new FormControl("", Validators.required),
       fecha: new FormControl("", Validators.required),
       sexo: new FormControl("", Validators.required),
       empresa: new FormControl("", Validators.required)
     })
   }
   save(){

}
update(data:any){
  this.cambiopanel=1
this.formgroup.get("nombre")?.setValue(data.position);
this.formgroup.get("apellido")?.setValue(data.name);
this.formgroup.get("cedula")?.setValue(data.weight);
//this.formgroup.get("fecha")?.setValue(data.symbol);
console.log(data)
}
viewdirecciones(){
  const dialogRef = this.dialog.open(DireccionesComponent, {
    width: '400px',
    data: {name: "panda"},
  });
}
private limpiar(){
this.formgroup.get("nombre")?.setValue("");
this.formgroup.get("apellido")?.setValue("");
this.formgroup.get("cedula")?.setValue("");
this.formgroup.get("fecha")?.setValue("");
this.formgroup.get("sexo")?.setValue("");
this.formgroup.get("empresa")?.setValue("");
}
volver(){
  this.limpiar();
  this.cambiopanel=0
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
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'}
];
