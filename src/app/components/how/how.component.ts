import { Component, OnInit } from '@angular/core';

import { Champion } from '../../models/champion';
import { CHAMPIONS } from '../../constants/champions';

@Component({
  selector: 'app-how',
  templateUrl: './how.component.html',
  styleUrls: ['./how.component.css']
})
export class HowComponent implements OnInit {
  championsList: Champion[] = CHAMPIONS;

  constructor() { }

  ngOnInit(): void {
  }

}
