import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatContact } from '../models/chat-contact';
import { enviroment } from 'src/enviroment/enviroment.dev';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = new URL(enviroment.API_SERVER_URL);
  private contactUrl = new URL('chats', this.baseUrl);

  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<ChatContact[]>(this.contactUrl.toString())
  }
}
