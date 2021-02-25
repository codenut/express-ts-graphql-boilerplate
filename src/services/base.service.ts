import { Repository } from "typeorm";
import { Service } from "typedi";

@Service()
export class BaseService<T = any> {
  private repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public findOne(data: any): Promise<T | undefined> {
    return this.repository.findOne(data);
  }

  public save(data: any): Promise<T> {
    return this.repository.save(data);
  }

  public create(data: any): T[] {
    return this.repository.create(data);
  }
}
