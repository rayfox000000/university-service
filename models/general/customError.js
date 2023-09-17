class CustomError extends Error {
  constructor(code, message) {
    super(message); // Call the parent class constructor with the error message
    this.name = 'CustomError'; // Set the error name (optional)
    this.code = code; // Add custom properties if needed
  }
}

module.exports = CustomError;