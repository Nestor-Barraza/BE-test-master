import { Controller, Get, Route, Tags, Query } from 'tsoa';
import { RepositoriesService } from './Repositories.services';
import { RepositoryDto } from './Dtos/Repositories.dto';

@Route('repositories')
@Tags('Repositories')
export class RepositoriesController extends Controller {
  private repositoriesService: RepositoriesService;

  constructor() {
    super();
    this.repositoriesService = new RepositoriesService();
  }

  @Get('github/popular-repos')
  async getPopularRepos(@Query() username: string): Promise<RepositoryDto[]> {
    return this.repositoriesService.getPopularRepos(username);
  }
}