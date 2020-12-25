class Service {
  constructor(repositories) {
    this.repositories = repositories;
  }

  async getRepositories() {
    const repositories = await this.repositories.get();
    return repositories;
  }
}

module.exports = Service;
