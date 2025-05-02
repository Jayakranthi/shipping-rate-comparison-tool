# Shipping Rate Comparison Tool

A React TypeScript application that allows users to compare shipping rates from multiple carriers (USPS, FedEx, UPS, and DHL) based on package details.

## Project Overview

This application provides a user-friendly interface for comparing shipping rates across different carriers. Users can input package details such as weight, dimensions, and shipping addresses, and the application will display a list of available shipping options sorted by price or delivery time.

## Features

- Input package details (weight, dimensions, origin/destination ZIP codes)
- Compare shipping rates from multiple carriers (USPS, FedEx, UPS, DHL)
- Sort rates by price or delivery time
- Filter rates by carrier
- Select a shipping rate for checkout
- Responsive design using Bootstrap
- Form validation for package details
- Loading states and error handling

## Project Structure

```
shipping-rate-comparison-tool/
├── public/                  # Static files
│   ├── favicon.ico          # Application favicon
│   ├── index.html           # HTML entry point
│   ├── logo192.png          # Logo for PWA
│   ├── logo512.png          # Larger logo for PWA
│   ├── manifest.json        # PWA manifest
│   └── robots.txt           # Robots crawl rules
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── common/          # Reusable form components
│   │   │   ├── FormCheckbox.tsx  # Checkbox component
│   │   │   ├── FormInput.tsx     # Input component
│   │   │   └── FormSelect.tsx    # Select dropdown component
│   │   ├── forms/           # Form components
│   │   │   └── PackageDetailsForm.tsx  # Package details form
│   │   ├── layout/          # Layout components
│   │   │   ├── Footer.tsx   # Footer component
│   │   │   ├── Header.tsx   # Header component
│   │   │   └── Layout.tsx   # Main layout wrapper
│   │   └── results/         # Results display components
│   │       └── ShippingRatesResults.tsx  # Shipping rates display
│   ├── services/            # API and service functions
│   │   └── mockShippingService.ts  # Mock shipping rate service
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Type definitions for the application
│   ├── App.css              # Main application styles
│   ├── App.test.tsx         # Tests for App component
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global styles
│   ├── index.tsx            # Application entry point
│   ├── logo.svg             # React logo
│   ├── react-app-env.d.ts   # React app type definitions
│   ├── reportWebVitals.ts   # Performance reporting
│   └── setupTests.ts        # Test setup
├── package.json             # NPM package configuration
├── package-lock.json        # NPM package lock file
├── tsconfig.json            # TypeScript configuration
└── social-media-dashboard/  # Separate React application (not part of main app)
```

### Key Files and Their Purpose

1. **Entry Points**
   - `public/index.html`: The HTML template that serves as the entry point for the application
   - `src/index.tsx`: The JavaScript entry point that renders the React application
   - `src/App.tsx`: The main React component that orchestrates the application

2. **Component Files**
   - `src/components/layout/*.tsx`: Components for the application layout
   - `src/components/common/*.tsx`: Reusable form components
   - `src/components/forms/*.tsx`: Form components for user input
   - `src/components/results/*.tsx`: Components for displaying results

3. **Service Files**
   - `src/services/mockShippingService.ts`: Service for generating mock shipping rates

4. **Type Definitions**
   - `src/types/index.ts`: TypeScript interfaces and types for the application

5. **Configuration Files**
   - `package.json`: NPM package configuration with dependencies and scripts
   - `tsconfig.json`: TypeScript compiler configuration

## Components

### App Component (App.tsx)

**Functionality:**
- Serves as the main container for the application
- Manages the application state including:
  - Loading state (`isLoading`)
  - Shipping rates (`rates`)
  - Error messages (`error`)
  - Results visibility (`showResults`)
- Handles form submission from PackageDetailsForm
- Calls the mockShippingService to fetch shipping rates
- Passes data to child components
- Loads initial shipping rates on component mount for demonstration purposes

**Implementation Details:**
- Uses React hooks (`useState`, `useEffect`) for state management
- Defines default package details for initial load
- Implements error handling for API calls
- Uses Bootstrap grid system for responsive layout
- Conditionally renders the ShippingRatesResults component based on form submission

