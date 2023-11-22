import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
public snackBarRef:any;
constructor( private _snackBar: MatSnackBar) { }
openSnackBar(message: string, action: string): void {
  this._snackBar.open(message, action, {
    duration: 5000, // Duración del snackbar en milisegundos
  });
}
}
