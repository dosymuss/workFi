import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUserById } from '../../../api/auth';
import CompanyLetterModal from '../../companyProfile/companyLetterModal/CompanyLetterModal';

import styles from './VacanseUserCard.module.scss';

const VacanseUserCard = ({ response, vacansyId }) => {

    const [data, setData] = useState({})
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getUserById(response?.userId).then((res) => {
            setData(res.data)
        })
    }, [response])



    return (
        <div className={styles.main}>
            <img src={data?.image} alt="" />

            <div>
                <Link to={`/profile-watch/${data.id}?vacansyId=${vacansyId}`}>{data?.name}</Link>
                <button onClick={() => setOpen(!open)}>Письмо</button>
            </div>
            <CompanyLetterModal open={open} onClose={() => setOpen(!open)} letter={response?.text} />
        </div>
    )
}

export default VacanseUserCard