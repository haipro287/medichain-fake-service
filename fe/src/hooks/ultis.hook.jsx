import {useLocation} from "react-router-dom";

export const useQueryString = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
}