## Install dependencies

1. npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-get-random-values @react-native-community/masked-view

2. npm install react@18.3.1 react-dom@18.3.1

3. expo install react-native@0.76.1

4. npm cache clean --force

5. npx expo install @react-native-picker/picker

The link below provides you a direct download nessecary node depenencies:
[node_modules](https://drive.google.com/file/d/1KmrQcQ_l3TV0Vun_OpefuHidIxHbUu0v/view?usp=sharing)

## user stories categorized into Must, Should, and Could priorities:

### Must Have

These are essential features for the app to function properly and meet the primary objectives.

- As a customer, I must be able to register and log in to the app, so I can book rooms and raise complaints.
- As a customer, I must be able to view available rooms to check if a room is available for booking before logging in.
- As a customer, I must be able to make payments securely through an integrated online payment system.
- As a hotel staff member, I must be able to update the status of rooms (Available, Cleaning, Do Not Disturb) to manage room availability.
- As a hotel staff member, I must be able to view and address customer complaints to resolve issues promptly.
- As an admin, I must be able to log in securely to access the staff panel and manage payments, rooms, and customer details.

### Should Have

These features are important but are not critical to the core functionality.

- As a customer, I should receive a booking confirmation notification once the payment is successful.
- As a customer, I should be able to cancel a booking if needed, within the terms defined.
- As a hotel staff member, I should be able to view customer complaints and details to ensure timely resolution.
- As an admin, I should be able to see an overview of all bookings and payments for effective management.
- As a hotel staff member, I should be able to filter rooms based on their status (e.g., Cleaning, Available) for easier room management.

### Could Have

These features would improve user experience but are not essential for the initial version of the app.

- As a customer, I could receive promotions and discounts notifications for special offers or discounts on bookings.
- As a customer, I could be able to view reviews and ratings for rooms or services to make informed booking decisions.
- As a hotel staff member, I could update room availability in real time to ensure that all rooms are accurately marked across the app.
- As an admin, I could generate reports on bookings and payments for analysis and business insights.
- As a customer, I could receive a reminder notification about upcoming bookings or cleaning schedules.

## Project Structure

```
eHotelManager/
├── /assets/
│   ├── /images/                    # All images (logos, icons, etc.)
│   └── /icons/                     # SVG or vector icons
│
├── /src/                           # All the source code for the app
│   ├── /components/                # Reusable components
│   │   ├── Header.tsx              # Header component (e.g., navigation bar)
│   │   ├── Footer.tsx              # Footer component
│   │   ├── RoomCard.tsx            # Displays room information
│   │   ├── ComplaintCard.tsx       # Displays customer complaints
│   │   └── BookingForm.tsx         # Form for booking rooms
│   ├── /constants/                 # Constants and configurations
│   │   ├── Colors.ts               # Color scheme
│   │   ├── Fonts.ts                # Fonts used in the app
│   │   ├── API.ts                  # API endpoints and configurations
│   │   └── PaymentGateway.ts       # Payment gateway info
│   ├── /contexts/                  # Context for managing global states
│   │   ├── AuthContext.tsx         # Authentication context (e.g., user login)
│   │   └── RoomContext.tsx         # Context for room availability and status
│   ├── /hooks/                     # Custom React hooks
│   │   ├── useAuth.ts              # Custom hook for authentication
│   │   └── useRooms.ts             # Custom hook for managing rooms
│   ├── /navigation/                # Navigation setup
│   │   ├── AppNavigator.tsx        # Main navigator (with tabs)
│   │   ├── StaffNavigator.tsx      # Staff specific navigation
│   │   └── CustomerNavigator.tsx   # Customer specific navigation
│   ├── /screens/                   # Screens for each route/page
│   │   ├── /auth/                  # Authentication screens
│   │   │   ├── LoginScreen.tsx     # Login screen
│   │   │   ├── RegisterScreen.tsx  # Registration screen
│   │   │   └── ForgotPassword.tsx  # Forgot password screen
│   │   ├── /dashboard/             # Dashboard screens
│   │   │   ├── CustomerDashboard.tsx # Customer dashboard
│   │   │   └── StaffDashboard.tsx  # Staff dashboard (view complaints, room statuses)
│   │   ├── /profile/               # Profile-related screens
│   │   │   └── ProfileScreen.tsx   # Profile screen (view/edit profile)
│   │   ├── /booking/               # Booking-related screens
│   │   │   ├── RoomListScreen.tsx  # List of available rooms
│   │   │   └── BookingConfirmation.tsx # Booking confirmation screen
│   │   ├── /complaints/            # Complaint-related screens
│   │   │   └── ComplaintsScreen.tsx  # View/Manage customer complaints
│   │   ├── /payment/               # Payment-related screens
│   │   │   ├── PaymentScreen.tsx   # Payment form for booking
│   │   │   └── PaymentSuccess.tsx  # Success screen after payment
│   ├── /styles/                    # Global styles
│   │   └── globalStyles.ts         # Common styles (buttons, containers)
│   ├── /utils/                     # Utility functions
│   │   ├── validateForm.ts         # Form validation logic
│   │   └── apiClient.ts            # API request functions (e.g., fetch, POST)
│
├── /test/                          # Unit tests and components testing
│   ├── /components/                # Tests for components
│   │   ├── Header.test.tsx         # Test for Header component
│   │   └── RoomCard.test.tsx       # Test for RoomCard component
│   ├── /screens/                   # Tests for screens
│   │   └── CustomerDashboard.test.tsx  # Test for CustomerDashboard screen
│
├── /public/                        # Static files for app (favicon, etc.)
├── App.tsx                         # Root component of the app
├── package.json                    # Project configuration and dependencies
└── README.md                       # Project documentation
```
