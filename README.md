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
├── /app/                              # Main app entry point for expo-router
│   ├── /auth/                         # Authentication related screens
│   │   ├── Dashboard.tsx              # User's dashboard (Staff/Guest dashboard)
│   │   ├── ForgotPassword.tsx         # Forgot password screen
│   │   ├── Login.tsx                  # Login screen
│   │   ├── Profile.tsx                # User profile screen
│   │   ├── Register.tsx               # Register screen
│   ├── /tabs/                          # Tab navigation related screens
│   │   ├── _layout.tsx                # Tab layout screen (for navigation between tabs)
│   │   ├── settings.tsx               # Settings page (manage user preferences, etc.)
│   ├── /onboarding/                   # Onboarding related screens
│   │   ├── OnboardingScreen1.tsx      # Onboarding screen 1 (introduction to app features)
│   │   ├── OnboardingScreen2.tsx      # Onboarding screen 2 (features overview)
│   │   ├── OnboardingScreen3.tsx      # Onboarding screen 3 (final introduction)
│   │   └── _layout.tsx                # Layout for onboarding pages (only for first-time users)
│   ├── /page/                          # Pages for main app routes
│   │   ├── home.tsx                   # Homepage (overview of hotel features)
│   │   ├── roomList.tsx               # List of available rooms
│   │   ├── bookingConfirmation.tsx    # Booking confirmation page
│   │   ├── bookingDetails.tsx         # Booking details page
│   ├── +html.tsx                      # HTML layout page (for web)
│   ├── index.tsx                      # Main entry point (renders the appropriate layout and tabs)
│   └── _layout.tsx                    # Global layout for app navigation
├── /assets/                           # All images and other media
│   ├── /fonts/                        # Font assets
│   │   └── SpaceMono-Regular.ttf      # Font file
│   └── /images/                       # Image assets
│       ├── logo.png                   # Logo of the hotel app
│       ├── banner.png                 # Banner image for homepage or onboarding
│       ├── splash.png                 # Splash screen image
│       ├── roomThumbnail1.jpg         # Room thumbnail image 1
│       ├── roomThumbnail2.jpg         # Room thumbnail image 2
│       ├── roomThumbnail3.jpg         # Room thumbnail image 3
│       ├── hotelExterior.jpg          # Exterior view of the hotel
│       ├── onBoardingImage1.webp      # Onboarding image 1 (room amenities)
│       ├── onBoardingImage2.webp      # Onboarding image 2 (hotel services)
│       ├── onBoardingImage3.webp      # Onboarding image 3 (guest experiences)
│       └── favicon.png                # App favicon
├── /node_modules/                    # Node.js modules (auto-generated)
├── /src/                              # Source code for app components, utilities, etc.
│   ├── /components/                   # Reusable UI components
│   │   ├── AnimatedImage.tsx          # Animated image component (used for onboarding)
│   │   ├── InputField.tsx             # Input field component
│   │   ├── MenuComponent.tsx         # Menu component (for navigation)
│   │   ├── /model/                   # Model-related components
│   │   │   ├── Room.ts               # Room model (e.g., room availability, price, type)
│   │   │   ├── PaymentDetails.ts     # Payment model (credit card info)
│   │   │   └── Booking.ts            # Booking model (room reservation info)
│   │   ├── /navigation/              # Navigation components
│   │   │   └── TabBarIcon.tsx        # TabBarIcon component (icon for tabs)
│   ├── /constants/                    # Constants and configurations
│   │   ├── Colors.ts                  # Color scheme constants (for hotel app theme)
│   ├── /hooks/                        # Custom React hooks
│   │   ├── useColorScheme.ts          # Hook for managing color scheme (light/dark mode)
│   │   └── useThemeColor.ts           # Hook for theme-related colors
│   ├── /screens/                      # Screens for each route/page
│   │   ├── /auth/                     # Authentication screens
│   │   │   ├── DashboardScreen.tsx    # Dashboard screen (User's hotel-related information)
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   ├── LoginScreen.tsx        # Login screen
│   │   │   ├── ProfileScreen.tsx      # User profile screen (view/edit user details)
│   │   │   └── RegisterScreen.tsx     # Register screen (new user registration)
│   │   ├── /rooms/                    # Rooms-related screens
│   │   │   ├── AvailableRooms.tsx     # Available rooms screen (for guests to book)
│   │   │   ├── RoomDetails.tsx        # Room details screen
│   │   ├── /booking/                  # Booking-related screens
│   │   │   ├── BookingConfirmation.tsx # Confirmation page after booking a room
│   │   │   └── BookingDetails.tsx     # Detailed booking information
│   │   ├── /complaints/               # Complaint-related screens (view/manage complaints)
│   │   ├── /payment/                  # Payment-related screens
│   │   │   ├── PaymentForm.tsx        # Payment form screen (to make payment)
│   │   │   └── PaymentSuccess.tsx     # Payment success screen (payment confirmation)
│   │   ├── AdjustMyKeyboard.tsx       # Adjust keyboard screen (for better UX)
│   │   ├── AlertMessage.tsx           # Alert message screen (for notifications)
│   │   ├── AnimatedText.tsx           # Animated text screen (for introducing hotel features)
│   ├── /utils/                        # Utility functions
│   │   ├── addBooking.ts              # Utility to add a new booking
│   │   ├── roomService.ts             # Room service API calls and utilities
│   │   ├── onboardingStorage.ts      # Onboarding status (whether onboarding is completed)
│   │   └── updateUserProfile.ts      # Utility to update user profile
├── /package.json                      # Project configuration and dependencies
├── /README.md                         # Project documentation
├── /firebaseConfig.js                 # Firebase configuration
├── /tsconfig.json                     # TypeScript configuration file
└── /app.json                          # Expo app configuration
```

## PowerShell code to take out my file and folders name:

```
Get-ChildItem -Path "C:\Users\A4MM4A\Documents\GitHub\eHotelManager" -Recurse |
    Where-Object { $_.FullName -notmatch '\\node_modules\\|\\.expo\\' } |
    ForEach-Object { $_.FullName } |
    Out-File "C:\Users\A4MM4A\Documents\GitHub\eHotelManager_Files.txt"
