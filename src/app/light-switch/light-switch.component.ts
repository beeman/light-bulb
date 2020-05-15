import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-light-switch',
  templateUrl: './light-switch.component.html',
  styleUrls: ['./light-switch.component.css']
})
export class LightSwitchComponent implements OnInit {

  state$: Observable<'on' | 'off'> = this.route.params.pipe(
    map((params) => params.state)
  );

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  flipSwitch() {
    this.state$.pipe(
      take(1),
      tap((state) => this.doFlipSwitch(state))
    ).subscribe();
  }

  private doFlipSwitch(state: string) {
    state = state === 'on' ? 'off' : 'on';
    this.router.navigate([
      { outlets: { switch: state } }
    ]);
    window.opener.postMessage(`${state}`, '*');
  }

}
