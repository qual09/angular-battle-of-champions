import { Component, OnInit } from '@angular/core';

import { Champion } from '../../models/champion';
import { CHAMPIONS } from '../../constants/champions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  championsList: Champion[] = CHAMPIONS;
  champions: Champion[];

  constructor() {
    this.champions = [
      { name: '', class: '' },
      { name: '', class: '' },
      { name: '', class: '' },
      { name: '', class: '' },
      { name: '', class: '' },
    ]
  }

  ngOnInit(): void {

  }

  setClass(championName: string) {
    this.champions.forEach(champion => {
      if (champion.name === championName) {
        this.championsList.forEach(championTemplate => {
          if (championTemplate.name === championName) {
            champion.class = championTemplate.class;
          }
        });
      }
    });
  }

  log() {
    console.log(this.champions);
  }

}
