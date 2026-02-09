export default {
  attendingBlock: {
    attending: {
      label: "Will you be joining us?",
      no: "No, but I'll be there in spirit",
      yes: "Yes, I can't wait!",
    },
    name: "Your Name: (Please feel free to correct any spelling errors here)",
  },
  childAttendingBlock: {
    childName: "Child {{count}} Name:",
    bringOwnFood: "We will be bringing our own food for them",
    highchair: "They will require a highchair",
    description: "Please provide a 3-course Children's Meal (Starter: [Menu], Main: [Menu], Dessert: [Menu] TO ADD",
  },
  common: {
    and: "&",
    button: {
      submit: "Submit {{extra}}",
      back: "Back to Home",
      tryAgain:"Try Again"
    },
  },
  details: {
    accomodation: {
      description:
        "A discounted block of rooms is available at Rookery Hall for the night of the wedding. Please mention our names when calling to book. ",
      nearby: "nearby hotels",
      other: "If you'd prefer to explore other options, here are some ",
      title: "Accomodation",
    },
    contactUs: {
      description:
        "If you have any questions about the travel, the venue, or anything else, please don't hesitate to reach out!",
      nat: "On the day of the wedding: Please reach out to our Maid of Honour, Natalie, at <1>+44 7736 350 670</1>, as we may not be checking our phones!",
      title: "Contact Us",
    },
    dateAndTime: {
      ceremony: "Ceremony at midday",
      longDate: "Saturday, 22nd August 2026",
      seated: "Guests to be seated by 11:45am",
      title: "Date & Time",
    },
    dressCode: {
      description:
        "We are hoping for an outdoor ceremony (weather permitting!). Since this will mean walking on grass, we suggest choosing your footwear accordingly.",
      dressCode: "Dress Code: Formal - Suited and Booted!",
      title: "What to Wear",
    },
    gifts: {
      description:
        "Your presence at our wedding is the greatest gift we could ask for. However, if you do wish to give a gift, a donation toward our honeymoon fund would be sincerely appreciated.",
      international:
        "International Guests: IBAN:GB56SRLG60837162999637 | SWIFT/BIC: SRLGGB2L",
      national:
        "Bank Transfer: Claudine Richardson | Sort Code: 60-83-71 | Account: 62999637",
      paypal: "Contribute via PayPal",
      title: "Gifts",
    },
    map: "Map",
    runningOrder: {
      breakfast: "Wedding Breakfast",
      carriages: "Carriages",
      ceremony: "The Ceremony",
      cutting: "Cutting of the Cake",
      dancing: "Music & Dancing",
      drinks: "Drinks, Canapés & Photos",
      seated: "Guests to be Seated",
      speeches: "Speeches & Toasts",
      title: "The Order of the Day",
    },
    transport: {
      airport:
        "<1>The nearest airport to Rookery Hall is <2>Manchester Airport</2>, which is approximately 40 minutes away. Find the Google Maps route <3>here</3>.</1>",
      parking: "There is plenty of parking available directly at the venue.",
      taxis:
        "<1>As Rookery Hall is in a rural area, taxis should be booked in advance via <2>A Star Taxis</2>(<3>+44 1270 895 044</3>).</1>",
      title: "Transport",
    },
  },
  invited: {
    "1": "You're Invited!",
    "2": "To the Wedding of",
    "2_alt":"The Wedding of",
    "3": "&",
    firstPlaceholder: "First Name",
    lastPlaceholder: "Last Name",
    query: "We can't wait to celebrate with you. To get started, please enter your name as it appears on your invitation.",
    query2:"If you're RSVPing for a family or couple, just enter one of your names to see the whole group.",
    error: {
      userNotFound: "We couldn't find a match for that name.",
      userNotFound2: "We're having trouble finding you",
      noUserHelp:
        "Please make sure that it matches the spelling on your invite. If you're still having trouble, just reach out to us!",
      noFirstLast: "Please provide both first and last name.",
    },
  },
  isAttending: {
    children:
      "How many little ones will be attending? We'd love to see them there, but if you'd prefer to use our wedding as an excuse for a well-deserved night off, we completely understand!",
    dietry:
      "Please let us know if you are vegetarian, vegan, or have any specific food allergies or dietary requirements in your party, that we should share with the chef.",
    notes:
      "Anything else we should know? Please share any other notes or special requirements here—whether it's accessibility needs, transport questions, or anything else we can do to make your day more comfortable!",
  },
  isNotAttending: {
    text1: "We'll miss you!",
    text2:
      "Thank you for letting us know. We're so sorry you won't be able to join us, but we completely understand.",
    text3:
      "You are still more than welcome to browse our website if you'd like to see our wedding schedule or honeymoon plans. We'll be sure to share photos with you after the big day!",
    text4:
      "If you'd like to leave a message or some well-wishes for us to read, please feel free to share them here.",
  },
  form: {
    submitSuccessHeader: "Your RSVP is confirmed!",
    submitSuccessBody:
      "If you need to change anything before the 1st of July, just come back to the site and update your form. ",
    submitSuccessBody2: "Feel free to come back anytime to check details.",
    submitSuccessAttending: "See you on the 22nd of August!",
    submitSuccessNotAttending1:
      "If you change your mind before the 1st July, just come back to our website and update your RSVP.",
    submitSuccessNotAttending2: "With love, Sam & Claudine",
    submitFailed: "RSVP Submit failed.",
    title: "RSVP",
    respondBy: "Please let us know if you can join us by",
    respondByDate: "Wednesday 22nd July, 2026",
    description:
      "<1>Welcome {{- names}}. We are so excited to share our day with you. If this isn't you, please <2>click here to sign in as someone else.</2></1>",
    descriptionReceived:
      "<1>Thank you {{- names}}. We have already received an RSVP from you. If this isn't you, please <2>click here to sign in as someone else.</2></1>",
    editButton: "Edit RSVP",
    submit: "Submit RSVP",
  },
  mealSelector: {
    title: "The Menu. Please select your{{- partner_possessive}} choices for the wedding breakfast below:",
    starter: "the starter",
    main: "the main",
    dessert: "the desert",
    partner: " Partner",// keep the space at the front
    partner_possessive: " partner's", // keep the space
    placeholder:"Select{{partner}} {{type}}"
  },
} as const;