**Code Highlights:**
```typescript
// State management
const [isLoading, setIsLoading] = useState(false);
const [rates, setRates] = useState<ShippingRate[]>([]);
const [error, setError] = useState<string | undefined>(undefined);
const [showResults, setShowResults] = useState(false);

// Form submission handler
const handleSubmit = async (packageDetails: PackageDetails) => {
  setIsLoading(true);
  setError(undefined);
  setShowResults(true);
  
  try {
    const response = await getShippingRates(packageDetails);
    
    if (response.success) {
      setRates(response.rates);
    } else {
      setError(response.errors?.[0] || 'Failed to fetch shipping rates');
    }
  } catch (err) {
    setError('An unexpected error occurred. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

### Layout Components

#### Layout Component (Layout.tsx)

**Functionality:**
- Provides a consistent structure for the application
- Wraps the entire application content
- Includes the Header and Footer components
- Creates a flex column layout with minimum viewport height

**Implementation Details:**
- Uses flexbox for layout (`d-flex flex-column min-vh-100`)
- Makes the main content area grow to fill available space (`flex-grow-1`)
- Adds consistent padding to the content area
- Uses Bootstrap container for proper content width and responsiveness

**Code Highlights:**
```typescript
const Layout = ({ children }: LayoutProps): React.ReactElement => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <div className="container py-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
```

#### Header Component (Header.tsx)

**Functionality:**
- Displays the application title and subtitle
- Shows a settings button (non-functional in current implementation)
- Provides branding and context for the application

**Implementation Details:**
- Uses Bootstrap styling for dark background and text contrast
- Implements responsive layout with flexbox
- Includes Bootstrap Icons for visual elements
- Uses a container for consistent width

**Code Highlights:**
```typescript
const Header = (): React.ReactElement => {
  return (
    <header className="bg-dark text-white py-3 mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="mb-0">
              <i className="bi bi-box me-2"></i>
              Shipping Rate Comparison
            </h1>
            <p className="mb-0 text-light">Compare rates from USPS, FedEx, UPS, and DHL</p>
          </div>
          <div>
            <button className="btn btn-outline-light">
              <i className="bi bi-gear me-1"></i>
              Settings
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
```

#### Footer Component (Footer.tsx)

**Functionality:**
- Displays copyright information with the current year
- Shows a disclaimer about rate estimates
- Provides a visual end to the application

**Implementation Details:**
- Uses light background to contrast with the content area
- Dynamically generates the current year using JavaScript's Date object
- Implements responsive layout with different text alignment on different screen sizes
- Uses muted text for the disclaimer to de-emphasize it

**Code Highlights:**
```typescript
const Footer = (): React.ReactElement => {
  return (
    <footer className="bg-light py-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Shipping Rate Comparison Tool
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              <small className="text-muted">
                Rates are estimates and may vary. Not affiliated with any carrier.
              </small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

### Form Components

#### PackageDetailsForm Component (PackageDetailsForm.tsx)

**Functionality:**
- Collects package information from the user
- Validates form inputs before submission
- Displays error messages for invalid inputs
- Shows loading state during rate calculation
- Submits form data to the parent component

**Implementation Details:**
- Uses React's `useState` hook for form state management
- Implements form validation with custom validation logic
- Uses Bootstrap grid system for responsive layout
- Leverages reusable form components (FormInput, FormSelect, FormCheckbox)
- Implements controlled form inputs
- Handles different input types (number, text, checkbox)
- Clears errors when fields are changed

**Form State Management:**
```typescript
const [formData, setFormData] = useState<PackageDetails>({
  weight: 1,
  length: 12,
  width: 12,
  height: 12,
  originZip: '12345',
  destinationZip: '67890',
  isResidential: true,
  packageType: PackageType.BOX
});

const [errors, setErrors] = useState<Record<string, string>>({});
```

**Input Handling:**
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target as HTMLInputElement;
  
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : type === 'number'
        ? parseFloat(value)
        : value
  }));
  
  // Clear error when field is changed
  if (errors[name]) {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }
};
```

**Form Validation:**
```typescript
const validateForm = (): boolean => {
  const newErrors: Record<string, string> = {};
  
  // Validate weight
  if (formData.weight <= 0) {
    newErrors.weight = 'Weight must be greater than 0';
  }
  
  // Validate dimensions
  if (formData.length <= 0) {
    newErrors.length = 'Length must be greater than 0';
  }
  if (formData.width <= 0) {
    newErrors.width = 'Width must be greater than 0';
  }
  if (formData.height <= 0) {
    newErrors.height = 'Height must be greater than 0';
  }
  
  // Validate ZIP codes
  const zipRegex = /^\d{5}$/;
  if (!zipRegex.test(formData.originZip)) {
    newErrors.originZip = 'Please enter a valid 5-digit ZIP code';
  }
  if (!zipRegex.test(formData.destinationZip)) {
    newErrors.destinationZip = 'Please enter a valid 5-digit ZIP code';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### Common Form Components

#### FormInput Component (FormInput.tsx)

**Functionality:**
- Renders a form input field with label
- Supports various input types (text, number, email, password, tel, zip)
- Displays validation errors
- Indicates required fields
- Supports custom attributes (min, max, step)

**Implementation Details:**
- Handles special case for ZIP code inputs (uses text type with pattern)
- Uses Bootstrap form styling
- Implements controlled input pattern
- Shows validation feedback using Bootstrap's validation classes
- Supports custom CSS classes

**Props Interface:**
```typescript
type FormInputProps = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'zip';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  className?: string;
};
```

#### FormSelect Component (FormSelect.tsx)

**Functionality:**
- Renders a select dropdown with label
- Supports dynamic options
- Displays validation errors
- Indicates required fields
- Supports placeholder option

**Implementation Details:**
- Uses Bootstrap form styling
- Implements controlled select pattern
- Shows validation feedback using Bootstrap's validation classes
- Maps through options array to render option elements
- Supports custom CSS classes

#### FormCheckbox Component (FormCheckbox.tsx)

**Functionality:**
- Renders a checkbox with label
- Displays validation errors
- Indicates required fields
- Supports custom styling

**Implementation Details:**
- Uses Bootstrap form-check styling
- Implements controlled checkbox pattern
- Shows validation feedback using Bootstrap's validation classes
- Supports custom CSS classes

### Results Components

#### ShippingRatesResults Component (ShippingRatesResults.tsx)

**Functionality:**
- Displays shipping rates in a sortable and filterable table
- Allows sorting by price or delivery time
- Enables filtering by carrier
- Shows loading state during rate calculation
- Displays error messages
- Allows selecting a shipping rate
- Shows a summary of the selected rate

**Implementation Details:**
- Uses React's `useState` and `useEffect` hooks for state management
- Implements sorting logic for rates
- Implements filtering logic for carriers
- Uses Bootstrap table and card components for styling
- Handles different states (loading, error, no rates)
- Logs debugging information to the console
- Highlights the selected rate
- Shows a badge for guaranteed delivery options

**State Management:**
```typescript
const [sortBy, setSortBy] = useState<'price' | 'time'>('price');
const [filterCarrier, setFilterCarrier] = useState<string>('all');
const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
```

**Sorting and Filtering Logic:**
```typescript
// Get unique carriers for filter dropdown
const carriers = Array.from(new Set(rates.map(rate => rate.carrierId)));

// Sort and filter rates
const sortedAndFilteredRates = [...rates]
  .filter(rate => filterCarrier === 'all' || rate.carrierId === filterCarrier)
  .sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else {
      return a.estimatedDeliveryDays - b.estimatedDeliveryDays;
    }
  });
```

## Data Flow

1. **Initial Load**: When the application loads, it automatically fetches shipping rates using default package details to demonstrate functionality.

2. **User Input**: User inputs package details in the `PackageDetailsForm` component, including:
   - Package weight
   - Package dimensions (length, width, height)
   - Origin and destination ZIP codes
   - Residential delivery option
   - Package type

3. **Form Validation**: The form validates all inputs before submission:
   - Weight, length, width, and height must be greater than 0
   - ZIP codes must be 5 digits
   - All required fields must be filled

4. **Form Submission**: When the form is valid and submitted:
   - The loading state is activated
   - The form data is passed to the parent `App` component via the `onSubmit` callback

5. **Rate Calculation**: The `App` component calls the `getShippingRates` function from `mockShippingService` with the package details.

6. **Mock Service Processing**:
   - The mock service simulates an API call with a 1.5-second delay
   - It calculates rates based on weight, volume, and distance factors
   - It applies carrier-specific and method-specific price adjustments
   - It returns a sorted list of shipping rates

7. **Results Display**: The rates are passed to the `ShippingRatesResults` component, which:
   - Displays the rates in a table
   - Allows sorting by price or delivery time
   - Allows filtering by carrier
   - Enables selecting a rate for checkout

8. **Rate Selection**: When a user selects a rate:
   - The selected rate is highlighted
   - A summary is displayed at the bottom of the results
   - In a real application, this would proceed to checkout

## Component Interactions

### Parent-Child Component Relationships

1. **App → Layout**
   - App wraps its content in the Layout component
   - Layout provides the structure for the application

2. **Layout → Header, Footer**
   - Layout includes Header and Footer components
   - Header and Footer provide consistent branding and information

3. **App → PackageDetailsForm**
   - App passes the `handleSubmit` function to PackageDetailsForm
   - App passes the `isLoading` state to PackageDetailsForm
   - PackageDetailsForm calls the `onSubmit` callback when the form is submitted

4. **App → ShippingRatesResults**
   - App passes the `rates` array to ShippingRatesResults
   - App passes the `isLoading` state to ShippingRatesResults
   - App passes the `error` state to ShippingRatesResults
   - App conditionally renders ShippingRatesResults based on the `showResults` state

5. **PackageDetailsForm → FormInput, FormSelect, FormCheckbox**
   - PackageDetailsForm uses these common components to build the form
   - PackageDetailsForm passes props like `value`, `onChange`, and `error` to these components
   - The common components handle rendering and user interaction

### Data Flow Between Components

1. **User Input → PackageDetailsForm**
   - User enters package details in the form
   - PackageDetailsForm updates its internal state with the input values
   - PackageDetailsForm validates the input values

2. **PackageDetailsForm → App**
   - When the form is submitted, PackageDetailsForm calls the `onSubmit` callback
   - The callback passes the form data to the App component
   - App updates its state and triggers the API call

3. **App → mockShippingService**
   - App calls the `getShippingRates` function with the package details
   - The mock service processes the request and returns a promise
   - The promise resolves with the shipping rates or an error

4. **App → ShippingRatesResults**
   - App passes the rates, loading state, and error to ShippingRatesResults
   - ShippingRatesResults renders the appropriate UI based on these props

5. **User Interaction → ShippingRatesResults**
   - User can sort, filter, and select rates in the ShippingRatesResults component
   - These actions update the internal state of ShippingRatesResults
   - The UI updates to reflect the new state

### Component Communication Patterns

1. **Props for Parent-to-Child Communication**
   - Parent components pass data and callbacks to child components via props
   - Child components receive and use these props to render UI and handle user interactions

2. **Callbacks for Child-to-Parent Communication**
   - Child components call functions passed from parent components to communicate upward
   - This allows child components to notify parents of events or state changes

3. **State Management**
   - Each component manages its own internal state
   - The App component serves as the central state manager for shared data
   - State is passed down to child components as needed

4. **Conditional Rendering**
   - Components use conditional rendering based on props and state
   - This allows for different UI states (loading, error, success)
   - The App component controls which major components are rendered

## Technical Implementation Details

### State Management

The application uses React's built-in state management with hooks:

1. **App Component State**
   - `isLoading`: Boolean flag for loading state
   - `rates`: Array of shipping rates
   - `error`: Error message string
   - `showResults`: Boolean flag to show/hide results

2. **PackageDetailsForm State**
   - `formData`: Object containing form field values
   - `errors`: Object mapping field names to error messages

3. **ShippingRatesResults State**
   - `sortBy`: String indicating sort order ('price' or 'time')
   - `filterCarrier`: String indicating carrier filter
   - `selectedRate`: Object containing the selected rate

### Form Handling

1. **Controlled Components**
   - All form inputs are controlled components
   - The component state serves as the "single source of truth"
   - Input values are bound to state variables
   - Change handlers update the state

2. **Form Validation**
   - Validation is performed on form submission
   - Error messages are stored in state
   - Errors are cleared when fields are changed
   - The form is only submitted if validation passes

3. **Input Types**
   - Different input types are handled appropriately
   - Number inputs are parsed to floats
   - Checkbox inputs use the `checked` property
   - ZIP code inputs use a pattern for validation

### Responsive Design

The application uses Bootstrap for responsive design:

1. **Grid System**
   - Different column layouts for different screen sizes
   - Single column on mobile, multiple columns on larger screens

2. **Responsive Components**
   - Table with horizontal scroll on small screens
   - Flex layouts that adapt to screen size
   - Text alignment that changes based on screen size

3. **Bootstrap Utilities**
   - Margin and padding utilities for spacing
   - Flex utilities for alignment
   - Text utilities for styling

### Error Handling

1. **Form Validation Errors**
   - Displayed inline with form fields
   - Cleared when fields are changed
   - Prevent form submission when present

2. **API Errors**
   - Caught in try/catch blocks
   - Displayed in the UI with alert components
   - Include user-friendly messages

3. **Edge Cases**
   - Handling of empty rate arrays
   - Handling of loading states
   - Fallback UI for error states

### Performance Considerations

1. **Memoization**
   - Derived values like `sortedAndFilteredRates` are recalculated only when dependencies change

2. **Conditional Rendering**
   - Components are only rendered when needed
   - Loading spinners are shown during API calls

3. **Efficient Updates**
   - State updates are batched where possible
   - Only necessary parts of the UI are re-rendered

## Development Challenges and Solutions

During the development of this shipping rate comparison tool, several challenges were encountered and addressed:

### 1. Realistic Rate Calculation

**Challenge:** Creating a realistic shipping rate calculation algorithm that accounts for various factors like weight, dimensions, distance, and carrier-specific pricing.

**Solution:**
- Implemented a multi-factor calculation algorithm that considers weight, volume, and distance
- Applied carrier-specific multipliers to simulate real-world pricing differences
- Added service-specific adjustments for express vs. standard shipping
- Incorporated randomization to simulate real-world pricing variations
- Used ZIP code differences to approximate shipping distance

### 2. Form Validation and User Experience

**Challenge:** Providing immediate feedback to users while ensuring data validity for shipping rate calculations.

**Solution:**
- Implemented real-time validation with error messages
- Created custom validation logic for different input types
- Cleared error messages as users correct their inputs
- Used controlled components to maintain a single source of truth
- Added appropriate input constraints (min values, patterns for ZIP codes)

### 3. State Management Across Components

**Challenge:** Managing application state across multiple components while maintaining a clear data flow.

**Solution:**
- Centralized primary state in the App component
- Used props for passing data down to child components
- Implemented callbacks for child-to-parent communication
- Created component-specific state for UI concerns (sorting, filtering)
- Used React hooks for clean and efficient state management

### 4. Responsive Design Implementation

**Challenge:** Creating a UI that works well on devices of all sizes while maintaining a good user experience.

**Solution:**
- Leveraged Bootstrap's grid system for responsive layouts
- Implemented different column configurations for different screen sizes
- Used responsive utilities for text alignment and spacing
- Ensured the shipping rates table is scrollable on small screens
- Tested the application across various viewport sizes

### 5. Handling Asynchronous Operations

**Challenge:** Managing loading states and potential errors during API calls.

**Solution:**
- Implemented loading indicators during rate calculations
- Created error handling for failed API calls
- Displayed user-friendly error messages
- Used try/catch blocks to handle unexpected errors
- Simulated network delay to test loading states

### 6. Sorting and Filtering Implementation

**Challenge:** Providing intuitive sorting and filtering options for shipping rates.

**Solution:**
- Implemented sorting by both price and delivery time
- Created a carrier filter dropdown populated dynamically from available rates
- Ensured sorting and filtering operations are efficient
- Maintained selected rate highlighting during sort/filter operations
- Used derived state for sorted and filtered rates

## Mock Shipping Service (mockShippingService.ts)

The application uses a mock shipping service (`mockShippingService.ts`) to generate realistic shipping rates. In a production environment, this would be replaced with actual API calls to shipping carriers.

**Functionality:**
- Simulates API calls to shipping carriers
- Generates realistic shipping rates based on package details
- Applies carrier-specific and service-specific pricing adjustments
- Returns a sorted list of shipping rates
- Simulates network delay with setTimeout

**Implementation Details:**
- Defines mock carrier data with IDs, names, and logos
- Defines mock shipping methods with IDs, names, descriptions, and delivery times
- Implements a rate calculation algorithm based on weight, volume, and distance
- Adds randomization to simulate real-world pricing variations
- Returns a promise that resolves after a delay to simulate an API call
- Includes error handling and logging

**Carrier Data:**
```typescript
const carriers = [
  { id: 'usps', name: 'USPS', logo: '/logos/usps.png' },
  { id: 'fedex', name: 'FedEx', logo: '/logos/fedex.png' },
  { id: 'ups', name: 'UPS', logo: '/logos/ups.png' },
  { id: 'dhl', name: 'DHL', logo: '/logos/dhl.png' }
];
```

**Shipping Methods:**
```typescript
const shippingMethods = {
  usps: [
    { id: 'priority', name: 'Priority Mail', description: '1-3 business days', estimatedDeliveryDays: 2 },
    { id: 'express', name: 'Priority Mail Express', description: '1-2 business days', estimatedDeliveryDays: 1 },
    { id: 'first-class', name: 'First-Class Mail', description: '2-5 business days', estimatedDeliveryDays: 3 },
    { id: 'ground', name: 'USPS Ground Advantage', description: '2-5 business days', estimatedDeliveryDays: 4 }
  ],
  // ... other carriers
};
```

### Rate Calculation Logic

The mock service calculates shipping rates based on several factors:

1. **Base Price Factors**:
   - Weight Factor: $2.50 per pound
   - Volume Factor: $0.0001 per cubic inch
   - Distance Factor: Based on the difference between origin and destination ZIP codes (first 3 digits)

2. **Carrier-Specific Adjustments**:
   - USPS: 10% discount (multiplier of 0.9)
   - FedEx: 10% premium (multiplier of 1.1)
   - UPS: 15% premium (multiplier of 1.15)
   - DHL: 20% premium (multiplier of 1.2)

3. **Service-Specific Adjustments**:
   - Express/Overnight/Next-Day: 80% premium (multiplier of 1.8)
   - 2-Day: 50% premium (multiplier of 1.5)
   - 3-Day: 30% premium (multiplier of 1.3)

4. **Randomization**: A small random factor (±10%) is applied to simulate real-world pricing variations.

**Rate Calculation Algorithm:**
```typescript
const calculateMockPrice = (packageDetails: PackageDetails, carrierId: string, methodId: string): number => {
  // Base price factors
  const weightFactor = 2.5;
  const volumeFactor = 0.0001;
  const distanceFactor = Math.abs(parseInt(packageDetails.originZip.substring(0, 3)) -
                                parseInt(packageDetails.destinationZip.substring(0, 3))) / 100;
  
  // Calculate volume
  const volume = packageDetails.length * packageDetails.width * packageDetails.height;
  
  // Base price calculation
  let basePrice = (packageDetails.weight * weightFactor) + (volume * volumeFactor) + distanceFactor;
  
  // Carrier-specific adjustments
  switch (carrierId) {
    case 'usps':
      basePrice *= 0.9; // USPS is generally cheaper
      break;
    case 'fedex':
      basePrice *= 1.1;
      break;
    case 'ups':
      basePrice *= 1.15;
      break;
    case 'dhl':
      basePrice *= 1.2; // DHL is generally more expensive
      break;
  }
  
  // Method-specific adjustments
  if (methodId.includes('express') || methodId.includes('overnight') || methodId.includes('next-day')) {
    basePrice *= 1.8; // Express shipping is more expensive
  } else if (methodId.includes('2day')) {
    basePrice *= 1.5;
  } else if (methodId.includes('3day')) {
    basePrice *= 1.3;
  }
  
  // Add some randomness
  basePrice *= (0.9 + Math.random() * 0.2);
  
  // Round to 2 decimal places
  return Math.round(basePrice * 100) / 100;
};
```

### Available Carriers and Services

The mock service includes the following carriers and services:

- **USPS**:
  - Priority Mail (1-3 business days)
  - Priority Mail Express (1-2 business days)
  - First-Class Mail (2-5 business days)
  - USPS Ground Advantage (2-5 business days)

- **FedEx**:
  - FedEx Ground (1-5 business days)
  - FedEx Express Saver (3 business days)
  - FedEx 2Day (2 business days)
  - FedEx Overnight (Next business day)

- **UPS**:
  - UPS Ground (1-5 business days)
  - UPS 3 Day Select (3 business days)
  - UPS 2nd Day Air (2 business days)
  - UPS Next Day Air (Next business day)

- **DHL**:
  - DHL Express (1-2 business days)
  - DHL Ground (3-8 business days)

**Rate Generation Process:**
```typescript
const generateMockRates = (packageDetails: PackageDetails): ShippingRate[] => {
  const rates: ShippingRate[] = [];
  
  carriers.forEach(carrier => {
    const methods = shippingMethods[carrier.id as keyof typeof shippingMethods];
    
    methods.forEach(method => {
      const price = calculateMockPrice(packageDetails, carrier.id, method.id);
      
      rates.push({
        carrierId: carrier.id,
        carrierName: carrier.name,
        methodId: method.id,
        methodName: method.name,
        price,
        currency: 'USD',
        estimatedDeliveryDays: method.estimatedDeliveryDays,
        guaranteedDelivery: method.id.includes('express') || method.id.includes('overnight'),
        transitTime: `${method.estimatedDeliveryDays} business days`,
        serviceName: method.description
      });
    });
  });
  
  // Sort rates by price
  rates.sort((a, b) => a.price - b.price);
  
  return rates;
};
```

**API Simulation:**
```typescript
export const getShippingRates = (packageDetails: PackageDetails): Promise<ShippingRatesResponse> => {
  console.log('getShippingRates called with:', packageDetails);
  
  // Return a promise that resolves after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const rates = generateMockRates(packageDetails);
        console.log('Generated rates:', rates);
        
        resolve({
          success: true,
          rates
        });
      } catch (error) {
        console.error('Error generating rates:', error);
        resolve({
          success: false,
          rates: [],
          errors: ['Failed to fetch shipping rates. Please try again.']
        });
      }
    }, 1500); // 1.5 second delay to simulate API call
  });
};
```
  - DHL Ground (3-8 business days)

## Data Models

### PackageDetails

```typescript
interface PackageDetails {
  weight: number;
  length: number;
  width: number;
  height: number;
  originZip: string;
  destinationZip: string;
  isResidential: boolean;
  packageType: PackageType;
}
```

### PackageType

```typescript
enum PackageType {
  BOX = 'Box',
  ENVELOPE = 'Envelope',
  PAK = 'Pak',
  TUBE = 'Tube',
  CUSTOM = 'Custom'
}
```

### ShippingRate

```typescript
interface ShippingRate {
  carrierId: string;
  carrierName: string;
  methodId: string;
  methodName: string;
  price: number;
  currency: string;
  estimatedDeliveryDays: number;
  guaranteedDelivery: boolean;
  transitTime: string;
  serviceName: string;
}
```

### ShippingRatesResponse

```typescript
interface ShippingRatesResponse {
  success: boolean;
  rates: ShippingRate[];
  errors?: string[];
}
```

## User Experience

### Package Details Form

1. Enter the weight of your package in pounds
2. Select the package type (Box, Envelope, Pak, Tube, or Custom)
3. Enter the dimensions (length, width, height) in inches
4. Enter the origin and destination ZIP codes
5. Check the "Residential Delivery" box if the destination is a residence
6. Click "Compare Shipping Rates" to see available options

### Shipping Rates Results

1. View the list of available shipping rates sorted by price (default)
2. Use the "Sort by Price" or "Sort by Time" buttons to change the sorting
3. Use the carrier dropdown to filter rates by a specific carrier
4. Review the carrier, service, transit time, and price for each option
5. Click "Select" on your preferred shipping option
6. Review the selected rate summary at the bottom
7. Click "Continue with Selected Rate" to proceed (in a real application)

## Installation and Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- React 19.1.0
- TypeScript 4.9.5
- Bootstrap 5.3.5
- React Bootstrap 2.10.9
- React Testing Library

## Future Enhancements

- Integration with real shipping carrier APIs
- User authentication and saved addresses
- Package tracking
- Shipping label generation
- Order history
- Advanced filtering options
- International shipping support
- Custom packaging options
- Insurance and additional services
- Address validation and suggestion
- Rate history and price trends
- Scheduled pickups
- Multi-package shipments
- Saved preferences for frequent shippers
