import { APICore } from 'helpers/api';

export default function useUser() {
    const loggedInUser = APICore.getLoggedInUser();
    return [loggedInUser];
}
