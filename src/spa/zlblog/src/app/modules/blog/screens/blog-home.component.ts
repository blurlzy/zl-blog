import { Component } from '@angular/core';
// import components
import { BlogListComponent } from '../components/blog-list.component';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [ BlogListComponent ],
  template: `
    <app-blog-list></app-blog-list>
  `,
  styles: ``
})
export class BlogHomeComponent {

}
