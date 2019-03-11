import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  heroes:Hero[];

  getHeroes():void{
    this.heroService.getHeroes().subscribe(h=> this.heroes = h.slice(1,5));
  }
}
