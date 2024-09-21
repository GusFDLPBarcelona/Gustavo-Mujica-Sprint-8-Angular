import { Injectable } from '@angular/core';
import { OAuth2Client } from 'google-auth-library';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new OAuth2Client(
      '842510604963-pc10r1b204dbnqu2g87qd0niu03gg704.apps.googleusercontent.com',
      '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',
      'http://localhost:4200'
    );
  }

  async authenticate() {
    const authorizeUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
    });
    window.location.href = authorizeUrl;
  }

  async getToken(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
  }
}
