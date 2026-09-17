This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


# Atologist Infotech — Signup Assessment

A production-oriented signup experience built with **Next.js, React, SCSS, React Hook Form, Zod, and DayPicker**, based on the provided Figma design and assessment requirements.

The implementation focuses not only on visual accuracy, but also on **component architecture, responsive behavior, validation, API integration, security considerations, performance, accessibility, and user experience**.

---

## 1. Project Objective

The objective of this assessment was to:

- Recreate the provided signup page from the Figma design.
- Maintain visual consistency with the provided design.
- Build a responsive experience across desktop, tablet, and mobile.
- Implement client-side validation for all form fields.
- Integrate the provided signup REST API.
- Handle API failures gracefully.
- Test browser compatibility.
- Optimize the application for performance.
- Use appropriate open-source libraries to improve maintainability, performance, and security.

The assessment specifically requires responsive design, pixel precision, typography/colors, image/icon implementation, browser compatibility, performance optimization, RESTful API integration, API error handling, client-side validation, Next.js, SCSS, and appropriate open-source libraries.

---

## 2. Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application structure |
| React | UI development |
| SCSS | Styling and responsive design |
| React Hook Form | Form state and submission management |
| Zod | Schema-based validation |
| @hookform/resolvers | React Hook Form + Zod integration |
| @daypicker/react | Date-of-birth calendar |
| Google Identity Services | Google signup integration |
| JavaScript | Application logic |
| Git / GitHub | Version control |

---

## 3. Architecture

The project follows a **feature-oriented, separation-of-concerns architecture** rather than putting the entire signup page into one component.

```text
src/
│
├── app/
│   ├── page.js
│   ├── layout.js
│   ├── globals.scss
│   │
│   └── invalid-input/
│       └── page.js
│
├── components/
│   └── signup/
│       ├── SignupSection.jsx
│       ├── SignupHeader.jsx
│       ├── SignupForm.jsx
│       ├── InputField.jsx
│       ├── PasswordField.jsx
│       ├── TermsAgreement.jsx
│       ├── DatePickerField.jsx
│       ├── SignupSuccess.jsx
│       ├── SignInForm.jsx
│       └── IllustrationSection.jsx
│
├── services/
│   └── auth.service.js
│
├── validations/
│   └── signup.schema.js
│
├── utils/
│   └── security.js
│
└── styles/
    ├── _variables.scss
    ├── _mixins.scss
    └── signup.scss
```

---

## 4. Why This Architecture?

The primary reason for this structure is **separation of responsibilities**.

Instead of having one large signup component containing UI, validation, API calls, security checks, animations, and state management, each responsibility is isolated.

### Component Layer

Responsible for UI and user interaction.

Examples:

```text
InputField
PasswordField
DatePickerField
TermsAgreement
SignupHeader
```

This makes individual components easier to maintain and reuse.

### Service Layer

API communication is isolated inside:

```text
services/auth.service.js
```

The component does not need to know how the HTTP request is constructed.

```text
SignupForm
    │
    ▼
auth.service.js
    │
    ▼
REST API
```

This makes it easier to replace or extend the API implementation without rewriting the UI.

### Validation Layer

Validation rules are centralized inside:

```text
validations/signup.schema.js
```

This keeps validation rules independent from the visual components.

### Utility Layer

Security-related client-side checks are kept inside:

```text
utils/security.js
```

This prevents security-related logic from being mixed into UI components.

---

## 5. Component Design

The signup screen is intentionally divided into two independent visual sections.

```text
Signup Page
│
├── SignupSection
│   ├── SignupHeader
│   └── SignupForm
│       ├── InputField
│       ├── PasswordField
│       ├── DatePickerField
│       └── TermsAgreement
│
└── IllustrationSection
```

This separation provides an important advantage for responsive behavior.

The illustration is treated as an independent visual section rather than being tightly coupled to the form.

### Responsive Behavior

#### Desktop

```text
┌──────────────────────┬───────────────────┐
│                      │                   │
│    SignupSection     │ Illustration      │
│                      │                   │
└──────────────────────┴───────────────────┘
```

#### Tablet

