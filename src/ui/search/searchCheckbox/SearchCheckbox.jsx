import { useState } from "react";
import styles from "./SearchCheckbox.module.scss";

const SearchCheckbox = ({ title, name, values, onChange }) => {
    const [selectedValues, setSelectedValues] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        let updated = [];

        if (selectedValues.includes(value)) {
            updated = selectedValues.filter(item => item !== value);
        } else {
            updated = [...selectedValues, value];
        }

        setSelectedValues(updated);
        onChange(updated); // пробрасываем выбранные значения наверх
    };

    return (
        <div>
            <p className={styles.groupTitle}>{title}</p>
            <div className={styles.checkWrap}>
                {
                    values.map((item) => (
                        <label key={item} className={styles.labelWrap}>
                            <input
                                className={styles.check}
                                type="checkbox"  // ✅ ЗАМЕНА
                                name={name}
                                value={item}
                                onChange={handleChange}
                                checked={selectedValues.includes(item)} // ✅ checked state
                            />
                            <span className={styles.filterLabel}></span>
                            <p>{item}</p>
                        </label>
                    ))
                }
            </div>
        </div>
    );
};

export default SearchCheckbox;
