const t = require('tap');
const mocky = require('mocky');
const HttpRepository = require('../http-repository');

const repositories = [
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
];

const mocks = [
  {
    url: '/users/Brarion/repos',
    method: 'get',
    res: JSON.stringify(repositories),
  },
];

t.test('HttpRepository', async (t) => {
  await t.test('create http-repositories', async (t) => {
    const httpRepository = new HttpRepository();
    t.ok(httpRepository);
  });

  await t.test('get with mocky', async (t) => {
    const options = {
      host: 'localhost',
      port: '9001',
    };

    const HttpRepositories = new HttpRepository(options);
    const server = mocky.createServer(mocks).listen(options.port);

    const result = await HttpRepositories.get();
    
    t.same(result.length, 2, 'Length should be equals 2');

    t.same(
      repositories,
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
      'Data should be equals'
    );

    server.close();

    t.end();
  });

  t.end();
});
