import { Component } from '@angular/core';

@Component({
  selector: 'app-quick-link',
  imports: [],
  template: ` 
    <div class="widget mb-2">
      <h4 class="widget-title">🔗 Quick Links</h4>
      <ul class="widget-quick-links">
        <li><a href="https://azureutil.zongyi.me/" target="_blank">→ Azure AI Model Explorer</a></li>
        <li><a href="https://azure.microsoft.com/en-au/updates" target="_blank">→ Azure Updates</a></li>
        <li><a href="https://datacenters.microsoft.com/globe/explore?view=map" target="_blank">→ Azure Datacenters</a></li>
        <li><a href="https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/table/" target="_blank">→ Azure Product Availability</a></li>
        <li><a href="https://blog.fabric.microsoft.com/en-AU/blog/" target="_blank">→ Microsoft Fabric Updates</a></li>
      </ul>
    </div>
  `,
  styles: ``,
})
export class QuickLink {}
