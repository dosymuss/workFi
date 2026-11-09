import styles from "./Tags.module.scss"

const Tags = ({text}) => {
  return (
        <span className={styles.tagsMain}>{text}</span>
  )
}

export default Tags