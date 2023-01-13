import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BagelCard } from '../../../models/bagelCard';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
    
  bagel: BagelCard = {};
  
  constructor(
    private route: ActivatedRoute,
    private _getCardService:CardService
  ) { }

  ngOnInit(): void {
    this.getBagel(this.route.snapshot.params['cardId']);
  }
  getBagel(_id: string): void {
    this._getCardService.get(_id)
      .subscribe({
        next: (data) => {
          this.bagel = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
