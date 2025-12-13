import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { NewsService } from '../../../../../core/services/news/news.service';
import { News } from '../../../../../core/interfaces/news';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { LangService } from '../../../../../core/services/language/lang.service';

Swiper.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  news: News[] = []
  lang: string = 'ar'
  url: string = 'https://realstatesaudi.runasp.net'
  constructor(private _newsService: NewsService, private _lang: LangService) {

  }

  ngOnInit(): void {
    this.getNews()

    const swiper = new Swiper('.mySwiper2', {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
      speed: 500,
    });


    // ===================== language ======================

    this._lang.currentLang$.subscribe(lang => {
      this.lang = lang;
    })
  }

  getNews() {
    this._newsService.getAllNews().subscribe((res) => {
      this.news = res
      console.log(res);

    })

  }


}
