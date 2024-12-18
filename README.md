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
├── /assets/                        # All images and other media
│   ├── /images/                    # Image assets (e.g., logos, banners, etc.)
│   └── /icons/                     # SVG or other icons
│
├── /src/                           # Source code for app components, utilities, etc.
│   ├── /components/                # Reusable UI components
│   │   ├── Header.tsx              # Header component (e.g., navigation bar)
│   │   ├── Footer.tsx              # Footer component
│   │   ├── RoomCard.tsx            # Displays room information
│   │   ├── ComplaintCard.tsx       # Displays customer complaints
│   │   └── BookingForm.tsx         # Form for booking rooms
│   ├── /constants/                 # Constants and configurations
│   │   ├── Colors.ts               # Color scheme constants
│   │   ├── Fonts.ts                # Fonts used across the app
│   │   ├── API.ts                  # API endpoints and configuration
│   │   └── PaymentGateway.ts       # Payment gateway settings
│   ├── /contexts/                  # Context API for global state management
│   │   ├── AuthContext.tsx         # Handles authentication (user login state)
│   │   └── RoomContext.tsx         # Handles room availability/status
│   ├── /hooks/                     # Custom React hooks
│   │   ├── useAuth.ts              # Hook for managing authentication state
│   │   └── useRooms.ts             # Hook for managing rooms' availability
│   ├── /navigation/                # Navigation setup (using expo-router)
│   │   ├── AppNavigator.tsx        # Main navigator file (with tabs)
│   │   ├── StaffNavigator.tsx      # Staff specific navigation
│   │   └── CustomerNavigator.tsx   # Customer specific navigation
│   ├── /screens/                   # Screens for each route/page
│   │   ├── /auth/                  # Authentication screens
│   │   │   ├── LoginScreen.tsx     # Login screen
│   │   │   ├── RegisterScreen.tsx  # Register screen
│   │   │   └── ForgotPassword.tsx  # Forgot password screen
│   │   ├── /dashboard/             # Dashboard screens (staff/customer)
│   │   │   ├── CustomerDashboard.tsx # Customer dashboard
│   │   │   └── StaffDashboard.tsx  # Staff dashboard (view complaints, manage rooms)
│   │   ├── /profile/               # Profile related screens
│   │   │   └── ProfileScreen.tsx   # Profile page (view/edit profile)
│   │   ├── /booking/               # Booking related screens
│   │   │   ├── RoomListScreen.tsx  # Room list page
│   │   │   └── BookingConfirmation.tsx # Confirmation page after booking
│   │   ├── /complaints/            # Complaint related screens
│   │   │   └── ComplaintsScreen.tsx  # View/Manage customer complaints (staff)
│   │   ├── /payment/               # Payment related screens
│   │   │   ├── PaymentScreen.tsx   # Payment form
│   │   │   └── PaymentSuccess.tsx  # Success screen after payment
│   ├── /styles/                    # Global styles
│   │   └── globalStyles.ts         # Common styles (buttons, containers, headers)
│   ├── /utils/                     # Utility functions
│   │   ├── validateForm.ts         # Form validation logic (e.g., card validation)
│   │   └── apiClient.ts            # API client for handling HTTP requests
│
├── /test/                          # Unit tests for components and screens
│   ├── /components/                # Tests for UI components
│   │   ├── Header.test.tsx         # Test for Header component
│   │   └── RoomCard.test.tsx       # Test for RoomCard component
│   ├── /screens/                   # Tests for screens
│   │   └── CustomerDashboard.test.tsx  # Test for CustomerDashboard screen
│
├── /public/                        # Static files (e.g., favicon)
├── /app/                           # Main app entry point for expo-router
│   ├── index.tsx                   # Main entry point (loads _layout and tabs)
│   ├── _layout.tsx                 # Layout file for global navigation setup
│   ├── (tabs)/                     # Tab navigation screens
│   │   ├── index.tsx               # Main tab screen
│   │   ├── dashboard.tsx           # Customer/Staff Dashboard tab
│   │   └── profile.tsx             # Profile tab
├── package.json                    # Project configuration and dependencies
└── README.md                       # Project documentation
```
