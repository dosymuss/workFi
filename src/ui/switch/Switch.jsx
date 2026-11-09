import styles from "./Switch.module.scss"; // не забудь стили

const Switch = ({isOn, setIsOn}) => {

    const toggle = () => setIsOn(!isOn);

    return (
        <label className={styles.switch}>
            <input type="checkbox" checked={isOn} onChange={toggle} />
            <span className={styles.slider}></span>
        </label>
    );
};

export default Switch;