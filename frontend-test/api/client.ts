import axios from 'axios';
import type { SimulateRequest, SimulateResponse } from '../types';

export async function simulateMessage(data: SimulateRequest): Promise<SimulateResponse | string> {
  try {
    const response = await axios.post<SimulateResponse>('/simulate', data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return 'Error: ' + (error.response?.data || error.message);
    } else if (error instanceof Error) {
      return 'Error: ' + error.message;
    } else {
      return 'An unknown error occurred.';
    }
  }
}