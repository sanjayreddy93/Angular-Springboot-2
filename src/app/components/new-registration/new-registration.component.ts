import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

@Component({

  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css']
})
export class NewRegistrationComponent implements OnInit {
  pageTitle: string= "Welcome to Rockstar Character Registry Service";
    models: string[] = [
      'Globo Time Trial Blade',
      "Globo Carbon Fiber Race Series",
      "Globo MTB 29 Full Suspension",
      "Grand Canyon:ON WMN AL 8.0 NEU",
      "DAS SPECTRAL CFR 9.0"

    ]
    isVisible: boolean = true;
    bikeForm: FormGroup
    validMessage: string= "";
    constructor(private bikeService: BikeService,
                private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bikeForm= this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      phone: '',
      notification:'email',
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      purchasePrice: ['', Validators.required],
      contact: new FormControl()
    });
    this.bikeForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

  } 

  submitRegistration(){
    if(this.bikeForm.valid){
      this.validMessage="Your bike registration has been Submitted. Thank you! :)";
      this.isVisible = false;
      this.bikeService.createBikeRegistration(this.bikeForm.value).subscribe(
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

  setNotification(notifyVia: string):void{
    const phoneControl = this.bikeForm.get('phone');

    if(notifyVia === 'text'){
      phoneControl.setValidators(Validators.required);
    }
    else{
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}



