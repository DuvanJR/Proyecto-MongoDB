import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { University } from 'src/app/models/university';
import { UniversityServiceService } from 'src/app/service/university-service.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommentsModel } from 'src/app/models/comments';
@Component({
  selector: 'app-see-details',
  templateUrl: './see-details.component.html',
  styleUrls: ['./see-details.component.scss']
})
export class SeeDetailsComponent implements OnInit{
  public information: any[] = [];
  public city: any;
  public datosRecibidos!: any[];
  public dataReciber!:any;
  public universityName!:string;
  public dataComments!:CommentsModel[];
  public like: boolean = true;
  constructor(private router: Router,
    private universityService: UniversityServiceService,
    public dialogRef: MatDialogRef<SeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: University, ) { }

  back(){
    this.dialogRef.close();
  }
ngOnInit(): void {
  console.log(this.data)
  this.dataReciber = this.data;
  this.getCommentsUniversity();

}
  comentarioTemporal: string = '';
  listaComentarios: { numero: number, comentario: string }[] = [];
  contadorComentarios: number = 0; // Inicializa el contador en 0
  getUniversity(): void {
    this.universityService.getUniversity().subscribe((res: University[]) => {
      this.information = res;

    })
  }
 cambiarEstadoLike() {
    this.like = !this.like; // Cambia el estado de la variable entre true y false
  }
  getCommentsUniversity():void{
    this.universityService.getcomments().subscribe((res: CommentsModel[]) => {
      this.datosRecibidos = res;
      console.log(res)
      res.forEach(res => {
        this.universityName = res.universityName;
        this.like = res.like
      });
      this.dataComments = res;
      this.filtrarComentariosPorUniversidad(this.data.city);

    })
  }
  recibirDatos(datos: any[]) {
    this.datosRecibidos = datos;
  }


  filtrarComentariosPorUniversidad(nombreUniversidad: string) {
    nombreUniversidad= this.universityName
    this.dataComments = this.dataComments.filter((comentario) => comentario.universityName === nombreUniversidad);
  console.log(this.dataComments)
  }

  agregarComentario() {
    this.contadorComentarios++;
    this.listaComentarios.push({ numero: this.contadorComentarios, comentario: this.comentarioTemporal });
    this.comentarioTemporal = '';

    console.log(this.listaComentarios, this.comentarioTemporal)
  }
}