```text
┌──────────────────────┬───────────────────┐
│                      │                   │
│    SignupSection     │ Illustration      │
│       ~60%           │      ~40%         │
│                      │                   │
└──────────────────────┴───────────────────┘
```

#### Mobile

```text
┌───────────────────────────────────────────┐
│                                           │
│              SignupSection                │
│                                           │
└───────────────────────────────────────────┘
```

The illustration remains visible between **901px and 1200px** and is hidden only at **900px and below**.

---

## 6. Form Management

The form uses **React Hook Form** rather than manually maintaining separate React state for every field.

Benefits:

- Minimal unnecessary re-renders.
- Centralized form state.
- Simple validation integration.
- Built-in submission state.
- Cleaner error handling.
- Easier scalability when fields are added.

The form integrates with Zod through:

```js
zodResolver(signupSchema)
```

---

## 7. Client-Side Validation

The assessment explicitly requires client-side validation for all fields.

Validation includes:

- **First Name:** required, maximum length, name pattern.
- **Last Name:** required, maximum length, name pattern.
- **Email:** required, valid email format, maximum length.
- **Mobile:** required, exactly 10 digits.
- **Password:** required, minimum 8 characters, maximum 128 characters.
- **Date of Birth:** required.
- **Terms / Privacy:** both must be accepted.

The validation schema keeps these rules centralized rather than scattering validation logic throughout individual components.

---

## 8. API Integration

The assessment provides the signup endpoint:

```text
https://atologistinfotech.com/api/register.php
```

Required parameters:

```text
firstname
lastname
email
encryptpassword
mobile
dob
```

The API integration is isolated inside:

```text
src/services/auth.service.js
```

The form prepares the payload and calls:

```js
registerUser(payload)
```

This keeps networking concerns outside the UI layer.

---

## 9. API Error Handling

The API service handles:

- HTTP errors
- Unsuccessful responses
- JSON parsing failures
- API-provided error messages
- Fallback error messages

The flow is:

```text
API
 ↓
Service layer
 ↓
Error object
 ↓
SignupForm
 ↓
User-friendly message
```

---

## 10. Security Considerations

A client-side suspicious-input guard was added.

The application checks for suspicious patterns such as:

```text
<script>
javascript:
<iframe>
<object>
<embed>
onerror=
onclick=
```

If suspicious input is detected, the user is redirected to:

```text
/invalid-input
```

### Important Security Principle

Client-side security checks are **not a replacement for server-side validation or sanitization**.

The backend must remain the final security boundary.

---

## 11. Password Security

The password field includes a visibility toggle.

Users can switch between:

```text
password
```

and:

```text
text
```

Sensitive values such as passwords and authentication credentials should not be logged to the browser console.

---

## 12. Google Signup

Google signup was added as an enhancement.

The assessment does not explicitly require Google authentication.

Google Identity Services is used for the client-side Google authentication flow.

The architecture keeps the Google flow separate from normal form submission:

```text
Normal Signup
     │
     ▼
registerUser()

Google Signup
     │
     ▼
Google Identity Services
     │
     ▼
registerUserWithGoogle()
```

---

## 13. Date Picker Enhancement

The DOB field uses an interactive calendar picker.

Features include:

- Calendar UI
- Month navigation
- Year selection
- Future-date restriction
- Selected-date persistence
- Outside-click closing
- Escape-key closing
- Calendar positioning above the field where required

This improves usability while keeping the underlying form value compatible with the API.

---

## 14. Success Experience

After successful registration, the signup form transitions into a success state.

Instead of navigating to another page, the current signup card performs a 3D flip:

```text
Signup Form
     │
     │ Successful API response
     ▼
   Flip
     │
     ▼
Signup Successful
```

The success state contains:

- Success icon
- Celebration animation
- Confirmation message
- Back-to-signup action

---

## 15. Sign-In Enhancement

The signup header contains:

```text
Already have an account? Sign In
```

A sign-in interface was implemented as an additional enhancement.

```text
Signup
  │
  │ Sign In
  ▼
Flip Animation
  │
  ▼
Sign In
```

