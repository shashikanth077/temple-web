import { useNavigate } from 'react-router-dom';

export default function useNewNavigate(url:string) {
    const navigate = useNavigate();
    navigate(url);
    return true;
}
