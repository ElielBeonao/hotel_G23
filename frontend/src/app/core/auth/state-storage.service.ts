import { Injectable } from '@angular/core';
// import { SessionStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  private previousUrlKey = 'previousUrl';

  constructor(
    // private $sessionStorage: SessionStorageService
    ) {}

  storeUrl(url: string): void {
    // this.$sessionStorage.store(this.previousUrlKey, url);
    sessionStorage.setItem(this.previousUrlKey, url);
  }

  getUrl(): string | null | undefined {
    // return this.$sessionStorage.retrieve(this.previousUrlKey);
    return sessionStorage.getItem(this.previousUrlKey);
  }

  clearUrl(): void {
    // this.$sessionStorage.clear(this.previousUrlKey);
    sessionStorage.removeItem(this.previousUrlKey);

  }
}