The sign-in UI is currently presented as an interface flow where applicable, while the actual authentication behavior can be connected later.

---

## 16. Animation Strategy

Animations were implemented using CSS rather than introducing an additional animation dependency.

### Staggered Field Animation

Form fields enter progressively using configurable animation delays.

```text
Field 1
   ↓
Field 2
   ↓
Field 3
   ↓
Field 4
```

The animation uses CSS custom properties:

```scss
animation-delay: var(--animation-delay);
```

### Button Stretch Animation

The submit button uses a subtle horizontal stretch effect when entering the UI.

---

## 17. Reduced Motion

The application respects:

```css
@media (prefers-reduced-motion: reduce)
```

Animations are disabled or simplified when the user has enabled reduced motion.

---

## 18. Performance Optimizations

Performance was considered at several levels.

### Component Separation

Smaller components reduce unnecessary complexity and make rendering responsibilities easier to reason about.

### React Hook Form

Avoids the need for a separate React state update for every field change.

### CSS Animations

Animations are implemented primarily through CSS rather than JavaScript-driven animation loops.

### No Unnecessary Dependencies

Libraries are introduced only where they provide a clear benefit.

### Responsive CSS

Fluid dimensions are used at intermediate breakpoints rather than forcing desktop dimensions onto smaller screens.

### Image Dimensions

Image dimensions are explicitly supplied where appropriate to reduce layout instability.

### Reduced Motion

Animations are disabled when requested by the user.

---

## 19. Responsive Strategy

The responsive strategy was designed around actual layout requirements.

### >1200px

```text
Signup | Illustration
```

### 901px–1200px

```text
Signup ~60% | Illustration ~40%
```

### ≤900px

```text
Signup
```

The illustration is hidden at this breakpoint.

### ≤500px

Additional refinements include:

- Simplified sign-in header
- Reduced spacing
- Smaller typography
- Single-column name fields
- Improved checkbox layout

---

## 20. Accessibility

Accessibility considerations include:

- Semantic `<form>`
- `<label>` associated with inputs
- `aria-invalid`
- `aria-describedby`
- Error messages connected to fields
- `role="alert"` for API errors
- Keyboard-accessible controls
- Explicit button types
- Reduced-motion support
- Meaningful image `alt` text
- Password visibility control

---

## 21. What Was Required vs What Was Added

### Required by Assessment

The assessment asks for:

- React/Next.js implementation
- Figma-based design
- Responsive design
- Pixel precision
- Typography and colors
- Image/icon implementation
- Layout consistency
- Browser compatibility
- Performance optimization
- RESTful API
- API error handling
- Client-side validation
- Signup API integration
- Next.js
- SCSS
- Open-source libraries for performance/security

### Additional Improvements

The following were implemented beyond the explicit assessment requirements:

#### Google Signup

Provides an additional authentication entry point.

#### Suspicious Input Protection

Suspicious form input redirects to a dedicated invalid-input page.

#### Dedicated Invalid Input Page

Provides a dedicated UX for suspicious input instead of silently processing it.

#### Password Visibility Toggle

Improves usability while keeping the default password field secure.

#### Interactive DOB Calendar

Provides a better date-selection experience.

#### Animated Signup Success

Successful registration produces a dedicated confirmation state.

#### 3D Signup/Success Transition

The success state uses a card flip rather than a hard page transition.

#### Sign-In UI

A sign-in experience was added to the existing header interaction.

#### Staggered Form Animation

Form fields enter progressively to create a smoother visual experience.

#### Button Stretch Animation

Adds a subtle interaction effect to the primary CTA.

#### Reduced Motion

Animations respect the user's system accessibility preference.

#### Dedicated API Service Layer

Networking logic is separated from the presentation layer.

#### Dedicated Validation Layer

Validation rules are centralized and independently maintainable.

#### Security Utility Layer

Security-related checks are separated from the UI.

---

## 22. Why These Enhancements Were Added

The goal was not to add features simply for the sake of adding features.

Each enhancement addresses one or more of these areas:

