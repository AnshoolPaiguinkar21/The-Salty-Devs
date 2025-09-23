# Zod Validation System

This directory contains the comprehensive Zod validation implementation for the server-side application.

## Overview

The validation system has been completely refactored to use Zod exclusively, providing:
- **Robust password validation** with security requirements
- **Clean error handling** with user-friendly messages
- **Input sanitization** with automatic trimming and formatting
- **Type safety** with TypeScript integration
- **Reusable schemas** for consistent validation across the application

## Files Structure

```
validation/
├── user.validation.ts          # User-related validation schemas
├── validation.middleware.ts     # Validation middleware functions
├── validation-examples.ts       # Examples and testing utilities
└── README.md                   # This documentation
```

## Key Features

### 1. Enhanced Password Validation

The password validation now includes comprehensive security requirements:

```typescript
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password must not exceed 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');
```

**Requirements:**
- Minimum 8 characters, maximum 128 characters
- At least one uppercase letter (A-Z)
- At least one number (0-9)
- At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)

### 2. Input Sanitization

All string inputs are automatically sanitized:
- **Trimming**: Removes leading/trailing whitespace
- **Email normalization**: Converts emails to lowercase
- **Name validation**: Only allows letters and spaces

### 3. Clean Error Handling

Errors are returned in a consistent, user-friendly format:

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "password",
      "message": "Password must contain at least one uppercase letter"
    },
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### 4. Validation Middleware

The system uses middleware for automatic validation:

```typescript
// Body validation
router.post('/register', validateBody(registerUserSchema), UserControllers.createUser);

// Parameter validation
router.get('/:id', validateParams(userIdSchema), UserControllers.fetchUser);

// Query validation
router.get('/search', validateQuery(searchSchema), UserControllers.searchUsers);
```

## Available Schemas

### User Schemas

1. **registerUserSchema** - For user registration
   - name: 2-50 characters, letters and spaces only
   - email: Valid email format, automatically lowercased
   - password: Meets security requirements
   - bio: Optional, max 500 characters

2. **loginUserSchema** - For user login
   - email: Valid email format
   - password: Required (any string for login)

3. **updateUserSchema** - For updating user profile
   - name: Optional, same rules as registration
   - email: Optional, same rules as registration
   - bio: Optional, max 500 characters

4. **updatePasswordSchema** - For password changes
   - currentPassword: Required
   - newPassword: Meets security requirements
   - confirmPassword: Must match newPassword

5. **userIdSchema** - For validating user IDs
   - id: Valid UUID format

## Usage Examples

### In Controllers (with middleware)

```typescript
// Registration endpoint
router.post('/register', validateBody(registerUserSchema), async (req, res) => {
  // req.body is already validated and sanitized
  const userData = req.body as RegisterUserInput;
  // ... rest of controller logic
});
```

### Manual Validation (in services)

```typescript
import { validateData } from '@middlewares/validation.middleware';

const validation = validateData(registerUserSchema, userData);
if (!validation.success) {
  return {
    error: true,
    errors: validation.errors
  };
}
// Use validation.data (validated and sanitized)
```

## Error Response Format

All validation errors follow this consistent format:

```typescript
{
  status: "error",
  message: "Validation failed",
  errors: [
    {
      field: string,      // The field that failed validation
      message: string     // User-friendly error message
    }
  ]
}
```

## Testing

Use the validation examples file to test the validation system:

```typescript
import { testValidation } from './validation-examples';

// Run validation tests
testValidation();
```

## Migration from express-validator

The system has been completely migrated from express-validator to Zod:

### Before (express-validator)
```typescript
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
```

### After (Zod with middleware)
```typescript
// Validation happens automatically in middleware
// Controllers receive clean, validated data
const userData = req.body as RegisterUserInput;
```

## Benefits

1. **Type Safety**: Full TypeScript integration with inferred types
2. **Better Error Messages**: User-friendly, specific error messages
3. **Input Sanitization**: Automatic data cleaning and formatting
4. **Consistency**: Uniform validation across all endpoints
5. **Maintainability**: Centralized validation logic
6. **Security**: Robust password requirements and input validation
7. **Performance**: Single validation pass with automatic sanitization

## Future Enhancements

Consider adding:
- Rate limiting validation
- File upload validation
- Custom validation rules for business logic
- Internationalization for error messages
- Validation caching for performance optimization
