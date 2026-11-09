import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { fetchAllVacansy, fetchSearchVacansy, fetchVacansyById, filterVacansiesByTechnologies, patchVacansy, setSearchVacansy } from "../store/vacansySlice";

// Пример: сюда импортируешь все actions

const allActions = {
    fetchAllVacansy,
    fetchVacansyById,
    fetchSearchVacansy,
    setSearchVacansy,
    patchVacansy,
    filterVacansiesByTechnologies
    // Добавляй сюда другие actions
};

export const useActionVacansy = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
};
