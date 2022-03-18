import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ClientesComponent } from '../../clientes/clientes.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdministracionService } from '../../../services/Administracion/administracion.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css'],
})
export class DireccionesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'direccion'];
  dataSource = new MatTableDataSource<any>();
  bolean = 0;
  formgroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<ClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: AdministracionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.FormVali();
    console.log(this.data);
    this.getdirecciones();
  }
  FormVali() {
    this.formgroup = this.fb.group({
      direccion: new FormControl('', Validators.required),
    });
  }
  getdirecciones() {
    this.service.obtenerdireccioncliente(this.data.idcliente).subscribe(
      (res) => {
        this.dataSource = res.data;
      },
      (error) => {
        this.toastr.warning(error.message);
      }
    );
  }
  save() {
    const json = {
      clienteId: this.data.idcliente,
      nombre: this.formgroup.get('direccion')?.value,
    };
    this.service.nuevadireccion(json).subscribe(
      (res) => {
        this.toastr.success(res.mensaje);
        this.formgroup.get('direccion')?.setValue('');
      },
      (error) => {
        this.toastr.warning(error.message);
      }
    );
  }
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  nuevadireccion(valor: number) {
    if (valor == 1) {
      this.bolean = 1;
    }
    if (valor == 0) {
      this.bolean = 0;
      this.getdirecciones();
      this.formgroup.get('direccion')?.setValue('');
    }
  }
  cerrar(): void {
    this.dialogRef.close();
  }
}
