
import { FlowData } from './ConversationFlows';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Legacy interface for backward compatibility
interface LeadData {
  name: string;
  email: string;
  properties: string;
  location: string;
  propertyType: string;
  currentManagement: string;
  wantsConsultation: boolean;
}

export async function sendFlowEmail(flowData: FlowData, chatHistory: Message[]) {
  const emailBody = createFlowEmailBody(flowData, chatHistory);
  const subject = `New PropCloud ${getFlowDisplayName(flowData.flowType)}: ${flowData.name}`;
  
  try {
    const response = await fetch('https://formspree.io/f/mblyajdg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: subject,
        message: emailBody,
        flowType: flowData.flowType,
        name: flowData.name,
        email: flowData.email,
        timestamp: new Date().toISOString()
      })
    });
    
    if (response.ok) {
      console.log('Lead data sent successfully to Formspree');
    } else {
      console.error('Failed to send lead data to Formspree');
    }
  } catch (error) {
    console.error('Error sending lead data:', error);
  }
  
  // Also log to console for debugging
  console.log('New Flow Completion:', {
    flowData,
    emailBody,
    timestamp: new Date().toISOString()
  });
  
  return Promise.resolve();
}

// Legacy function for backward compatibility
export async function sendLeadEmail(leadData: LeadData, chatHistory: Message[]) {
  const emailBody = createEmailBody(leadData, chatHistory);
  const subject = `New PropCloud Lead: ${leadData.name} (${leadData.properties} properties)`;
  
  try {
    const response = await fetch('https://formspree.io/f/mblyajdg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: subject,
        message: emailBody,
        flowType: 'legacy',
        name: leadData.name,
        email: leadData.email,
        timestamp: new Date().toISOString()
      })
    });
    
    if (response.ok) {
      console.log('Legacy lead data sent successfully to Formspree');
    } else {
      console.error('Failed to send legacy lead data to Formspree');
    }
  } catch (error) {
    console.error('Error sending legacy lead data:', error);
  }
  
  console.log('New Lead Captured:', {
    leadData,
    emailBody,
    timestamp: new Date().toISOString()
  });
  
  return Promise.resolve();
}

function getFlowDisplayName(flowType: string): string {
  const names = {
    waitlist: 'AI Waitlist Sign-up',
    management: 'Property Management Inquiry',
    connect: 'General Connection Request'
  };
  return names[flowType as keyof typeof names] || 'Unknown Flow';
}

function createFlowEmailBody(flowData: FlowData, chatHistory: Message[]): string {
  const timestamp = new Date().toLocaleString();
  const flowDisplayName = getFlowDisplayName(flowData.flowType);
  
  let details = `
🎯 NEW PROPCLOUD ${flowDisplayName.toUpperCase()}
Generated: ${timestamp}

👤 CONTACT INFORMATION
Name: ${flowData.name}
Email: ${flowData.email}
`;

  // Add flow-specific details
  if (flowData.flowType === 'waitlist') {
    details += `
🚀 AI WAITLIST DETAILS
City/Market: ${flowData.city}
Currently Managing: ${flowData.currentlyManaging}
AI Excitement: ${flowData.aiExcitement}
`;
  } else if (flowData.flowType === 'management') {
    details += `
🏠 PROPERTY MANAGEMENT DETAILS
Number of Properties: ${flowData.propertyCount}
Location: ${flowData.location}
Management Type: ${flowData.managementType}
`;
  } else if (flowData.flowType === 'connect') {
    details += `
💬 CONNECTION REQUEST
Help Message: ${flowData.helpMessage}
`;
  }

  details += `
📋 CHAT CONVERSATION HISTORY
${chatHistory.map(msg => 
  `${msg.isBot ? '🤖 PropBot' : '👤 Visitor'} (${msg.timestamp.toLocaleTimeString()}): ${msg.text}`
).join('\n')}

---
This ${flowDisplayName.toLowerCase()} was automatically captured by PropBot on the PropCloud website.
Please follow up within 48 hours for best conversion rates.
`;

  return details;
}

// Legacy function for backward compatibility
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
