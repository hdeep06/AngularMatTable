import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { Observable, of } from 'rxjs';

interface Person {
	firstName: string;
	lastName: string;
	age: number;
}

class PersonService {
	index(): Observable <Array<Person>>{
    let sampleData: Person[] = [
      {firstName:'Aandrew', lastName:'Martin', age:43}, 
      {firstName:'John', lastName:'Rekhtin', age:22},
      {firstName:'Sarah', lastName:'Rohdes', age:65},
      {firstName:'Peter', lastName:'Pan', age:17}
    ]
    return of(sampleData);
  };
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [PersonService]
})

export class AppComponent  {
  constructor(
    private personService: PersonService
  ) { }
  
  displayedColumns: string[] = ['firstName', 'lastName', 'age'];
  dataSource = new MatTableDataSource<Person>([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  ngOnInit() {
    this.personService.index().subscribe((data: Person[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }
}
