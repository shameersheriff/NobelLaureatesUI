import axios from "../interceptors/axios.interceptor";
import { UserComment } from "../models/userComment.model";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_URL = `${API_BASE_URL}/api/Comment/`;

class CommentService {
  async createComment(
    laureateId: number,
    userId: number,
    comment: string
  ): Promise<UserComment> {
    const response = await axios.post<UserComment>(`${API_URL}`, {
      laureateId,
      userId,
      comment,
    });
    return response.data;
  }

  async getCommentsByNobelLaureates(id: number): Promise<UserComment[]> {
    const response = await axios.get<UserComment[]>(`${API_URL}laureate/${id}`);
    const data: UserComment[] = [];
    response.data.forEach((comment) => data.push(new UserComment(comment)));
    return data;
  }
}

export default new CommentService();
