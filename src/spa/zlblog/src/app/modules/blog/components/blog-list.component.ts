import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [],
  template: `
    <article>        
        <h2 class="article-title">Welcome to My Minimal Blog</h2>
        <p class="article-meta">Posted on February 4, 2025 by John Doe</p>
                
        <p class="article-tags">
          <strong>Tags: </strong>
          <a href="#">Tech</a>, 
          <a href="#">Life</a>, 
          <a href="#">Other</a>
        </p>

        <!-- MAIN POST CONTENT -->
        <p>
          This is a sample blog post, kept intentionally simple with a 
          black-and-white color scheme. We’re leveraging Bootstrap 5 for easy 
          layout and styling, while a small custom CSS file helps maintain a 
          clean, timeless design.
        </p>
        <p>
          Add multiple paragraphs, images, or any other HTML content here. The 
          styling remains minimal to ensure readability and a crisp layout.
        </p>

        <!-- COMMENTS SECTION (only the count, no individual comments) -->
        <section class="comments-section mt-4">
          <h3>Comments (2)</h3>
        </section>
    </article>

        <article>        
        <h2 class="article-title">Welcome to My Minimal Blog</h2>
        <p class="article-meta">Posted on February 4, 2025 by John Doe</p>
                
        <p class="article-tags">
          <strong>Tags: </strong>
          <a href="#">Tech</a>, 
          <a href="#">Life</a>, 
          <a href="#">Other</a>
        </p>

        <!-- MAIN POST CONTENT -->
        <p>
          This is a sample blog post, kept intentionally simple with a 
          black-and-white color scheme. We’re leveraging Bootstrap 5 for easy 
          layout and styling, while a small custom CSS file helps maintain a 
          clean, timeless design.
        </p>
        <p>
          Add multiple paragraphs, images, or any other HTML content here. The 
          styling remains minimal to ensure readability and a crisp layout.
        </p>

        <!-- COMMENTS SECTION (only the count, no individual comments) -->
        <section class="comments-section mt-4">
          <h3>Comments (2)</h3>
        </section>
    </article>
  `,
  styles: ``
})
export class BlogListComponent {
  
}
