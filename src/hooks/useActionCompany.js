import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { fetchCompanyById, fetchCompanyVacansies, patchCompany } from "../store/companySlice";

// Пример: сюда импортируешь все actions

const allActions = {
    fetchCompanyById,
    patchCompany,
    fetchCompanyVacansies
    // Добавляй сюда другие actions
};

export const useActionCompany = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
};
