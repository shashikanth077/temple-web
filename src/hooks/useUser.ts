import { APICore } from 'helpers/api';

export default function useUser() {
    const loggedInUser:any = APICore.getLoggedInUser();
    return [loggedInUser];
}
