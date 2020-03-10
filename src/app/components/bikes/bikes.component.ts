import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import { IBikes } from 'src/app/services/Bikes';

@Component({
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {
  bikes: IBikes[] = [];
  filteredList: IBikes[];
  _filterBy: string;
  errorMessage: any;
  
  public get filterBy() : string {
    return this._filterBy;
  }
  
  public set filterBy(v : string) {
    this._filterBy = v;
    this.filteredList = this.filterBy? this.performFilter(this.filterBy) : this.bikes;
  }
  
  pageTitle = "Bikes purchase details";
  constructor(private bikeService: BikeService) { }
  
  ngOnInit(): void {
    this.bikeService.getBikes().subscribe({
      next: bikes =>{
        this.bikes = bikes,
        this.filteredList = this.bikes        
      },
    error: err => this.errorMessage = err
      
    }
    );
  }
  deleteEntry(id: number): void{
    this.bikeService.deleteBikeRegistration(id).subscribe(
      data => {
         this.ngOnInit();
      },
      err => console.log(err)
    
    ); 
    
   
  }
  performFilter(filterString: string): IBikes[]{
    filterString = filterString.toLowerCase();
    return this.bikes.filter((bikes: IBikes)=>
    bikes.name.toLowerCase().indexOf(filterString) !== -1);
  }

}
