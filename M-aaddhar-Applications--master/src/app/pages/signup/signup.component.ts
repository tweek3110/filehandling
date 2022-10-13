import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userservice: UserService, private snack: MatSnackBar) {}
  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('user is required !!');
      this.snack.open('username is required!!', 'ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //validte

    //adduser:userservice
    this.userservice.adduser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        // alert('sucess');
        swal.fire('Success', 'User is Registered', 'success');
      },
      (error) => {
        //error
        console.log(error);
        // alert('something went worng');
        this.snack.open('Something went Worng!!', '', {
          duration: 3000,
        });
      }
    );
  }
}
