import { Component, OnInit } from '@angular/core';

import { Champion } from '../../models/champion';
import { CHAMPIONS } from '../../constants/champions';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  championsList: Champion[] = CHAMPIONS;
  champions: Champion[];
  championsEnemy: Champion[];

  constructor() {
    this.champions = [
      { name: '', class: '' },
      { name: '', class: '' },
      { name: '', class: '' },
      { name: '', class: '' },
      { name: '', class: '' },
    ];

    this.championsEnemy = [
      { name: '', class: '' },
      { name: '', class: '' },
      { name: '', class: '' },
      { name: '', class: '' },
      { name: '', class: '' },
    ];
  }

  ngOnInit(): void {
    this.championsEnemy.forEach(champion => {
      let randomNumber = Math.floor(Math.random() * this.championsList.length);
      champion.name = this.championsList[randomNumber].name;
      this.setChampionClass(champion.name, 'Enemy');
    });
  }

  setChampionClass(championName: string, team = '') {
    // MyTeam
    if (team === 'MyTeam' || team === '') {
      this.champions.forEach(champion => {
        if (champion.name === championName) {
          this.championsList.forEach(championTemplate => {
            if (championTemplate.name === championName) {
              champion.class = championTemplate.class;
            }
          });
        }
      });
    } else {
      // EnemyTeam
      this.championsEnemy.forEach(champion => {
        if (champion.name === championName) {
          this.championsList.forEach(championTemplate => {
            if (championTemplate.name === championName) {
              champion.class = championTemplate.class;
            }
          });
        }
      });
    }
  }

  log() {
    console.log(this.champions);
  }

}
