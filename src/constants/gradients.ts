/**
 * SHARED GRADIENT CONSTANTS
 * CENTRALIZED TO AVOID MAGIC VALUES SCATTERED ACROSS COMPONENTS.
 */
export const gradients = {
  brand: "linear-gradient(135deg, #81C784 0%, #2E7D32 50%, #0097A7 100%)",
  brandReverse: "linear-gradient(135deg, #2E7D32, #81C784)",
  progress: "linear-gradient(90deg, #2E7D32, #4DB6AC)",
  success: "linear-gradient(135deg, #69F0AE, #4DB6AC)",
  primary: "linear-gradient(135deg, #81C784, #2E7D32)",
  button: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
  buttonHover: "linear-gradient(135deg, #43A047 0%, #2E7D32 100%)",
} as const;
