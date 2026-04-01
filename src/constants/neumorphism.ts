export const neuShadows = {
  light: {
    raised: "6px 6px 12px rgba(0,0,0,0.08), -6px -6px 12px rgba(255,255,255,0.9)",
    raisedSmall: "3px 3px 6px rgba(0,0,0,0.08), -3px -3px 6px rgba(255,255,255,0.9)",
    inset: "inset 3px 3px 6px rgba(0,0,0,0.08), inset -3px -3px 6px rgba(255,255,255,0.9)",
    flat: "2px 2px 4px rgba(0,0,0,0.06), -2px -2px 4px rgba(255,255,255,0.7)",
  },
  dark: {
    raised: "6px 6px 12px rgba(0,0,0,0.4), -3px -3px 8px rgba(102,187,106,0.07)",
    raisedSmall: "3px 3px 6px rgba(0,0,0,0.4), -2px -2px 4px rgba(102,187,106,0.07)",
    inset: "inset 3px 3px 6px rgba(0,0,0,0.5), inset -2px -2px 4px rgba(102,187,106,0.05)",
    flat: "2px 2px 4px rgba(0,0,0,0.3), -1px -1px 3px rgba(102,187,106,0.05)",
  },
  correctInset: "inset 2px 2px 5px rgba(46,125,50,0.3), inset -2px -2px 5px rgba(102,187,106,0.15)",
  wrongInset: "inset 2px 2px 5px rgba(211,47,47,0.3), inset -2px -2px 5px rgba(255,82,82,0.1)",
  transition: "all 200ms ease-in-out",
} as const;
