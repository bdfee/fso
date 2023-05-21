export interface NewDiaryEntry {
  date: string,
  visibility: string,
  weather: string,
  comment?: string
}

export interface DiaryEntry extends NewDiaryEntry {
  id: number,
}

export interface EntryFormProps {
    message?: string,
    setMessage: (newValue: string) => void,
    onAddEntry: (newValue: NewDiaryEntry) => void
}

export interface MessageProps {
  message: string
}
