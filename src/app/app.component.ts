import { Component , Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl } from '@angular/forms';

import { HeroService } from 'src/app/_services/hero.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HeroApp'; 
  superList: any[] = [];
  selectedSuperList: any[] = [];
  showSuperList: boolean;
  showChart:boolean;
  sSuperName: string;
  nSuperId: number;

  supers = new FormControl();
  superName = new FormControl();
  selected: number[];

  private chart: am4charts.XYChart;

  constructor(
    private heroService: HeroService,
    @Inject(PLATFORM_ID) private platformId, 
    private zone: NgZone) {

  }

  onSearchName(){
    this.heroService.getSearchName(this.sSuperName)
    .subscribe((response: any) => {
      if (response.response==='success') {
        this.superList=response.results;
        console.log(this.superList);
        this.showSuperList = true;
      }
    }, err => {
      let error: any = err.error;
      console.log("Error in onSearchName()",error);
    });
  }
  
  onSelect(event){
    if(event.isUserInput) {
      if(event.source.selected) {
        this.selectedSuperList.push(this.superList.filter(singleItem => singleItem.id===event.source.value));
      } else {
        for (let i =0 ; i<this.selectedSuperList.length;i++) {
          let currentSuper =this.selectedSuperList[i];
          if (currentSuper[0].id==event.source.value) {
            this.selectedSuperList.splice(i,1);
          }
        }
      }
      if(this.selectedSuperList.length===0){
        this.showChart = false;
        this.createChart(false);
      } else {
        this.showChart = true;
        this.createChart(true);
      }
    }
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  createChart(displayChart) {
    // Chart code goes in here
    if(displayChart){
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create("chartdiv", am4charts.RadarChart);
        let data = [];

        for(var i = 0; i < this.selectedSuperList.length; i++){
          let currentSuper =this.selectedSuperList[i];
          let name = currentSuper[0].name;
          let strength = currentSuper[0].powerstats.strength;
          let intelligence = currentSuper[0].powerstats.intelligence;
          let speed = currentSuper[0].powerstats.speed; 
          let durability = currentSuper[0].powerstats.durability;
          let power = currentSuper[0].powerstats.power;
          let combat = currentSuper[0].powerstats.combat; 
          data.push({name, strength, intelligence, speed, durability, power , combat})
        }

        chart.data = data;
        console.log('Chart Data',chart.data);
        
        /* Create axes */
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis<am4charts.AxisRendererCircular>());
        categoryAxis.dataFields.category = "name";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererRadial>());
        valueAxis.extraMin = 0.2;
        valueAxis.extraMax = 0.2;
        valueAxis.tooltip.disabled = true;

        /* Create and configure series */
        let series1 = chart.series.push(new am4charts.RadarSeries());
        series1.dataFields.valueY = "strength";
        series1.dataFields.categoryX = "name";
        series1.strokeWidth = 3;
        series1.tooltipText = "{valueY}";
        series1.name = "Strength";
        series1.bullets.create(am4charts.CircleBullet);

        let series2 = chart.series.push(new am4charts.RadarSeries());
        series2.dataFields.valueY = "intelligence";
        series2.dataFields.categoryX = "name";
        series2.strokeWidth = 3;
        series2.tooltipText = "{valueY}";
        series2.name = "Intelligence";
        series2.bullets.create(am4charts.CircleBullet);

        let series3 = chart.series.push(new am4charts.RadarSeries());
        series3.dataFields.valueY = "speed";
        series3.dataFields.categoryX = "name";
        series3.strokeWidth = 3;
        series3.tooltipText = "{valueY}";
        series3.name = "Speed";
        series3.bullets.create(am4charts.CircleBullet);

        let series4 = chart.series.push(new am4charts.RadarSeries());
        series4.dataFields.valueY = "combat";
        series4.dataFields.categoryX = "name";
        series4.strokeWidth = 3;
        series4.tooltipText = "{valueY}";
        series4.name = "Combat";
        series4.bullets.create(am4charts.CircleBullet);

        let series5 = chart.series.push(new am4charts.RadarSeries());
        series5.dataFields.valueY = "durability";
        series5.dataFields.categoryX = "name";
        series5.strokeWidth = 3;
        series5.tooltipText = "{valueY}";
        series5.name = "Durability";
        series5.bullets.create(am4charts.CircleBullet);

        let series6 = chart.series.push(new am4charts.RadarSeries());
        series6.dataFields.valueY = "power";
        series6.dataFields.categoryX = "name";
        series6.strokeWidth = 3;
        series6.tooltipText = "{valueY}";
        series6.name = "Power";
        series6.bullets.create(am4charts.CircleBullet);
        
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();

        chart.cursor = new am4charts.RadarCursor();

        chart.legend = new am4charts.Legend();  
      });
    }
  }
}  