import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-filter',
  imports: [],
  template: ` 
    <div class="tag-filter">
      @for (tag of data; track tag) {
        <button class="tag-btn">{{ tag }}</button>
      }
    </div>
  `,
  styles: ``,
})
export class TagFilter {
  @Input({ required: true }) data: any = [];
}
