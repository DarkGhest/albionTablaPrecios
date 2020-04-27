import { ItemsService } from './services/items.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbol2', 'symbol3', 'symbol4'];
  ELEMENT_DATA;
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  title = 'albion';
  toppings = new FormControl();
  controlCiudades = new FormControl();
  listaCiudades: any[];
  listaItems: any[];
  constructor(private sVAlbion: ItemsService) {
    this.getItems();
    this.getICiudades();
  }
  selectedValue;
  get selected() {
    return this.selectedValue;
  }
  set selected(val: any[]) {
    let newArray = new Array();
    for (let i = 0; i < val.length; i++) {
      console.log(val[i]);
      newArray[i] = val[i].value;
    }
    let items: any = newArray.join(',');
    this.selectedValue = items;
    this.getPrecies(this.selectedValue, this.selectedCiudades);
  }
  selectedCiudadesValue;
  get selectedCiudades() {
    return this.selectedCiudadesValue;
  }
  set selectedCiudades(val: any[]) {
    let newArray = new Array();
    for (let i = 0; i < val.length; i++) {
      console.log(val[i]);
      newArray[i] = val[i].value;
    }
    let items: any = newArray.join(',');
    this.selectedCiudadesValue = items;
    this.getPrecies(this.selectedValue, this.selectedCiudades);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getItems() {
    this.sVAlbion.getItems().subscribe(
      (data: any[]) => {
        console.log(data);
        this.listaItems = data;
      }
    );
  }
  getICiudades() {
    this.sVAlbion.getCiudades().subscribe(
      (data: any[]) => {
        console.log(data);
        this.listaCiudades = data;
      }
    );
  }
  getPrecies(items: string, ciudades) {
    this.sVAlbion.getPrecies(items, ciudades).subscribe(
      (data: any[]) => {
        console.log(data);
        this.ELEMENT_DATA = this.conversion(data);
        console.log(this.ELEMENT_DATA);
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }
    );
  }
  conversion(oldArray: any[]) {
    let newArray: any = {};
    oldArray.map(
      (row, index) => {
        let old = newArray[oldArray[index].item_id];
        newArray[oldArray[index].item_id] = Object.assign(old ? old : {}, {
          item: oldArray[index].item_id,
          [(oldArray[index].city === 'Fort Sterling') ? 'FortSterling' : oldArray[index].city]: oldArray[index].sell_price_min,
          min: '',
          max: '',
          ganancia: -1
        });
        return row;
      }
    );
    let lastArray: any[] = new Array();
    let i = 0;
    for (let variable in newArray) {
      lastArray[i++] = newArray[variable];
    }

    lastArray = this.verificacion(lastArray);
    return lastArray;
  }
  verificacion(oldArray: any[]) {
    // tslint:disable-next-line: prefer-for-of
    for ( var i = 0; i < oldArray.length; i++) {
      // tslint:disable-next-line: prefer-const
      let newObject = Object.assign({}, oldArray[i]);
      // tslint:disable-next-line: no-string-literal
      delete newObject[ 'item' ];
      // tslint:disable-next-line: no-string-literal
      delete newObject[ 'min' ];
      // tslint:disable-next-line: no-string-literal
      delete newObject[ 'max' ];
      delete newObject[ 'ganancia' ];
      console.log('ajuste', newObject);
      let minValue = 9999999;
      let minposicion: any;
      let maxValue = -1;
      let maxposicion: any;
      // tslint:disable-next-line: prefer-const
      // tslint:disable-next-line: forin
      for (let variable in newObject) {
        // console.log(newObject[variable]);
        if (newObject[variable] < minValue) {
          console.log('Anterior minimo: ' + newObject[variable] + ', nuevo minimo: ' + newObject[variable]);
          minValue = newObject[variable];
          minposicion = variable;
        }
        if (newObject[variable] > maxValue) {
          console.log('Anterior maximo: ' + newObject[variable] + ', nuevo maximo: ' + newObject[variable]);
          maxValue = newObject[variable];
          maxposicion = variable;
        }
      }
      oldArray[i].min = minValue;
      oldArray[i].max = maxValue;
      oldArray[i].ganancia = maxValue - minValue;
    }
    console.log( 'busca menores', oldArray);
    return oldArray;
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface Test1 {
  [s: string]: [string];
}
interface Test2 {
  item2: string;
  Bridgewatch: string;
  Caerleon: string;
}