```

## How the button component works:

The button will adjust its width based on the width prop. If no width is passed, it defaults to 100%.
This allows you to create buttons that can either take up the full width or have a fixed/variable width depending on the use case.

### Styling Flexibility:

If you want to adjust other styles (like height, padding, or margins), you can still use the style prop to pass additional custom styling.
This provides the flexibility to control the button width dynamically while keeping the component reusable and clean.

### Usage Example:

Example 1: Full-width Button

```
<ButtonComponent text="Go to Dashboard" link="/auth/dashboard" color="primary" width="100%" />
```

Example 2: Fixed width Button

```
<ButtonComponent text="Go to Profile" link="/auth/profile" color="secondary" width={200} />
```

Example 3: Custom width using percentage

```
<ButtonComponent text="Sign Out" link="/auth/login" color="danger" width="80%" />
```

## Admin Dashboard

An admin dashboard is a user interface used by administrators to manage and interact with an application's backend systems. The dashboard provides a centralized place to view and control all aspects of the application, often through visualizations, statistics, and management tools. Here’s how an admin dashboard typically works in various contexts, including web applications:

### Key Components of an Admin Dashboard

#### User Interface (UI)

- Visual Layout: The dashboard features a layout that typically includes navigation menus, data panels, and widget areas to display various types of information.
- Widgets and Components: These might include charts, tables, lists, and forms that provide real-time insights and control over the data.
  Data Visualization

- Charts and Graphs: Display key metrics like user engagement, financial statistics, system performance, etc.
- Reports: Generate and view detailed reports that can be customized and downloaded for further analysis.

#### User Management

- Create, Update, Delete Users: Admins can manage user accounts, roles, and permissions to control access to different parts of the application.
- View User Activities: Track and monitor user activities for security and operational purposes.

#### Content Management

- Publish, Edit, Delete: Manage and handle rooms, create and update pages and contents of each room sigle pages and etc.
- Moderation: Oversee user-activities like booked rooms, messages, complaints, payments, Create and manage email marketing and etc.

### Example Scenario

In a typical scenario, an admin logs into the dashboard using secure credentials. Upon login, the dashboard presents a summary view with key metrics like total users, monthly revenue, and recent orders. The admin can navigate to different sections using a sidebar menu to view detailed reports, manage user accounts, update content, or configure system settings.

Admin dashboards are essential for the effective management of digital systems, providing the necessary tools and information to administrators to maintain, optimize, and grow the applications they manage.
