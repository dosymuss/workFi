import styles from "./Button.module.scss"

const Button = ({text, handleSubmit, ...props}) => {
  return (
    <button onClick={handleSubmit} className={styles.btn} {...props}>{text}</button>
  )
}

export default Button