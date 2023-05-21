import { DiaryEntry } from "../../types"

const Entry = ({ entry }: {entry: DiaryEntry}) => {
  return (
    <li>
        <h3>{entry.date}</h3>
        <p>
          visibility: {entry.visibility}<br />
          weather: {entry.weather}<br />
        </p>
    </li>
  )
}

export default Entry