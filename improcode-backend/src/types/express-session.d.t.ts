import 'express-session';
import { Credentials } from 'google-auth-library';

declare module 'express-session' {
    interface Session {
        token?: Credentials;
    }
}