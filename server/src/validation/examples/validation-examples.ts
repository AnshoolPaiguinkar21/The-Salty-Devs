/**
 * This file demonstrates the improved Zod validation implementation
 * and provides examples of how the validation works
 */

import { 
  registerUserSchema, 
  loginUserSchema, 
  updateUserSchema,
  updatePasswordSchema,
  passwordSchema,
  emailSchema,
  nameSchema
} from '../user.validation.ts';

// Example usage and testing of validation schemas
export const validationExamples = {
  
  // Valid registration data
  validRegistration: {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "SecurePass123!",
    bio: "Software developer with 5 years of experience"
  },

  // Invalid registration data (will fail validation)
  invalidRegistration: {
    name: "J", // Too short
    email: "invalid-email", // Invalid email format
    password: "weak", // Doesn't meet password requirements
    bio: "A".repeat(501) // Too long
  },

  // Valid login data
  validLogin: {
    email: "john.doe@example.com",
    password: "anypassword"
  },

  // Invalid login data
  invalidLogin: {
    email: "invalid-email", // Invalid email format
    password: "" // Empty password
  },

  // Valid update data
  validUpdate: {
    name: "John Smith",
    email: "john.smith@example.com",
    bio: "Updated bio information"
  },

  // Valid password update data
  validPasswordUpdate: {
    currentPassword: "OldPass123!",
    newPassword: "NewSecurePass456@",
    confirmPassword: "NewSecurePass456@"
  },

  // Invalid password update (passwords don't match)
  invalidPasswordUpdate: {
    currentPassword: "OldPass123!",
    newPassword: "NewSecurePass456@",
    confirmPassword: "DifferentPassword123!"
  }
};

// Function to test validation schemas
export const testValidation = () => {
  console.log("=== Zod Validation Examples ===\n");

  // Test valid registration
  console.log("1. Testing valid registration:");
  const validRegResult = registerUserSchema.safeParse(validationExamples.validRegistration);
  console.log("Valid:", validRegResult.success);
  if (validRegResult.success) {
    console.log("Data:", validRegResult.data);
  }
  console.log();

  // Test invalid registration
  console.log("2. Testing invalid registration:");
  const invalidRegResult = registerUserSchema.safeParse(validationExamples.invalidRegistration);
  console.log("Valid:", invalidRegResult.success);
  if (!invalidRegResult.success) {
    console.log("Errors:", invalidRegResult.error.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message
    })));
  }
  console.log();

  // Test password validation specifically
  console.log("3. Testing password validation:");
  const passwords = [
    "weak", // Too short, no uppercase, no number, no special char
    "WeakPassword", // No number, no special char
    "WeakPass123", // No special char
    "weakpass123!", // No uppercase
    "StrongPass123!" // Valid
  ];

  passwords.forEach(password => {
    const result = passwordSchema.safeParse(password);
    console.log(`Password "${password}": ${result.success ? 'Valid' : 'Invalid'}`);
    if (!result.success) {
      console.log(`  Errors: ${result.error.issues.map(i => i.message).join(', ')}`);
    }
  });
  console.log();

  // Test email validation
  console.log("4. Testing email validation:");
  const emails = [
    "valid@example.com",
    "invalid-email",
    "another.valid+email@domain.co.uk",
    "@invalid.com",
    "valid@"
  ];

  emails.forEach(email => {
    const result = emailSchema.safeParse(email);
    console.log(`Email "${email}": ${result.success ? 'Valid' : 'Invalid'}`);
  });
  console.log();

  console.log("=== Validation Examples Complete ===");
};

// Password strength requirements documentation
export const passwordRequirements = {
  minLength: 8,
  maxLength: 128,
  mustContain: [
    "At least one uppercase letter (A-Z)",
    "At least one number (0-9)",
    "At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)"
  ],
  examples: {
    valid: [
      "SecurePass123!",
      "MyP@ssw0rd",
      "Str0ng#Password",
      "C0mplex!Pass"
    ],
    invalid: [
      "weak", // Too short
      "weakpassword", // No uppercase, no number, no special char
      "WEAKPASSWORD", // No lowercase, no number, no special char
      "WeakPassword", // No number, no special char
      "WeakPass123", // No special char
      "weakpass123!" // No uppercase
    ]
  }
};
