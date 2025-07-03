
import { FormValidation } from '@/types/chatbot';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateLinkedInUrl = (url: string): boolean => {
  if (!url) return true; // Optional field
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
  return linkedinRegex.test(url);
};

export const validateFileUpload = (file: File): FormValidation => {
  const errors: string[] = [];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const allowedExtensions = ['.pdf', '.doc', '.docx'];

  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }

  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!allowedExtensions.includes(fileExtension)) {
    errors.push('Only PDF, DOC, and DOCX files are allowed');
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push('Invalid file type');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
