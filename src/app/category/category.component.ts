import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  dataSource:any
  title='Top Crypto Categories By Market Cap'
  constructor(private api:ApiService) { }
  displayedColumns: string[] = ['id', 'Category','top Gainers','market_cap', 'volume_24h', 'Last 7days'];

  ngOnInit(): void {
    this.api.categories().subscribe((res:any)=>{
      console.log(res,'categories')
      this.dataSource = new MatTableDataSource(res);
    })
    // this.api.assetPlatforms().subscribe((res:any)=>{
    //   console.log(res,'assetPlatforms')
    // })
  }

}
