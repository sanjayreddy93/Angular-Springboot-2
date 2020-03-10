import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.css']
})
export class ViewRegistrationComponent implements OnInit {
pageTitle: string = "Registration Details";
  public bikeReg;
  bikeForm: FormGroup;
  validMessage: string;
  constructor(private bikeService: BikeService,
     private activatedRoute: ActivatedRoute,
     private router: Router,
     private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const param = +this.activatedRoute.snapshot.paramMap.get('id');
    if(param){
      const id = +param;
      this.getBikeReg(id);
    }
    this.validateForm();
  }

  getBikeReg(id:number){
    this.bikeService.getBike(id).subscribe(
      data=>{
        this.bikeReg = data;
      },
      err => console.log(err),
    )
  }
  onBack(): void{
    this.router.navigate(['./bikes']);
  }

  updateRegistration(id: number, bike){
    if(this.bikeForm.valid){
      this.bikeService.updateBikeRegistration(id, bike).subscribe(
        data => {
          this.bikeForm.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
        
      )
    }else {
      this.validMessage = "Please fill out the form before submitting";
    }
  }
  validateForm(){
    this.bikeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['',]
    })
  }
}
