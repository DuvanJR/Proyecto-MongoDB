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
    this.city = [city];
    this.information = this.copyInformation;
    const result = this.information.filter((universidades) =>
      universidades.city.includes(city)
    );
    this.information = result;
  }

  getUniversity(): void {
    this.universityService
      .getUniversity()
      .subscribe((res: UniversityModel[]) => {
        this.information = res;
        this.copyInformation = res;
        console.log(res);
        res.forEach((res) => {
          this.city.push(res.city);
        });
        let misCiudades: string[] = this.city;
        let ciudadesSinDuplicados: string[] = [...new Set(misCiudades)];
        this.city = ciudadesSinDuplicados;
        console.log('ciudades', ciudadesSinDuplicados);
      });
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
        console.log(`Visitas para ${idUniversity}: ${data.visits}`);
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
    console.log(universityByName);
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
      console.log('The dialog was closed');
    });
  }
}
