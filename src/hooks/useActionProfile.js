import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { fetchMyProfile, fetchPatchMyProfile, setNewTech } from "../store/profileSlice";

// Пример: сюда импортируешь все actions

const allActions = {
    fetchMyProfile,
    fetchPatchMyProfile,
    setNewTech
    // Добавляй сюда другие actions
};

export const useActionProfile = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
};
