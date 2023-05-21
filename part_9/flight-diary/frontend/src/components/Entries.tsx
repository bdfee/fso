import { DiaryEntry } from "../../types"
import Entry from "./Entry"

const Entries = ({ diaryEntries }: {diaryEntries: DiaryEntry[]}) => {
  return (
    <div>
      <h2>Diary entries</h2>
      <ul>
        {diaryEntries.map((entry) => {
          return <Entry key={entry.id} entry={entry} />
        })}
      </ul>
    </div>
  )
}

export default Entries