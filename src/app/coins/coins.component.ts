import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighStocks from 'highcharts/highstock';
import * as Exporting from 'highcharts/modules/exporting';
import { ApiService } from '../api.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
  usd:any
  coin:any
  chartdata:any=[]
  volumeData:any=[]
  marketCaps:any=[]
  days:any='1'
  chartData:any
  timeFrameList = ['1', '7', '14', '30', 'max']
  chartList = ['Graph Chart', 'Candle Chart', 'Volume Chart', 'Market Cap Chart']
  constructor(private api:ApiService, private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.api.currencyvalue.subscribe((data:any)=>{
      // console.log(data,'html');
      this.usd=data
     
    })

    this.route.queryParams.subscribe((params:any)=>{
      this.coin = params['coin']
    })
    this.chartapi()
  }


  candlechart(data:any){
    // Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-ohlc.json', function (data) {
//@ts-ignore
    // create the chart
    HighStocks.stockChart('container', {
      plotOptions: {
        candlestick: {
          color: 'red',
          upColor: 'green'
        }
      },
        rangeSelector: {
            selected: 1
        },

        title: {
            text: (this.coin).toUpperCase() +' CHART'
        },

        series: [{
            type: 'candlestick',
            name: (this.coin).toUpperCase() +' CHART',
            data: data,
            // zones:[{
            //   color:'red',
            // }],
            dataGrouping: {
                units: [
                    [
                        'week', // unit name
                        [1] // allowed multiples
                    ], [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]
                ]
            }
        }]
    });
// });
  }
    chart(data:any) {
      // console.log(data, 'chart')
//@ts-ignore
        Highcharts.chart('container', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text:(this.coin).toUpperCase() +' CHART',
                align: 'left'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
                align: 'left'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors![0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors![0]).setOpacity(0).get('rgba')]
                        ]
                    },
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
                type: 'area',
                name: 'USD to EUR',
                data: data
            }]
        });
    }
    onChange(eve:any){
console.log(eve.target.value)
this.days=eve.target.value

if(this.chartData=='Candle Chart'){
  this.ohlcApi()
}
else {
  this.chartapi()
}
 }
 onChange2(eve:any){
  console.log(eve.target.value)
  this.chartData=eve.target.value
  if(this.chartData=='Graph Chart'){
    this.chart(this.chartdata)
  }
  if(this.chartData=='Volume Chart'){
    this.chart(this.volumeData)
  }
   if(this.chartData=='Market Cap Chart'){
    this.chart(this.marketCaps)
  }
   if(this.chartData=='Candle Chart'){
    this.ohlcApi()

  }
 
}
    chartapi(){
      this.api.chart(this.usd,this.coin,this.days).subscribe((res:any)=>{
    //  console.log(res);
    this.chartdata=res.prices
    this.volumeData=res.total_volumes
    this.marketCaps=res.market_caps
    this.chart(this.chartdata)
    
    // this.candlechart(this.chartdata)
      })  
    }
    ohlcApi(){
this.api.ohlc(this.usd, this.coin, this.days).subscribe((res:any)=>{
  console.log(res)
  this.candlechart(res)
})
    }
}