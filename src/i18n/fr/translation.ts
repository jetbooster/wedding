export default {
  attendingBlock: {
    attending: {
      label: "",
      no: "",
      yes: "",
    },
    name: "",
  },
  button:{
    "submit":"Envoyer"
  },
  details: {
    runningOrder: {
      title: "The Order of the Day",
      seated: "Guests to be Seated",
      ceremony: "The Ceremony",
      drinks: "Drinks, Canapés & Photos",
      breakfast: "Wedding Breakfast",
      speeches: "Speeches & Toasts",
      cutting: "Cutting of the Cake",
      dancing: "Music & Dancing",
      carriages: "Carriages",
    },
  },
  invited: {
    "1": "Vous êtes invité",
    "2": "au mariage de",
    "3": "et",
    maybe: "<1>Vous <2>(maybe)</2> invité?</1>",
    query: "Bonjour! Veuillez saisir votre prénom et votre nom.",
    firstPlaceholder: "Prénom",
    lastPlaceholder: "Votre nom",
    error:{
      "noFirstLast":"Veuillez indiquer le prénom et le nom de famille.",
      "userNotFound":"L'utilisateur n'existe pas. Veuillez vous assurer d'avoir utilisé votre nom complet. Sinon, essayez le nom de votre partenaire. Si le problème persiste, veuillez nous contacter."
    }
  },
} as const;
