import { useEffect } from "react";

type HandleModalFormType = {
    modalForm: `edit ${string}` | null;
    setModalForm: (value: `edit ${string}` | null) => void;
    formRef: React.RefObject<HTMLFormElement | null>;
}

export const useHandleModalForm = ({ modalForm, setModalForm, formRef }: HandleModalFormType) => {
    useEffect(() => {
        if (!modalForm) return; // si no hay modal, no hace nada

        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setModalForm(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.body.classList.add("no-scroll");

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.classList.remove("no-scroll");
        };
    }, [modalForm, formRef, setModalForm]);
};