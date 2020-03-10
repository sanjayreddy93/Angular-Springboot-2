import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.css']
})
export class ViewRegistrationComponent implements OnInit {
pageTitle: string = "Character Details";
  public bikeReg;
  public id: number;
  constructor(private bikeService: BikeService,
     private activatedRoute: ActivatedRoute,
     private router: Router,
     private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const param = +this.activatedRoute.snapshot.paramMap.get('id');
    if(param){
      this.id = +param;
      this.getBikeReg(this.id);
    }
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
  EditDetails(info){
    console.log(info);
  }
}
