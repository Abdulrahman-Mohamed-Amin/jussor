import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class MetaService {
constructor(private title: Title, private meta: Meta) {}

  update(data: { title: string;description: string;  keywords?: string;}) {
    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description});

    if (data.keywords) {
      this.meta.updateTag({name: 'keywords', content: data.keywords});
    }
  }
}
