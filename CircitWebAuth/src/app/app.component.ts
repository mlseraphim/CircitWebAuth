import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IFacebookUser } from '../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Circit Web Auth Frontend';
  fbUser: IFacebookUser = { first_name: '', last_name: '', email: '', id: '' };
  

  constructor(private httpClient: HttpClient, private ref: ChangeDetectorRef) {}


  login = async () => {
    FB.login(async (result: any) => {
      if (result) {
        const headers = new HttpHeaders().set('AuthToken', result.authResponse.accessToken);

        this.httpClient.get<IFacebookUser>("https://localhost:7152/fbinfo", { headers: headers } ).subscribe({
          next: (data: IFacebookUser) => {
            if (data !== null) {
              this.fbUser = data;
              this.ref.detectChanges();
            }
          },
          error: (err) => console.log(err),
          complete: () => console.info('complete')
        });
      }
    });
  };
}