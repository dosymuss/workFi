import { useState } from "react"
import documIcon from "../../../assets/profile/documIcon.svg"


import styles from "./DocumInpWatch.module.scss"

const DocumInpWatch = ({ docum }) => {

    return (
        <div>
            <div className={styles.titleDiv}>
                <p>Your documents</p>
            </div>

            <div className={styles.documLinkWrap}>
                {
                    docum?.map((documItem, index) => {

                        return (
                            <div className={styles.linkWrap} key={documItem?.url || index}>
                                <a
                                    className={styles.documLink}
                                    target="_blank"
                                    href={documItem?.url}
                                    rel="noopener noreferrer"
                                >
                                    <img src={documIcon} alt="" />
                                    <span>{documItem?.name}</span>
                                </a>
                            </div>
                        );
                    })
                }
            </div>

        </div>
    )
}

export default DocumInpWatch
