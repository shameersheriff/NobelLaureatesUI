import axios from "axios";
import { NobelLaureate } from "../models/nobelLaureates.model";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_URL = `${API_BASE_URL}/api/NobelPrize/`;

interface NobelLaureateResponse {
  laureates: NobelLaureate[];
  meta: { offset: number; limit: number; count: number };
}

class NobelLaureateService {
  async getNobelLaureates(
    limit: number,
    offset: number,
    gender: string = "",
    birthDate: string = "",
    deathDate: string = "",
    nobelPrizeCategory: string = ""
  ): Promise<NobelLaureateResponse> {
    const response = await axios.post<NobelLaureateResponse>(
      `${API_URL}laureates`,
      {
        limit,
        offset,
        gender,
        birthDate,
        deathDate,
        nobelPrizeCategory,
      }
    );
    const laureates: NobelLaureate[] = [];
    response.data.laureates.forEach((laureate) =>
      laureates.push(new NobelLaureate(laureate))
    );
    return { laureates: laureates, meta: response.data.meta };
  }

  async getNobelLaureate(id: string): Promise<NobelLaureate> {
    const response = await axios.get<NobelLaureate[]>(
      `${API_URL}laureate/${id}`
    );
    const data = new NobelLaureate(response.data[0]);
    return data;
  }
}

export default new NobelLaureateService();
