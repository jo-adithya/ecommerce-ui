import { _fetch } from './base.api';

export function signUpApi(email: string, password: string) {
  return _fetch('/api/auth/signup', {
    method: 'POST',
    body: { email, password },
  });
}
