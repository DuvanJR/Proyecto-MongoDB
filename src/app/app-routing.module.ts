import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorComponentComponent } from './ContenedorComponent/ContenedorComponent.component';
import { SeeDetailsComponent } from './pages/see-details/see-details.component';


const routes: Routes = [
  { path: 'universtars/menu', component: ContenedorComponentComponent },
  { path: 'universtars/menu/ver-detalle', component: SeeDetailsComponent },
  { path: '', redirectTo: 'universtars/menu', pathMatch: 'full' },
  { path: '**', redirectTo: 'universtars/menu' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
