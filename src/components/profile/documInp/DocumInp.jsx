import { useState } from "react"
import documIcon from "../../../assets/profile/documIcon.svg"
import plusIcon from "../../../assets/profile/plusIcon.svg"
import DocumModal from "../documModal/DocumModal"
import closeIcon from "../../../assets/profile/xIcon.svg"


import styles from "./DocumInp.module.scss"

const DocumInp = ({ docum, setDocum }) => {
    const [open, setOpen] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const handleDocumDelete = (text) => {
        const filtereDocum = docum?.filter((item) => item?.name !== text)
        setDocum(filtereDocum)
    }

    return (
        <div>
            <div className={styles.titleDiv}>
                <p>Your documents</p>
                <button onClick={() => setOpen(!open)}>
                    <img src={plusIcon} alt="" />
                </button>
            </div>

            <div className={styles.documLinkWrap}>
                {
                    docum.map((documItem, index) => (
                        <div className={styles.linkWrap}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {hoveredIndex === index && (
                                <button className={styles.deleteDocum} onClick={() => {
                                    handleDocumDelete(documItem?.name)
                                }}>
                                    <img src={closeIcon} alt="" />
                                </button>
                            )}
                            <a
                                key={documItem?.url || index}
                                className={styles.documLink}
                                target="_blank"
                                href={documItem?.url}

                            >
                                <img src={documIcon} alt="" />
                                <span>{documItem?.name}</span>
                            </a>
                        </div>
                    ))
                }
            </div>

            <DocumModal open={open} onClose={() => setOpen(false)} docum={docum} setDocum={setDocum} />
        </div>
    )
}

export default DocumInp
