import { Service } from "typedi";

@Service()
export class BaseService {
  private repository;

  constructor(repository) {
    this.repository = repository;
  }

  public findOne(data) {
    return this.repository.findOne(data);
  }

  public save(data) {
    return this.repository.save(data);
  }

  public create(data) {
    return this.repository.create(data);
  }
}
