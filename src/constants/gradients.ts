/**
 * SHARED GRADIENT CONSTANTS
 * CENTRALIZED TO AVOID MAGIC VALUES SCATTERED ACROSS COMPONENTS.
 */
export const gradients = {
  brand: "linear-gradient(135deg, #B388FF 0%, #7C4DFF 50%, #00E5FF 100%)",
  brandReverse: "linear-gradient(135deg, #7C4DFF, #B388FF)",
  progress: "linear-gradient(90deg, #7C4DFF, #00E5FF)",
  success: "linear-gradient(135deg, #69F0AE, #00E5FF)",
  primary: "linear-gradient(135deg, #B388FF, #7C4DFF)",
  button: "linear-gradient(135deg, #7C4DFF 0%, #651FFF 100%)",
  buttonHover: "linear-gradient(135deg, #9E7CFF 0%, #7C4DFF 100%)",
} as const;