```text
                  ┌─────────────────┐
                  │   Assessment    │
                  └────────┬────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
       UX              Security         Maintainability
          │                │                │
     Date picker     Input detection    Service layer
     Animations      Error handling     Validation schema
     Success UI      Password handling   Component structure
     Google auth
```

The implementation therefore attempts to demonstrate **engineering judgment**, not just visual reproduction.

---

## 23. Error Handling Strategy

Errors are handled at multiple levels.

```text
User Input
    │
    ▼
Client Validation
    │
    ├── Invalid → Field Error
    │
    ▼
Security Check
    │
    ├── Suspicious → Invalid Input Page
    │
    ▼
API Request
    │
    ├── API Error → User-friendly Error
    │
    ▼
Success
    │
    ▼
Success UI
```

This prevents all failures from being treated as the same type of error.

---

## 24. Testing

The implementation was tested across different browser and viewport scenarios.

Testing covered:

- Form submission
- Required-field validation
- Invalid email
- Invalid mobile number
- Password validation
- Terms/Privacy validation
- DOB selection
- API success
- API failure
- Suspicious-input redirect
- Signup success animation
- Sign-in transition
- Responsive layouts
- Mobile layout
- Tablet layout
- Desktop layout
- No horizontal scrolling
- CORS/API communication

---

## 25. Environment Variables

Create:

```text
.env.local
```

Example:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Do not commit `.env.local` to Git.

---

## 26. Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 27. Production Build

Before deployment:

```bash
npm run build
```

Then:

```bash
npm start
```

A successful production build verifies that the application can be compiled using the production configuration.

---

## 28. Project Principles

### Separation of Concerns

UI, validation, networking, and utilities are separated.

### Reusability

Common fields are componentized.

### Maintainability

Business rules are not tightly coupled to presentation.

### Progressive Enhancement

Additional functionality was added without changing the core signup flow.

### Responsive Design

The design adapts to the available viewport instead of relying solely on fixed desktop dimensions.

### Accessibility

Keyboard interaction, semantic HTML, error associations, and reduced motion are considered.

### Security Awareness

Client-side checks are treated as an additional protection layer, not as a replacement for backend security.

---

## 29. Assessment Compliance Summary

| Requirement | Status |
|---|---|
| Next.js | ✅ |
| React | ✅ |
| SCSS | ✅ |
| Figma implementation | ✅ |
| Responsive design | ✅ |
| Pixel-oriented layout | ✅ |
| Typography/colors | ✅ |
| Images/icons | ✅ |
| REST API | ✅ |
| API error handling | ✅ |
| Client-side validation | ✅ |
| Browser testing | ✅ |
| Performance optimization | ✅ |
| Open-source libraries | ✅ |
| Signup API | ✅ |
| Google Signup | ⭐ Enhancement |
| Suspicious input handling | ⭐ Enhancement |
| DOB calendar | ⭐ Enhancement |
| Success animation | ⭐ Enhancement |
| Sign-in UI | ⭐ Enhancement |
| Reduced motion | ⭐ Enhancement |

---

## 30. Conclusion

This implementation goes beyond reproducing the supplied Figma screen.

The primary focus was to build the assessment as a **maintainable frontend application**, with clear separation between:

```text
UI
│
├── Components
├── Validation
├── Services
├── Security utilities
└── Styling
```

The additional functionality was intentionally implemented to demonstrate practical frontend engineering considerations around:

- User experience
- Responsiveness
- Validation
- API integration
- Security awareness
- Accessibility
- Maintainability
- Performance

The result is a signup flow that satisfies the stated assessment requirements while providing several production-oriented improvements that were not explicitly requested.

---

## 31. Engineering Notes

This project intentionally avoids unsupported claims such as:

> "The application is 100% secure."

or:

> "The application is fully optimized."

Instead, the documentation describes the concrete engineering decisions and implementations that were actually made.

For example:

- Client-side suspicious-input detection was added.
- API communication was separated into a service layer.
- Validation was separated into a schema.
- CSS was used for lightweight animations.
- Responsive breakpoints were designed around the actual UI requirements.
- Reduced-motion support was included.
- Browser and API/CORS flows were tested.

This makes the implementation and its documentation measurable, transparent, and easier to evaluate.

