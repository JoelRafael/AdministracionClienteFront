import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DireccionesComponent } from '../ModalDirecciones/direcciones/direcciones.component';
import { ToastrService } from 'ngx-toastr';
import { AdministracionService } from '../../services/Administracion/administracion.service';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'Nombre',
    'Apellido',
    'Cedula',
    'Nacimiento',
    'Empresa',
    'Acciones',
  ];
  dataSource = new MatTableDataSource<any>();
  formgroup = new FormGroup({});
  cambiopanel = 0;
  sexo: any;
  empresa: any;
  json: any;
  idcliente = 0;
  private suscripcions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private service: AdministracionService
  ) {}

  ngOnInit(): void {
    this.FormVali();
    this.getsexo();
    this.getempresas();
    this.getclientes();
  }
  ngOnDestroy(): void {
    this.suscripcions.forEach((sub) => sub.unsubscribe);
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  FormVali() {
    this.formgroup = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      empresa: new FormControl('', Validators.required),
    });
  }
  getsexo() {
    this.service.obtenersexo().subscribe((res) => {
      this.sexo = res.data;
    });
  }
  getempresas() {
    this.service.obtenerempresa().subscribe((res) => (this.empresa = res.data));
  }
  getclientes() {
    this.service
      .obtenercliente()
      .subscribe((res) => (this.dataSource = res.data));
  }
  save() {
    if (this.formgroup.invalid) {
      console.log('Error');
    } else {
      const json = {
        empresaId: this.formgroup.get('empresa')?.value,
        sexoId: this.formgroup.get('sexo')?.value,
        nombre: this.formgroup.get('nombre')?.value,
        apellido: this.formgroup.get('apellido')?.value,
        cedula: this.formgroup.get('cedula')?.value,
        fechaNacimiento: this.formgroup.get('fecha')?.value,
      };
      this.service.registrarcliente(json).subscribe(
        (res) => {
          this.toastr.success(res.mensaje);
          this.getclientes();
          this.limpiar();
        },
        (error) => {
          this.toastr.warning(error.mensaje);
        }
      );
      //console.log(json);
    }
  }
  update(data: any) {
    this.cambiopanel = 1;
    this.formgroup.get('nombre')?.setValue(data.nombre);
    this.formgroup.get('apellido')?.setValue(data.apellido);
    this.formgroup.get('cedula')?.setValue(data.cedula);
    this.formgroup.get('fecha')?.setValue(data.fechaNacimiento);
    this.formgroup.get('sexo')?.setValue(data.sexoId);
    this.formgroup.get('empresa')?.setValue(data.empresaId);
    this.idcliente = data.clienteId;
  }
  cambios() {
    let value = this.formgroup.value;
    this.json = {
      empresaId: value.empresa,
      sexoId: this.formgroup.get('sexo')?.value,
      nombre: this.formgroup.get('nombre')?.value,
      apellido: this.formgroup.get('apellido')?.value,
      cedula: this.formgroup.get('cedula')?.value,
      fechaNacimiento: this.formgroup.get('fecha')?.value,
      clienteId: this.idcliente,
    };
    this.service.actualizarcliente(this.json).subscribe(
      (res) => {
        this.toastr.success(res.mensaje);
        this.getclientes();
        this.limpiar();
      },
      (error) => {
        this.toastr.warning(error.message);
      }
    );
    console.log(this.json);
  }
  viewdirecciones(data: any) {
    const dialogRef = this.dialog.open(DireccionesComponent, {
      width: '400px',
      data: {
        cliente: data.nombre,
        idcliente: data.clienteId,
      },
    });
  }
  private limpiar() {
    this.formgroup.get('nombre')?.setValue('');
    this.formgroup.get('apellido')?.setValue('');
    this.formgroup.get('cedula')?.setValue('');
    this.formgroup.get('fecha')?.setValue('');
    this.formgroup.get('sexo')?.setValue('');
    this.formgroup.get('empresa')?.setValue('');
  }
  volver() {
    this.limpiar();
    this.cambiopanel = 0;
  }
}
