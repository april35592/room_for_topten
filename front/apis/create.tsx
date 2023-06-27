import URL from '@assets/url';

export const create = async (user_number = 0) => {
  if (10 > user_number && user_number > 2) {
    return await fetch(`https://${URL.server_url}/${user_number}`, {
      method: 'POST',
      cache: 'no-store',
    }).then((res) => {
      return res.json();
    });
  } else {
    return 'err count';
  }
};
