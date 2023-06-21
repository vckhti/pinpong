import {CurrentUserInterface} from "./currentUser.interface";
import {BackendErrorsInterface} from "./backendErrors.interface";

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null
  isLoggedIn: boolean | null
  validationErrors: BackendErrorsInterface | null
  isLoading?: boolean
}
