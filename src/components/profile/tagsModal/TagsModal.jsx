import React, { useEffect, useRef, useState } from 'react'
import styles from './TagsModal.module.scss'

import closeIcon from "../../../assets/profile/xIcon.svg"
import { useNavigate } from 'react-router-dom'
import { useActionProfile } from '../../../hooks/useActionProfile'

const Tags = ({ text, deleteTech, skills, handleDeleteState }) => {
  const [isHover, setIsHover] = useState(false)

  const handleClickX = () => {
    deleteTech(skills, text)
    handleDeleteState(text)
  }

  return (
    <button
      className={styles.tags}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClickX}
    >
      {isHover ? "x" : text}
    </button>
  )
}

const AddInpWrap = ({ tags, setTags }) => {
  const [value, setValue] = useState("")

  const handleAdd = () => {
    if (value.trim()) {
      setTags([...tags, value.trim()])
      setValue("")
    }
  }



  return (
    <div className={styles.addInpWrap}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder='React.js'
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

const TagsModal = ({ open, onClose, skills, handleTechChange, deleteTech }) => {
  const modalRef = useRef(null)
  const [tags, setTags] = useState(skills)

  const { setNewTech } = useActionProfile()

    const handleDeleteState = (text) => {
    const newTags = tags?.filter(item => item !== text)
    setTags(newTags)
  }

  useEffect(() => {
    const dialog = modalRef.current
    if (!dialog) return

    const handleCancel = (e) => {
      e.preventDefault()
      onClose()

    }

    dialog.addEventListener("cancel", handleCancel)

    if (open) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }

    return () => {
      dialog.removeEventListener("cancel", handleCancel)
    }
  }, [open])

  // Функция закрытия при клике по фону (dialog)
  const handleBackdropClick = (e) => {
    if (e.target.tagName === 'DIALOG') {
      onClose()
    }
  }

  useEffect(() => {
    handleTechChange(tags)
    setNewTech(tags)
  }, [tags])

  return (
    <dialog
      ref={modalRef}
      className={`${styles.dialog} ${styles.centered}`}
      onClick={handleBackdropClick}
    >
      <div className={styles.modalWrap}>
        <div className={styles.titleCloseWrap}>
          <h3>Your skills</h3>
          <button onClick={onClose}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>

        <div className={styles.tagsWrap}>
          {tags?.map((item, index) => (
            <Tags handleDeleteState={handleDeleteState} deleteTech={deleteTech} skills={tags} key={item + index} text={item} />
          ))}
        </div>

        <AddInpWrap tags={tags} setTags={setTags} />
      </div>
    </dialog>
  )
}

export default TagsModal
