import axios from 'axios';
import { NewDiaryEntry, DiaryEntry } from '../../types';
const url = 'http://localhost:3001/api/diaries';

export const getEntries = async () => {
  try {
    const response = await axios.get<DiaryEntry[]>(url)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    } else {
      console.error('Unknown error getting entries ' + error)
      return []
    }
  }
}

export const createEntry = async (object: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(url, object)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    } else {
      console.error(('Unknown error creating entry ' + error))
      return []
    }
  }
} 