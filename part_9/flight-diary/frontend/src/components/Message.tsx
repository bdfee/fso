import { MessageProps } from "../../types"

const Message = (props: MessageProps) => {
  const style = {color: 'red'}
  return (
      <div style={style}>
        {props.message}
      </div>
  ) 
}

export default Message