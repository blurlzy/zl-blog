import { Component } from '@angular/core';
// import components
import { BlogListComponent } from '../components/blog-list.component';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [ BlogListComponent ],
  template: `
  <div class="row">
    <div class="col-12">
         <app-blog-list></app-blog-list>
    </div>
  </div>
 
  `,
  styles: ``
})
export class BlogHomeComponent {

}
