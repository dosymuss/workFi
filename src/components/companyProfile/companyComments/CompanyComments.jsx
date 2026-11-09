import { useState } from "react"
import Comments from "../../../ui/comments/Comments"
import CompanyCommentsModal from "../../vacansy/companyCommentsModal/CompanyCommentsModal"
import styles from "./CompanyComments.module.scss"

const CompanyComments = ({ company, companyId }) => {

    const [open, setOpen] = useState(false)

    return (
        <div className={styles.main}>
            <p className={styles.title}>Отзывы компании:</p>
            <div className={styles.commentsWrap}>
                {
                    company?.comments && company?.comments?.length > 0 ?
                        company?.comments?.map((item, index) => (
                            <Comments key={index} comment={item} />
                        )) :
                        <p>Комментариев у этой компании пока что нет</p>
                }
            </div>
            {companyId === company?.id ?
                null :
                <button onClick={() => setOpen(true)} className={styles.addComment}>Написать</button>
            }
            <CompanyCommentsModal open={open} onClose={() => setOpen(false)} comments={company?.comments} companyId={company?.id} />
        </div>
    )

}

export default CompanyComments