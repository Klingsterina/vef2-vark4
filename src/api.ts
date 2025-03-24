import { Category, CategoryPostBody, Question, QuestionPostBody } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8000';

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (e) {
      console.error('error fetching from api', url, e);
      return null;
    }

    if (!response.ok) {
      console.error('non 2xx status from API', url);
      return null;
    }

    if (response.status === 404) {
      console.error('404 from API', url);
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error('error parsing json', url, e);
      return null;
    }

    return json as T;
  }

  async postToApi<T>(url: string, body: T): Promise<Response | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error('error fetching from api', url, e);
      return null;
    }
    return response
  }

  async deleteFromApi(url: string): Promise<Response | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    catch (e) {
      console.error('error fetching from api', url, e);
      return null;
    }
    return response
  }

  async getCategory(slug: string): Promise<Category | null> {
    const url = BASE_URL + `/questions?category=${slug}`;

    const response = await this.fetchFromApi<Category | null>(url);
    return response;
  }

  async getCategories(): Promise<Category[] | null> {
    const url = BASE_URL + '/categories';

    const response = await this.fetchFromApi<Category[]>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async getQuestions(
    categorySlug: string,
  ): Promise<Question[] | null> {
    const url = BASE_URL + `/questions?category=${categorySlug}`;
    const response = await this.fetchFromApi<Question[]>(url);
    return response;
  }

  async createQuestion(body: QuestionPostBody): Promise<boolean> {
    const url = BASE_URL + '/questions';
    const response = await this.postToApi<QuestionPostBody>(url, body);
    if (!response) {
      return false;
    }
    return response.ok ? true : false;    
  }

  async createCategory(body: CategoryPostBody): Promise<boolean> {
    const url = BASE_URL + '/categories';
    const response = await this.postToApi<CategoryPostBody>(url, body);
    if (!response) {
      return false;
    }
    return response.ok ? true : false;
  }

  async deleteCategory(slug: string): Promise<boolean> {
    const url = `${BASE_URL}/categories/${slug}`;
  
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
  
      return response.ok;
    } catch (e) {
      console.error('Villa við eyðingu:', e);
      return false;
    }
  }

  async patchCategory(slug: string, title: string): Promise<boolean> {
    const url = `${BASE_URL}/categories/${slug}`;
  
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
  
      return response.ok;
    } catch (e) {
      console.error('Villa við breytingu:', e);
      return false;
    }
  }
  
}