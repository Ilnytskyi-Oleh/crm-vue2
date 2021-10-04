// Словарь сообщений
import localizeFilter from "@/filters/localize.filter";

export default {
  'logout': localizeFilter("YouLogOut"),
  'login': localizeFilter("FirstEnterToAcc"),
  'auth/user-not-found': localizeFilter("UserNotFound"),
  'auth/wrong-password': localizeFilter("InvalidCredentials"),
  'auth/email-already-in-use': localizeFilter("EmailIsUsing"),
}
