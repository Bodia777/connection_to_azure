import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiHttpClient} from './http-service';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'docker-example';
  protected inputControl = new FormControl('', [Validators.required]);
  private httpService = inject(ApiHttpClient);
  dbData: WritableSignal<string[]> = signal([]);
  redisData: WritableSignal<string[]> = signal([]);

  save(resource: 'db' | 'redis') {
    if (resource === 'db' && this.inputControl.value?.trim()) {
      this.httpService.postToDB(this.inputControl.value).subscribe();
    } else if(resource === 'redis' && this.inputControl.value?.trim()) {
      this.httpService.postToRedis(this.inputControl.value).subscribe();
    }
  }

  getFromDb() {
    this.httpService.getFromDB()
      .subscribe(res => {
        this.dbData.set(res);
      })
  }

  getFromRedis() {
    this.httpService.getFromRedis()
    .subscribe(res => {
      this.redisData.set(res);
    })
  }
}
