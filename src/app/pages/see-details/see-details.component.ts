import { UniversityModel } from './../../models/university';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversityServiceService } from 'src/app/service/university-service.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentsModel } from 'src/app/models/comments';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-see-details',
  templateUrl: './see-details.component.html',
  styleUrls: ['./see-details.component.scss'],
})
export class SeeDetailsComponent implements OnInit {
  public formComments!: FormGroup;
  public information: any[] = [];
  public city: any;
  public universities: any[] = [];
  public datosRecibidos!: any[];
  public dataReciber!: any;
  public universityNames!: string;
  public dataComments!: CommentsModel[];
  public like: boolean = true;
  public user!: string;
  public idUniversity!: number;
  public filterIdUniversity: any;
  public messageModal: string = 'Creado exitosamente';
  public buttonModal: string = 'Undo';
  constructor(
    private router: Router,
    private universityService: UniversityServiceService,
    public dialogRef: MatDialogRef<SeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UniversityModel[],
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  back() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.dataReciber = this.data;
    const { idUniversity, name } = this.data[0];
    this.filterIdUniversity = idUniversity;
    this.universityNames = name;
    console.log(idUniversity, 'aaaaaaaaaaaaasssssssss');
    console.log(this.data, 'modals');
    this.getCommentsUniversity();
    this.formComments = this.fb.group({
      usuario: ['', Validators.required],
      like: [true],
      fecha: [''],
      universityName: [''],
      idUniversity: [''],
      comentario: ['', Validators.required],
    });
  }
  comentarioTemporal: string = '';
  listaComentarios: { numero: number; comentario: string }[] = [];
  contadorComentarios: number = 0; // Inicializa el contador en 0
  getUniversity(): void {
    this.universityService
      .getUniversity()
      .subscribe((res: UniversityModel[]) => {
        this.information = res;
      });
  }

  cambiarEstadoLike() {
    this.like = !this.like;
    this.formComments.patchValue({
      usuario: this.formComments.get('usuario')?.value,
      like: this.like,
      fecha: Date.now(),
      universityName: this.universityNames,
      idUniversity: this.idUniversity,
      comentario: this.formComments.get('comentario')?.value,
      // Puedes agregar más campos según tus necesidades
    });
    this.universityService
      .postComments(this.formComments.value)
      .subscribe((res) => {
        console.log(res,'estadolike');
      });
  }

  onSubmit() {
    if (this.formComments.valid) {
      this.formComments.patchValue({
        usuario: this.formComments.get('usuario')?.value,
        like: this.like,
        fecha: Date.now(),
        universityName: this.universityNames,
        idUniversity: this.filterIdUniversity,
        comentario: this.formComments.get('comentario')?.value,
      });
      const formData = this.formComments.value;
      console.log('Datos enviados:', formData);
      this.universityService
        .postComments(this.formComments.value)
        .subscribe((res) => {
          console.log(res,'hola');
          this.formComments.reset();
          this.getCommentsUniversity();
          if (res.status === 200) {
            /*this.resetForm();*/
            this.showSnackBar('Comentario creado exitosamente');
            
          }
        });
    }
  }
  showSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2000, // Duración en milisegundos
    });
  }
  resetForm() {
    this.formComments.reset();
  }
  getCommentsUniversity(): void {
    this.universityService
      .getcomments(this.filterIdUniversity)
      .subscribe((res: CommentsModel[]) => {
        this.datosRecibidos = res;
        console.log(res, 'esto que tira');
        res.forEach((res) => {
          this.universityNames = res.universityName;
          (this.like = res.like),
            (this.user = res.usuario),
            (this.idUniversity = res.idUniversity);
        });

        console.log(res, 'datos');
        this.dataComments = res;
      });
  }
  recibirDatos(datos: any[]) {
    this.datosRecibidos = datos;
  }

  agregarComentario() {
    this.contadorComentarios++;
    this.listaComentarios.push({
      numero: this.contadorComentarios,
      comentario: this.comentarioTemporal,
    });
    this.comentarioTemporal = '';

    console.log(this.listaComentarios, this.comentarioTemporal);
  }
}
