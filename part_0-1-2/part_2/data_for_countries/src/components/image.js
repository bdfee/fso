const Image = ({ src, alt }) => {
  const styles = {
    border: '2px solid grey'
  }
  return <img src={src} alt={alt} style={styles}></img>
}

export default Image
