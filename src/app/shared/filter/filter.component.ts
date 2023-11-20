import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { University } from 'src/app/models/university';
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
  @Output() result = new EventEmitter();
  @Output() todosCiudad = new EventEmitter();

  ngOnInit(): void {
    this.getUniversity();
  }

  getUniversity(): void {
    this.universityService.getUniversity().subscribe((res: University[]) => {
      this.information = res;
      console.log(res);
      res.forEach((res) => {
        this.city.push(res.city)
      });
      let misCiudades: string[] = this.city;
      let ciudadesSinDuplicados: string[] = [...new Set(misCiudades)];

      this.city = ciudadesSinDuplicados;
      
    });
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
