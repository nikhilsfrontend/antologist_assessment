const suspiciousPatterns = [
  /<\s*script\b/i,
  /<\s*\/\s*script\s*>/i,
  /javascript\s*:/i,
  /<\s*iframe\b/i,
  /<\s*object\b/i,
  /<\s*embed\b/i,
  /\bon\w+\s*=/i,
];

export function containsSuspiciousInput(value) {
  if (typeof value !== "string") {
    return false;
  }

  return suspiciousPatterns.some((pattern) =>
    pattern.test(value)
  );
}

export function hasSuspiciousFormInput(data) {
  return Object.values(data).some((value) =>
    containsSuspiciousInput(value)
  );
}