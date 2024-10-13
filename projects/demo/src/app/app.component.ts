import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  async onSetSimpleQueryParams() {
    await this.router.navigate(['/'], { queryParams: { key: 'value' } });
  }

  async onSetComplexQueryParams() {
    await this.router.navigate(['/'], {
      queryParams: {
        key: { paramName1: 'stringValue', paramName2: [1, 2, 3] },
      },
    });
  }
}
