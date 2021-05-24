import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { SongsService } from './songs.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


export interface Idata {
  id: {};
  title: {};
  danceability: object;
  energy: object;
  mode: object;
  acousticness: object
}

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'id', 'title', 'danceability', 'energy', 'mode', 'acousticness'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource = new MatTableDataSource();
  p: number = 1;
  idObj: any;  
  mapObj: any;
  renderedData: any;
  
  constructor(private songService : SongsService ) {
  }

  ngOnInit() {
    this.getJsonData();
  }

  getJsonData(){
    this.songService.getJSON().subscribe( (data: Idata[]) => {
      this.idObj = obj => {
        const res = [];
        const keys = Object.keys(data["id"]);
        keys.forEach(key => {
           res.push({
              "id": data["id"][key],
              "title": data["title"][key],
              "danceability": data["danceability"][key],
              "energy": data["energy"][key],
              "mode": data["mode"][key],
              "acousticness": data["acousticness"][key]
           });
        });
        return res;
     };
   this.mapObj = this.idObj()
  //  this.dataSource = this.idObj()
   this.dataSource = new MatTableDataSource(this.mapObj);
  //  this.dataSource.data = [this.idObj()]
   this.dataSource.paginator = this.paginator
   this.dataSource.sort = this.sort;
  });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.connect().subscribe(d => this.renderedData = d);
  }
  pageEvent(event){
    //it will run everytime you change paginator
      this.dataSource.paginator = this.paginator;
     }
  // exportCsv(){
  // new Angular5Csv(this.renderedData,'Test Report');
  // }
}
