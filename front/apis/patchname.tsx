import URL from '@assets/url';

export const patchname = async (user_id = '', username = '') => {
  return await fetch(`https://${URL.server_url}/username/${user_id}?username=${username}`, {
    method: 'PATCH',
    cache: 'no-store',
    mode: 'cors',
    body: JSON.stringify({ username: username }),
  }).then((res) => {
    return res.json();
  });
};
