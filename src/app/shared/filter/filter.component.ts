import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UniversityModel } from 'src/app/models/university';
import { UniversityServiceService } from 'src/app/service/university-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public information: any[] = [];
  public city: string[] = [];
  constructor(private universityService: UniversityServiceService) {}
  filter: boolean = false;
  public loading: boolean = false;
  @Output() result = new EventEmitter();
  @Output() todosCiudad = new EventEmitter();

  ngOnInit(): void {
    this.getUniversity();
  }

  getUniversity(): void {
    // Activar el loader
    this.loading = true;
  
    this.universityService.getUniversity().subscribe(
      (res: UniversityModel[]) => {
        // Desactivar el loader y actualizar la información
        this.loading = false;
        this.information = res;
  
        // Lógica adicional para obtener ciudades sin duplicados
        this.city = [...new Set(res.map(item => item.city))];
      },
      (error) => {
        // En caso de error, desactivar el loader
        this.loading = false;
        console.error('Error al obtener la información de la universidad', error);
      }
    );
  }
  

  filterByCity(city: string) {
    this.result.emit(city);
  }

  seeFilter() {
    this.filter = !this.filter;
  }

  mostrarTodo() {
    this.todosCiudad.emit();
  }
}
