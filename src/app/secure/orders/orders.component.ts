import {Component, OnInit} from '@angular/core';
import {Order} from '../../interfaces/order';
import {OrderService} from '../../services/order.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('tableState', [
      state('show', style({
        maxHeight: '150px'
      })),
      state('hide', style({
        maxHeight: 0
      })),
      transition('show => hide', animate('1000ms ease-in')),
      transition('hide => show', animate('1000ms ease-out')),
    ])
  ]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  lastPage: number;
  selected: number;
  show = false;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.orderService.all(page).subscribe(
      res => {
        this.orders = res.data;
        this.lastPage = res.meta.last_page;
        this.show = true;
      }
    );
  }

  select(id: number): void {
    this.selected = this.selected === id ? 0 : id;
  }

  itemState(id: number): string {
    return this.selected === id ? 'show' : 'hide';
  }

  export(): void {
    this.orderService.export().subscribe(
      res => {
        const blob = new Blob([res], {type: 'text/csv'});
        const downloadUrl = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'orders.csv';
        link.click();
      }
    );
  }
}
