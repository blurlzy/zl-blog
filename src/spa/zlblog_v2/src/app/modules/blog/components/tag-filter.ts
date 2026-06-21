import { Component, Input, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-tag-filter',
  imports: [RouterLink],
  template: ` 
    <div class="tag-filter">
      @for (tag of data; track tag) {
        <button class="tag-btn"
          [class.active]="activeTag() === tag"
          [routerLink]="['/']"
          [queryParams]="{ keywords: tag, type: 'tag' }">{{ tag }}</button>
      }
    </div>
  `,
  styles: ``,
})
export class TagFilter {
  @Input({ required: true }) data: any = [];

  private readonly activatedRoute = inject(ActivatedRoute);

  activeTag = toSignal(
    this.activatedRoute.queryParams.pipe(
      map(params => params['type'] === 'tag' ? params['keywords'] : null)
    )
  );
}
