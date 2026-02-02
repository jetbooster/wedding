export default {
  button: {
    submit: "Submit",
  },
  attendingBlock: {
    attending: {
      label: "Will you be attending?",
      no: "No, but I'll be there in spirit",
      yes: "Yes, I can't wait!",
    },
    name: "Name (Please feel free to correct any spelling errors here)",
  },
  invited: {
    "1": "You're Invited!",
    "2": "To the Wedding of",
    "3": "&",
    maybe: "<1>You're <2>(maybe)</2> Invited?</1>",
    query: "Hello! Please Enter your first/last name",
    firstPlaceholder: "First Name",
    lastPlaceholder: "Last Name",
    error: {
      noFirstLast: "Please provide both first and last name.",
      userNotFound:
        "User does not exist. Ensure you used your full name, otherwise try your partner's name. If that doesn't work, contact us.",
    },
  },
  details: {
    runningOrder: {
      date: "{{val, datetime}}",
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
    dateAndTime: {
      title: "Date & Time",
      longDate: "Saturday, 22nd August 2026",
      seated: "Guests to be seated by 11.45",
      ceremony: "Ceremony at midday",
    },
    dressCode: {
      title: "What to wear",
      dressCode: "Dress Code: Formal - Suited and Booted!",
      description:
        "We are hoping for an outdoor ceremony (weather permitting!). Since this will mean walking on grass, we suggest choosing your footwear accordingly.",
    },
    gifts: {
      title: "Gifts",
      description:
        "Your presence at our wedding is the greatest gift we could ask for. However, if you do wish to give a gift, a donation toward our honeymoon fund would be sincerely appreciated.",
      national:
        "Bank Transfer: Claudine Richardson | Sort Code: 60-83-71 | Account: 62999637",
      international:
        "International Guests: IBAN:GB56SRLG60837162999637 | SWIFT/BIC: SRLGGB2L",
    },
    transport: {
      title:"Transport",
      airport: "<1>The nearest airport to the venue is <2>Manchester Airport</2>, which is approximately 40 minutes away. Find the Google Maps route <3>here</3>.</1>",
      parking:"There is plenty of parking available directly at Rookery Hall.",
      taxis:"<1>As Rookery Hall is in a rural area, taxis should be booked in advance via <2>A Star Taxis</2>(<3></3>). We recommend booking your return taxi for midnight to coincide with the end of the celebrations.</1>"
    },
    contactUs:{
      title:"Contact Us",
      description:"If you have any questions about the travel, the venue, or anything else, please don't hesitate to reach out!",
      nat: "On the day of the wedding: Please reach out to our Maid of Honour, Natalie, at <1>+44 7736 350 670</1>, as we may not be checking our phones!"
    },
    accomodation:{
      title:"Accomodation",
      description:"A discounted block of rooms is available at Rookery Hall for the night of the wedding. Please mention our names when calling to book. ",
      other:"If you'd prefer to explore other options, here are some ",
      nearby:"nearby hotels"
    },
    map:"Map"
  },
} as const;
