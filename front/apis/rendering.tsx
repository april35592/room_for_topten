import URL from '@assets/url';

export const rendering = async (room_id = '', user_id = `${room_id}_0`) => {
  return await fetch(`https://${URL.server_url}/${room_id}/${user_id}`, {
    method: 'GET',
    cache: 'no-store',
    mode: 'cors',
  }).then((res) => {
    return res.json();
  });
};
