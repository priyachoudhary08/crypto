import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:1000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      1000: {
        items: 5
      }
    },
    nav: true
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  usd:any
  list:any=[]
  coin:any=[]
  length:any
  title='Cryptocurrency Prices by Market Cap'
  
  displayedColumns: string[] = ['market_cap_rank', 'name','current_price','price_change_percentage_1h_in_currency', 'price_change_percentage_24h_in_currency','price_change_percentage_7d_in_currency','total_volume', 'market_cap', 'Last 7days'];
   dataSource :any;
  pagenumber:any=0
  currentPage:any=0
  pageSize:any=25
  constructor(private api:ApiService , private router:Router) { }
  
  ngOnInit(): void {
    this.api.currencyvalue.subscribe((data:any)=>{
      console.log(data,'html');
      this.usd=data
      this.api.getcoinlist(this.usd , this.currentPage).subscribe((res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }); 
        res.filter((x:any)=>{
          this.coin.push(x.id)
        })
        console.log(this.coin,'coin');
        this.coin.filter((x:any)=>{
          this.chart(x)
          
        })
        console.log(res,'coinlist');
        
      })
    })
    
  }
  
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.ngOnInit();
  }
  

  chartvalue(data:any, id:any) {
    // console.log(data, 'chart')
//@ts-ignore
      Highcharts.chart(`${id}`, {
          chart: {
            height: 100,
            width:200,
              zoomType: 'x',
            
          },
          title: {
              text:null,
              align: 'left'
          },
          subtitle: {
              text: null,
              align: 'left'
          },
          xAxis: {
            visible:false,
          },
          yAxis: {
           visible:false,
          },
          legend: {
              enabled: false
          },
          plotOptions: {
              area: {
                // color:id.price_change_percentage_7d_in_currency>0?'#00FF00':'#FF0000',
                fillColor:'white',
                  // fillColor: {
                  //     linearGradient: {
                  //         x1: 0,
                  //         y1: 0,
                  //         x2: 0,
                  //         y2: 1
                  //     },
                  //     stops: [
                  //         [0, Highcharts.getOptions().colors![0]],
                  //         [1, Highcharts.color(Highcharts.getOptions().colors![0]).setOpacity(0).get('rgba')]
                  //     ]
                  // },
                  marker: {
                      radius: 2
                  },
                  lineWidth: 1,
                  states: {
                      hover: {
                          lineWidth: 1
                      }
                  },
                  threshold: null
              }
          },

          series: [{
              // type: 'area',
              name: 'id',
              color:id.price_change_percentage_7d_in_currency > 0 ? '#FF0000':'#00FF00',
              data: data
          }]
      });
  }


  chart(coin:any){
    this.api.chart(this.usd,coin,7).subscribe((res:any)=>{
      console.log(res, 'chart')
      this.chartvalue(res.prices , coin)
    })
  }
  showchart(coin:any){
    this.router.navigate(['/coins'],{queryParams:{coin: coin}})
  }
}
