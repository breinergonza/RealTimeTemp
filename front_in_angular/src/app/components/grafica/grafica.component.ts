import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public lineChartData: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Temperatura: Raspberry Pi'}
  ];

  // public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril' ];
  public lineChartLabels: Array<any> = ['min_5', 'min_15', 'min_25', 'min_35', 'min_45', 'min_55'];
  public listTable:[];
  public claseCss:"none";


  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {

    this.getData();
    this.escucharSocket();

  }

  getData() {
    this.http.get(`${environment.url}/grafica`)
      .subscribe( (data: any) =>{this.lineChartData = data;
        data.forEach(element => {
          this.listTable = element.data;
          element.data.forEach(item => {
            console.log('item',item);
            if(item > 2) {
              claseCss:'bg-primary';
            }
          });
        });
      });
  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica')
      .subscribe( (data: any) => {
        console.log('socket', data);
        this.lineChartData = data;
        data.forEach(element => {
          this.listTable = element.data;
          element.data.forEach(item => {
            console.log('item', item);
            if (item > 2) {
              claseCss:"bg-primary";
            }
          });
        });
     });
  }
}
