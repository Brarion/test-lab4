const t = require('tap');
const axios = require('axios');

t.test('API', (t) => {
  t.test('Mock API', (t) => {
    const userId = 'Brarion';

    axios
      .get(
        `https://25378d22-5ec6-4002-9d97-4eb4892bbfca.mock.pstmn.io/users/${userId}/repos`
      )
      .then((res) => {
        t.same(
          res.data,
          [
            {
              id: 1,
              name: 'test1',
              full_name: 'Brarion/test1',
              owner: {
                login: 'Brarion',
                id: 1,
              },
            },
            {
              id: 2,
              name: 'test2',
              full_name: 'Brarion/test2',
              owner: {
                login: 'Brarion',
                id: 1,
              },
            },
          ],
          "Mock API isn't work"
        );
      })
      .catch((error) => {
        t.notOk(error, 'Error');
      })
      .finally(() => {
        t.end();
      });
  });

  t.test('GitHub API', (t) => {
    const userId = 'Brarion';

    axios
      .get(`https://api.github.com/users/${userId}/repos`)
      .then((res) => {
        t.same(
          res.data.length,
          11,
          "GitHub API should return respos of user with id 'Brarion'"
        );
      })
      .catch((error) => {
        t.notOk(error, 'Error');
      })
      .finally(() => {
        t.end();
      });
  });

  t.end();
});
