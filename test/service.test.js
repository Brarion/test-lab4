const t = require('tap');
const Repositories = require('../repositories');
const Service = require('../service');

class FakeRepositories extends Repositories {
  async get() {
    return [
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
  }
}

t.test('Service', async (t) => {
  await t.test('create service', async (t) => {
    const service = new Service();
    t.ok(service);
  });

  await t.test('Get repositories', async (t) => {
    const repositories = new FakeRepositories();
    const service = new Service(repositories);

    const result = await service.getRepositories();
    t.same(result.length, 2, 'Length should be 2');

    t.end();
  });

  t.end();
});
