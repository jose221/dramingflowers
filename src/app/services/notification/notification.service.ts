import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  API_ENDPOINT = "https://onesignal.com/api/v1/notifications";
  headers = {
    Authorization: "Basic NmM2MmQ0MTktOTk0YS00OWMyLTgzZjMtMjIzMjNiOTkzNjg2",
    "Content-type": "application/json"
  };
  constructor(private http: HttpClient) {}

  sendNotification(body) {
    return this.http.post(this.API_ENDPOINT, body, {
      headers: this.headers
    });
  }
}
