import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UniversityServiceService } from '../service/university-service.service';
import { UniversityModel } from '../models/university';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { SeeDetailsComponent } from '../pages/see-details/see-details.component';
@Component({
  selector: 'app-ContenedorComponent',
  templateUrl: './ContenedorComponent.component.html',
  styleUrls: ['./ContenedorComponent.component.scss'],
})
export class ContenedorComponentComponent implements OnInit {
  public information: any[] = [];
  public copyInformation: any[] = [];
  public city: string[] = [];
  public visits!: number;
  public loading: boolean = false;
  @Output() datosFiltrados = new EventEmitter<any[]>();

  constructor(
    private router: Router,
    private universityService: UniversityServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUniversity();
  }

  filtrar(city: string) {
    // Guardar la información original
    this.copyInformation = this.information;

    // Activar el loader
    this.loading = true;

    // Filtrar la información por ciudad
    this.information = [];
    this.universityService.getUniversityByCity(city).subscribe(
      (data) => {
        // Desactivar el loader y actualizar la información
        this.loading = false;
        this.information = data;
      },
      (error) => {
        // En caso de error, restaurar la información original y desactivar el loader
        this.loading = false;
        this.information = this.copyInformation;
        console.error('Error al filtrar por ciudad', error);
      }
    );
  }

  getUniversity(): void {
    // Activar el loader
    this.loading = true;
  
    this.universityService.getUniversity().subscribe(
      (res: UniversityModel[]) => {
        // Desactivar el loader y actualizar la información
        this.loading = false;
        this.information = res;
        this.copyInformation = res;
  
        // Lógica adicional para obtener ciudades sin duplicados
        this.city = [...new Set(res.map(item => item.city))];
      },
      (error) => {
        // En caso de error, restaurar la información original y desactivar el loader
        this.loading = false;
        this.information = this.copyInformation;
        console.error('Error al obtener la información de la universidad', error);
      }
    );
  }
  

  getVisits(idUniversity: number): void {
    // Llamada al servicio para obtener el total de visitas
    this.universityService.getVisitsById(idUniversity).subscribe({
      next: (data) => {
        // Encuentra la universidad correspondiente en la lista
        const universityToUpdate = this.information.find(
          (u) => u.idUniversity === idUniversity
        );
        if (universityToUpdate) {
          // Actualiza directamente la propiedad visits
          universityToUpdate.visits = data.visits;
        }
        // Muestra el total de visitas en la consola
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  see(name: string) {
    const universityByName = this.information.filter(
      (item) => item.name === name
    );
    this.datosFiltrados.emit(universityByName);
  }

  openDialog(name: string): void {
    const universityByName = this.information.filter(
      (item) => item.name === name
    );
    this.datosFiltrados.emit(universityByName);
    const dialogRef = this.dialog.open(SeeDetailsComponent, {
      data: universityByName,
      panelClass: 'custom-modalConsul',
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
