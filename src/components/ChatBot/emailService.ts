
interface LeadData {
  name: string;
  email: string;
  properties: string;
  location: string;
  propertyType: string;
  currentManagement: string;
  wantsConsultation: boolean;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export async function sendLeadEmail(leadData: LeadData, chatHistory: Message[]) {
  const emailBody = createEmailBody(leadData, chatHistory);
  const subject = `New PropCloud Lead: ${leadData.name} (${leadData.properties} properties)`;
  
  // Create mailto link for immediate email sending
  const mailtoLink = `mailto:contact@propcloud.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  
  // Open email client
  window.open(mailtoLink);
  
  // Also log to console for debugging
  console.log('New Lead Captured:', {
    leadData,
    emailBody,
    timestamp: new Date().toISOString()
  });
  
  return Promise.resolve();
}

function createEmailBody(leadData: LeadData, chatHistory: Message[]): string {
  const timestamp = new Date().toLocaleString();
  
  return `
🎯 NEW PROPCLOUD LEAD CAPTURED
Generated: ${timestamp}

👤 CONTACT INFORMATION
Name: ${leadData.name}
Email: ${leadData.email}

🏠 PROPERTY DETAILS
Number of Properties: ${leadData.properties}
Location: ${leadData.location}
Property Type: ${leadData.propertyType}
Current Management: ${leadData.currentManagement}

💬 CONSULTATION REQUEST
Wants Consultation: ${leadData.wantsConsultation ? 'YES' : 'No'}

📋 CHAT CONVERSATION HISTORY
${chatHistory.map(msg => 
  `${msg.isBot ? '🤖 PropBot' : '👤 Visitor'} (${msg.timestamp.toLocaleTimeString()}): ${msg.text}`
).join('\n')}

---
This lead was automatically captured by PropBot on the PropCloud website.
Please follow up within 24 hours for best conversion rates.
`;
}
