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
  championsEnemy: Champion[];
  battleStarted: boolean = false;
  battleResult: string[] = ['', '', '', '', ''];
  finalResult: string = '';

  constructor() { }

  ngOnInit(): void {
    this.refresh();
    // Sort Champions alphabetically
    this.championsList.sort((a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)));
  }

  // Return Champion's class from his name
  setChampionAttributes(championName: string, team = '') {
    // Hero
    if (team === 'Hero' || team === '') {
      this.champions.forEach(champion => {
        if (champion.name === championName) {
          this.championsList.forEach(championTemplate => {
            if (championTemplate.name === championName) {
              champion.class = championTemplate.class;
              champion.image = championTemplate.image;
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
              champion.image = championTemplate.image;
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
      let randomNumber = Math.floor(Math.random() * (this.championsList.length - 1)) + 1;
      champion.name = this.championsList[randomNumber].name;
      this.setChampionAttributes(champion.name, 'Hero');
    });
  }

  randomizeEnemies() {
    this.championsEnemy.forEach(champion => {
      let randomNumber = Math.floor(Math.random() * (this.championsList.length - 1)) + 1;
      champion.name = this.championsList[randomNumber].name;
      this.setChampionAttributes(champion.name, 'Enemy');
    });
  }

  // 5 v 5
  battle() {
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

    let win = 0;
    let lose = 0;
    this.battleResult.forEach(result => {
      if (result === 'win') win++;
      if (result === 'lose') lose++;
    });
    if (win > lose) this.finalResult = 'win';
    if (win === lose) this.finalResult = 'draw';
    if (win < lose) this.finalResult = 'lose';
  }

  // 1 v 1
  fight(firstClass: string, secondClass: string) {
    let winner: string = '';
    if (firstClass === secondClass) {
      winner = firstClass;
    } else {
      switch (firstClass) {
        case 'Warrior':
          if (secondClass === 'Assassin' || secondClass === 'Monk') winner = firstClass;
          if (secondClass === 'Mage' || secondClass === 'Hunter') winner = secondClass;
          break;
        case 'Assassin':
          if (secondClass === 'Mage' || secondClass === 'Hunter') winner = firstClass;
          if (secondClass === 'Warrior' || secondClass === 'Monk') winner = secondClass;
          break;
        case 'Mage':
          if (secondClass === 'Warrior' || secondClass === 'Hunter') winner = firstClass;
          if (secondClass === 'Assassin' || secondClass === 'Monk') winner = secondClass;
          break;
        case 'Hunter':
          if (secondClass === 'Warrior' || secondClass === 'Monk') winner = firstClass;
          if (secondClass === 'Mage' || secondClass === 'Assassin') winner = secondClass;
          break;
        case 'Monk':
          if (secondClass === 'Mage' || secondClass === 'Assassin') winner = firstClass;
          if (secondClass === 'Warrior' || secondClass === 'Hunter') winner = secondClass;
          break;
        default:
          winner = firstClass;
          break;
      }
    }
    return winner;
  }

  refresh() {
    this.battleStarted = false;
    this.finalResult = '';
    this.clearResults();
    this.clearAllChampions();
    this.randomizeEnemies();
    this.randomizeHeroes()
  }

  log() {
    console.log(this.champions);
  }

}
