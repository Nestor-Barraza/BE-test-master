import axios from 'axios';
import { RepositoryDto } from './Dtos/Repositories.dto';

export class RepositoriesService {
  private readonly baseUrl = 'https://api.github.com';

  async getPopularRepos(username: string): Promise<RepositoryDto[]> {
    const url = `${this.baseUrl}/users/${username}/repos`;
    const config = {
      headers: {
        'User-Agent': 'Node.js',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    try {
      const response = await axios.get(url, config);
      const repos = response.data;

      repos.sort((a: RepositoryDto, b: RepositoryDto) => b.stargazers_count - a.stargazers_count);

      return repos.slice(0, 10);
    } catch (error) {
      console.error('Error al obtener los repositorios:', (error as Error).message);
      throw error;
    }
  }
}