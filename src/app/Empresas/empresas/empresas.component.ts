import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdministracionService } from '../../services/Administracion/administracion.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'Posiciones',
    'Nombre',
    'Fecha Constituida',
    'Acciones',
  ];
  formgroup = new FormGroup({});
  dataSource = new MatTableDataSource<any>();
  constructor(
    private services: AdministracionService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  //  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.allempresas();
    this.FormVali();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  FormVali() {
    this.formgroup = this.fb.group({
      nombre: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
    });
  }
  allempresas() {
    this.services.obtenerempresa().subscribe(
      (res) => {
        this.dataSource = res.data;
        console.log(res.data);
      },
      (error) => {}
    );
  }
  saveempresa() {
    if (this.formgroup.invalid) {
      console.log('Error');
    } else {
      const json = {
        nombre: this.formgroup.get('nombre')?.value,
        fechaConstituida: this.formgroup.get('fecha')?.value,
      };
      this.services.registrarempresa(json).subscribe(
        (res) => {
          this.toastr.success(res.mensaje);
          this.allempresas();
        },
        (error) => {
          this.toastr.success(error.mensaje);
        }
      );
    }
  }
}
