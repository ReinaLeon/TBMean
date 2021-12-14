import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerData: any;
  message: string = '';
  horiPosition: MatSnackBarHorizontalPosition = 'end';
  vertiPosition: MatSnackBarVerticalPosition = 'top';
  durationSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
  }

  ngOnInit(): void {}

  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      this.message = 'Failed process: Incomplete data';
      this.openMessageError();
    } else {
      this._userService.registerUser(this.registerData).subscribe({
        next: (v) => {
          localStorage.setItem('token', v.token);
          this._router.navigate(['/saveTask']);
          this.message = 'Successfull user register';
          this.openMessageSuccessfull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openMessageError();
        },
      });
    }
  }

  openMessageSuccessfull() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horiPosition,
      verticalPosition: this.vertiPosition,
      duration: this.durationSeconds * 1000,
      panelClass: ['snackBarTrue'],
    });
  }

  openMessageError() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horiPosition,
      verticalPosition: this.vertiPosition,
      duration: this.durationSeconds * 1000,
      panelClass: ['snackBarFalse'],
    });
  }
}
