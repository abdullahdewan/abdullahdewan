export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}
