import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subscription, of } from "rxjs";
import { AccountService } from "../../core/auth/account.service";
/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *appHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *appHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
    selector: '[appHasAnyAuthority]',
  })
  export class HasAnyAuthorityDirective implements OnDestroy {
    private authorities: string[] = [];
    private authenticationSubscription?: Subscription;
  
    constructor(private accountService: AccountService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}
  
    @Input()
    set appHasAnyAuthority(value: string | string[]) {
      this.authorities = typeof value === 'string' ? [value] : value;
      console.info('Given AuthList:', value);
      this.updateView();
      // Get notified each time authentication state changes.
      // this.authenticationSubscription = this.accountService.getAuthenticationState().subscribe(() => this.updateView());
      this.authenticationSubscription = of(this.accountService.getAuthenticationState()).subscribe(()=> this.updateView());
    }
  
    ngOnDestroy(): void {
      if (this.authenticationSubscription) {
        this.authenticationSubscription.unsubscribe();
      }
    }
  
    private updateView(): void {
      const hasAnyAuthority = this.accountService.hasAnyAuthority(this.authorities);
      console.info('>>>> ', hasAnyAuthority);
      this.viewContainerRef.clear();
      if (hasAnyAuthority) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }
  }
  