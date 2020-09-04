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
  battleStarted: boolean = false;
  battleResult: string[] = ['', '', '', '', ''];

  constructor() { }

  ngOnInit(): void {
    this.refresh();
  }

  setChampionClass(championName: string, team = '') {
    // Hero
    if (team === 'Hero' || team === '') {
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
      // Enemy
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

  clearAllChampions() {
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

  clearResults() {
    this.battleResult = [];
  }

  randomizeHeroes() {
    this.champions.forEach(champion => {
      let randomNumber = Math.floor(Math.random() * this.championsList.length);
      champion.name = this.championsList[randomNumber].name;
      this.setChampionClass(champion.name, 'Hero');
    });
  }

  randomizeEnemy() {
    this.championsEnemy.forEach(champion => {
      let randomNumber = Math.floor(Math.random() * this.championsList.length);
      champion.name = this.championsList[randomNumber].name;
      this.setChampionClass(champion.name, 'Enemy');
    });
  }

  refresh() {
    this.battleStarted = false;
    this.clearResults();
    this.clearAllChampions();
    this.randomizeEnemy();
    this.randomizeHeroes()
  }

  startBattle() {
    this.battleStarted = true;
    this.champions.forEach((champion, index) => {
      if (champion.class === this.championsEnemy[index].class) {
        this.battleResult[index] = 'draw';
      } else {
        let winner = this.fight(champion.class, this.championsEnemy[index].class);
        if (champion.class === winner) {
          this.battleResult[index] = 'win';
        } else {
          this.battleResult[index] = 'lose';
        }
      }
    });
  }

  fight(firstClass: string, secondClass: string) {
    let winner = '';

    switch (firstClass) {
      case 'Warrior':
        switch (secondClass) {
          case 'Warrior':
            winner = 'Warrior';
            break;
          case 'Assassin':
            winner = 'Warrior';
            break;
          case 'Mage':
            winner = 'Mage';
            break;
          case 'Hunter':
            winner = 'Hunter';
            break;
          case 'Monk':
            winner = 'Warrior';
            break;
          default:
            winner = 'Warrior';
            break;
        }
        break;
      case 'Assassin':
        switch (secondClass) {
          case 'Warrior':
            winner = 'Warrior';
            break;
          case 'Assassin':
            winner = 'Assassin';
            break;
          case 'Mage':
            winner = 'Assassin';
            break;
          case 'Hunter':
            winner = 'Hunter';
            break;
          case 'Monk':
            winner = 'Assassin';
            break;
          default:
            winner = 'Assassin';
            break;
        }
        break;
      case 'Mage':
        switch (secondClass) {
          case 'Warrior':
            winner = 'Mage';
            break;
          case 'Assassin':
            winner = 'Assassin';
            break;
          case 'Mage':
            winner = 'Mage';
            break;
          case 'Hunter':
            winner = 'Mage';
            break;
          case 'Monk':
            winner = 'Monk';
            break;
          default:
            winner = 'Mage';
            break;
        }
        break;
      case 'Hunter':
        switch (secondClass) {
          case 'Warrior':
            winner = 'Hunter';
            break;
          case 'Assassin':
            winner = 'Hunter';
            break;
          case 'Mage':
            winner = 'Mage';
            break;
          case 'Hunter':
            winner = 'Hunter';
            break;
          case 'Monk':
            winner = 'Monk';
            break;
          default:
            winner = 'Hunter';
            break;
        }
        break;
      case 'Monk':
        switch (secondClass) {
          case 'Warrior':
            winner = 'Warrior';
            break;
          case 'Assassin':
            winner = 'Assassin';
            break;
          case 'Mage':
            winner = 'Monk';
            break;
          case 'Hunter':
            winner = 'Monk';
            break;
          case 'Monk':
            winner = 'Monk';
            break;
          default:
            winner = 'Monk';
            break;
        }
        break;
      default:
        // code block
        break;
    }

    return winner;
  }

  log() {
    console.log(this.champions);
  }

}
