import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables} from 'node_modules/chart.js';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'salary-chart',
  templateUrl: './salary_chart.component.html',
  styleUrls: ['./salary_chart.component.scss']
})
export class SalaryChartComponent implements OnInit {

    @Input() public yearlyData:any;
    public year:string;

    constructor(private utilService:UtilService) {
        this.year = this.yearlyData?.year;
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        let chartLabels = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
        let salaryData = this.getSalaryData(this.yearlyData);
        const data = {
                labels: chartLabels,
                datasets: [{
                    label: 'Month vs Salary',
                    data: salaryData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
            }]
        };
        var myChart = new Chart(`myChart`, {
            type: 'line',
            data: data,
        });
    }

    getSalaryData(yearlyData: any) {
        let salaryData = ["0","0","0","0","0","0","0","0","0","0","0","0"];
        for (let i = 0; i < 12; i++) {
            salaryData[i] = yearlyData.salary[i];
          }
        return salaryData;
    }
  
}


