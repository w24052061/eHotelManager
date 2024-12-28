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
├── /app/                              # Main app directory
│   ├── /auth/                         # Authentication-related screens
│   │   ├── ForgotPassword.tsx         # Forgot password screen
│   │   ├── Login.tsx                  # Login screen
│   │   ├── Register.tsx               # Register screen
│   ├── /tabs/                         # Admin navigation tabs
│   │   ├── AdminDashboardBookingsTab.tsx # Admin bookings tab
│   │   ├── AdminDashboardCancelRequestTab.tsx # Admin cancellations tab
│   │   ├── AdminDashboardComplaintsTab.tsx # Admin complaints tab
│   │   ├── _layout.tsx                # Layout for tabs
│   ├── /onboarding/                   # Onboarding screens
│   │   ├── onBoardingScreen1.tsx      # First onboarding screen
│   │   ├── onBoardingScreen2.tsx      # Second onboarding screen
│   │   ├── onBoardingScreen3.tsx      # Third onboarding screen
│   │   ├── _layout.tsx                # Onboarding layout
│   ├── /page/                         # Main application pages
│   │   ├── AdminDashboard.tsx         # Admin dashboard
│   │   ├── AdminRoomManagement.tsx    # Room management screen
│   │   ├── AdminStaffManagement.tsx   # Staff management screen
│   │   ├── HomePage.tsx               # Homepage
│   │   ├── MyBookingsList.tsx         # User booking list
│   │   ├── profile.tsx                # User profile screen
│   ├── /[id]/                         # Dynamic routing
│   │   ├── RoomSinglePage.tsx         # Single room details page
│   ├── index.tsx                      # Entry point for the app
│   ├── _layout.tsx                    # Global layout
├── /assets/                           # Media and visual assets
│   ├── /high-fidelity-images/         # High-quality mockups and screenshots
│   ├── /low-fidelity-images/          # Wireframes and prototypes
│   ├── /images/                       # General image assets
│   │   ├── adaptive-icon.png          # Adaptive app icon
│   │   ├── defaultRoomImage.webp      # Default room placeholder image
│   │   ├── onBoardingImage1.webp      # Onboarding image 1
│   │   ├── onBoardingImage2.webp      # Onboarding image 2
│   │   ├── onBoardingImage3.webp      # Onboarding image 3
├── /src/                              # Source code
│   ├── /components/                   # Reusable components
│   │   ├── /AdminPanel/               # Admin-specific components
│   │   │   ├── AdminBookingManagement.tsx
│   │   │   ├── AdminCancelRequests.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminRequestCard.tsx
│   │   │   ├── AdminRequests.tsx
│   │   │   ├── AdminUserManagement.tsx
│   │   │   ├── BookingCard.tsx
│   │   │   ├── CancelRequestCard.tsx
│   │   │   ├── ComplaintsPage.tsx
│   │   │   ├── ManageRoomModal.tsx
│   │   │   └── UserCard.tsx
│   │   ├── /Complaint/                # Complaint management components
│   │   │   ├── ComplaintPage.tsx
│   │   │   └── ComplaintView.tsx
│   │   ├── /Dashboard/                # Dashboard-related components
│   │   │   ├── BookedRoomCard.tsx
│   │   │   ├── BookedRooms.tsx
│   │   │   ├── CancelButton.tsx
│   │   │   ├── ComplaintModal.tsx
│   │   │   └── RequestServiceButton.tsx
│   │   ├── /RoomManagement/           # Room management components
│   │   │   ├── RoomAvailability.tsx
│   │   │   ├── RoomBooking.tsx
│   │   │   ├── RoomComponent.tsx
│   │   │   └── RoomDetailsScreen.tsx
│   │   ├── /model/                    # Data models
│   │   │   ├── AdminRequest.ts
│   │   │   ├── BookedRoom.ts
│   │   │   ├── Booking.ts
│   │   │   ├── Button.ts
│   │   │   ├── complaints.ts
│   │   │   ├── PaymentDetails.ts
│   │   │   ├── Room.ts
│   │   │   ├── Service.ts
│   │   │   └── Users.ts
│   │   ├── /navigation/               # Navigation components
│   │   │   ├── DrawerNavigator.js
│   │   │   ├── TabBarIcon.tsx
│   │   │   └── TabNavigator.js
│   │   ├── AccessLimitComponent.tsx   # Role-based access control
│   │   ├── AnimatedImage.tsx          # Component for animated images
│   │   ├── ButtonComponent.tsx        # Reusable button component
│   │   ├── CheckUserRole.tsx          # User role checker
│   │   ├── HamburgerMenu.tsx          # Hamburger menu component
│   │   ├── InputField.tsx             # Input field component
│   │   └── RoomFilters.tsx            # Filters for rooms
│   ├── /constants/                    # App-wide constants
│   │   ├── Colors.ts                  # Color themes
│   ├── /hooks/                        # Custom React hooks
│   │   ├── useColorScheme.ts          # Handle light/dark mode
│   │   ├── useThemeColor.ts           # Theme color management
│   ├── /utils/                        # Utility functions
│   │   ├── addBooking.ts              # Add booking utility
│   │   ├── firebaseUtils.ts           # Firebase helper functions
│   │   ├── onboardingStorage.ts       # Manage onboarding state
│   │   ├── roomService.ts             # Room service utilities
│   │   └── updateUserProfile.ts       # User profile updates
├── package.json                       # Project metadata and dependencies
├── tsconfig.json                      # TypeScript configuration
├── firebaseConfig.tsx                 # Firebase setup
└── README.md                          # Project documentation
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
