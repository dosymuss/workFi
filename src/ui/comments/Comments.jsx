import { useEffect, useState } from 'react';
import { getUserById } from '../../api/auth';

import styles from './Comments.module.scss';
import ProfileIcon from '../../icons/NavIcons/ProfileIcon';

const Comments = ({ comment }) => {

    const [data, setData] = useState({})

    useEffect(() => {
        getUserById(comment?.userId).then((res) => {
            const data = res.data
            console.log(data);

            setData(data)
        })
    }, [])

    if (Object.keys(data).length > 0) {
        return (
            <div className={styles.main}>
                <div className={styles.imageNameWrap}>
                    {
                        data?.image ?
                            <img src={data?.image} alt="" /> :
                            <div className={styles.imageSceleton}>
                                <ProfileIcon />
                            </div>
                    }
                    <div>
                        <p>{data?.name ? data?.name : "test"}</p>
                        <span>{data?.date ? data?.date?.join(".") : "00.00.0000"}</span>
                    </div>
                </div>
                <p className={styles.mainText}>{comment?.text}</p>
            </div>
        )
    }
}

export default Comments