import { UniversityModel } from './../../models/university';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversityServiceService } from 'src/app/service/university-service.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentsModel } from 'src/app/models/comments';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/service/Snackbar.service';
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
  public usuario!: string;
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
    private snackbarService: SnackbarService
  ) {}

  back() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.dataReciber = this.data;
    const { idUniversity, name } = this.data[0];
    this.filterIdUniversity = idUniversity;
    this.universityNames = name;
    console.log('ID UNIVERSIDAD:', idUniversity);
    console.log('data de la universidad', this.data);
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

  getUniversity(): void {
    this.universityService
      .getUniversity()
      .subscribe((res: UniversityModel[]) => {
        this.information = res;
      });
  }

  updateLikeStatus(comment: any): void {
    const newLikeStatus = !comment.like;
    this.universityService.darLike(comment.usuario, newLikeStatus).subscribe(
      (data) => {
        console.log(
          `Estado de like actualizado para ${comment.usuario}:`,
          data
        );
        // Actualiza el estado de like en el comentario
        comment.like = newLikeStatus;
        this.snackbarService.openSnackBar('Like actualizado', 'Cerrar');
      },
      (error) => {
        console.error(
          `Error al actualizar el estado de like para ${comment.usuario}:`,
          error
        );
        this.snackbarService.openSnackBar('Error al actualizar like', 'Cerrar');
      }
    );
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
          console.log(res, 'hola');
          this.formComments.reset();
          this.getCommentsUniversity();
          this.snackbarService.openSnackBar('Comentario creado', 'Cerrar');
        });
    }
  }

  //resetea el formulario cuando se manda
  resetForm() {
    this.formComments.reset();
  }

  //asocia cada comentario al id de la universidad
  //enseguida muestra el comentario sin actualziar la pagina
  getCommentsUniversity(): void {
    this.universityService
      .getcomments(this.filterIdUniversity)
      .subscribe((res: CommentsModel[]) => {
        this.datosRecibidos = res;
        /*console.log(res, 'esto que tira');*/
        res.forEach((res) => {
          this.universityNames = res.universityName;
          (this.like = res.like),
            (this.user = res.usuario),
            (this.idUniversity = res.idUniversity);
        });
        console.log('comentarios filtrados por id', res);
        this.dataComments = res;
      });
  }

  recibirDatos(datos: any[]) {
    this.datosRecibidos = datos;
  }
}
