import { ref, computed } from 'vue'

// Define types
interface ComponentInput {
  name: string
  type: string
  description: string
  required: boolean
}

interface ComponentOutput {
  name: string
  type: string
  description: string
}

interface ComponentConfiguration {
  auth_method: {
    type: string
    options: string[]
    description: string
  }
}

interface Component {
  id: string
  name: string
  type: string
  tags: string[]
  description: string
  inputs: ComponentInput[]
  outputs: ComponentOutput[]
  configurations: ComponentConfiguration
  icon: string
  category: string
  status: string
}

export function useComponents() {
  const components = ref<Component[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  // Fetch components data
  const fetchComponents = async () => {
    try {
      isLoading.value = true
      // Load all components from the provided data
      components.value = [
  {
    "id": "google-forms",
    "name": "Google Forms",
    "type": "integration",
    "tags": ["Google", "Forms", "Automation"],
    "description": "Integrate with Google Forms to automate form submissions.",
    "inputs": [
      {
        "name": "Form ID",
        "type": "text",
        "description": "The ID of the Google Form.",
        "required": true
      },
      {
        "name": "Form Responses",
        "type": "json",
        "description": "The responses to submit to the form.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Form Submission Status",
        "type": "json",
        "description": "Indicates whether the form submission was successful."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "google-forms-icon",
    "category": "Google Services",
    "status": "active"
  },
  {
    "id": "calendly",
    "name": "Calendly",
    "type": "integration",
    "tags": ["Scheduling", "Automation"],
    "description": "Integrate with Calendly to automate scheduling of meetings.",
    "inputs": [
      {
        "name": "Event Type",
        "type": "text",
        "description": "The type of event to schedule (e.g., meeting, consultation).",
        "required": true
      },
      {
        "name": "Invitees Email",
        "type": "text",
        "description": "The email address of the invitee to schedule the event with.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Scheduling Status",
        "type": "json",
        "description": "Indicates whether the meeting was successfully scheduled."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "calendly-icon",
    "category": "Productivity",
    "status": "active"
  },
  {
    "id": "typeform",
    "name": "Typeform",
    "type": "integration",
    "tags": ["Forms", "Surveys", "Automation"],
    "description": "Create and manage surveys and forms through Typeform integration.",
    "inputs": [
      {
        "name": "Form ID",
        "type": "text",
        "description": "The ID of the Typeform form.",
        "required": true
      },
      {
        "name": "Responses",
        "type": "json",
        "description": "Responses to submit or retrieve from the form.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Form Submission Status",
        "type": "json",
        "description": "Indicates whether the form submission was successful."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "typeform-icon",
    "category": "Forms & Surveys",
    "status": "active"
  },
  {
    "id": "trello",
    "name": "Trello",
    "type": "integration",
    "tags": ["Project Management", "Task Management", "Automation"],
    "description": "Integrate with Trello to manage boards, lists, and cards.",
    "inputs": [
      {
        "name": "Board ID",
        "type": "text",
        "description": "The ID of the Trello board to interact with.",
        "required": true
      },
      {
        "name": "List Name",
        "type": "text",
        "description": "The name of the list to add a card to.",
        "required": true
      },
      {
        "name": "Card Title",
        "type": "text",
        "description": "The title of the card to create or update.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Card Status",
        "type": "json",
        "description": "Indicates whether the card was successfully created or updated."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "trello-icon",
    "category": "Productivity",
    "status": "active"
  },
  {
    "id": "microsoft-outlook",
    "name": "Microsoft Outlook",
    "type": "integration",
    "tags": ["Email", "Microsoft", "Automation"],
    "description": "Send and receive emails, manage contacts, and handle calendar events.",
    "inputs": [
      {
        "name": "Email Address",
        "type": "text",
        "description": "The email address to send from or receive messages.",
        "required": true
      },
      {
        "name": "Subject",
        "type": "text",
        "description": "The subject of the email.",
        "required": true
      },
      {
        "name": "Body",
        "type": "text",
        "description": "The body of the email.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Send Status",
        "type": "json",
        "description": "Indicates the result of the send operation."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "outlook-icon",
    "category": "Email Services",
    "status": "active"
  },
  {
    "id": "airtable",
    "name": "Airtable",
    "type": "integration",
    "tags": ["Database", "Spreadsheet", "Automation"],
    "description": "Automate data management with Airtable's API integration.",
    "inputs": [
      {
        "name": "Base ID",
        "type": "text",
        "description": "The ID of the Airtable base.",
        "required": true
      },
      {
        "name": "Table Name",
        "type": "text",
        "description": "The name of the table within the base.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Record Data",
        "type": "json",
        "description": "Returns the record data from the specified table."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["API Key"],
        "description": "Authenticate using Airtable's API key."
      }
    },
    "icon": "airtable-icon",
    "category": "Database",
    "status": "active"
  },
  {
    "id": "rss",
    "name": "RSS",
    "type": "integration",
    "tags": ["Feeds", "Automation"],
    "description": "Automate the collection of RSS feed data.",
    "inputs": [
      {
        "name": "RSS Feed URL",
        "type": "text",
        "description": "The URL of the RSS feed to collect data from.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Feed Data",
        "type": "json",
        "description": "Returns data from the specified RSS feed."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["None"],
        "description": "No authentication required."
      }
    },
    "icon": "rss-icon",
    "category": "Feeds",
    "status": "active"
  },
  {
    "id": "google-forms-legacy",
    "name": "Google Forms (Legacy)",
    "type": "integration",
    "tags": ["Google", "Forms", "Automation"],
    "description": "Integrate with the legacy version of Google Forms for form submissions.",
    "inputs": [
      {
        "name": "Form ID",
        "type": "text",
        "description": "The ID of the Google Form.",
        "required": true
      },
      {
        "name": "Form Responses",
        "type": "json",
        "description": "The responses to submit to the form.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Form Submission Status",
        "type": "json",
        "description": "Indicates whether the form submission was successful."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "google-forms-legacy-icon",
    "category": "Google Services",
    "status": "active"
  },
  {
    "id": "stripe",
    "name": "Stripe",
    "type": "integration",
    "tags": ["Payments", "Stripe", "Automation"],
    "description": "Integrate with Stripe to handle payments, subscriptions, and more.",
    "inputs": [
      {
        "name": "Amount",
        "type": "number",
        "description": "The amount to charge (in cents).",
        "required": true
      },
      {
        "name": "Currency",
        "type": "dropdown",
        "options": ["USD", "EUR", "GBP", "INR"],
        "description": "The currency to charge in.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Payment Status",
        "type": "json",
        "description": "Indicates the status of the payment (e.g., successful, failed)."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["API Key"],
        "description": "Authenticate using your Stripe API key."
      }
    },
    "icon": "stripe-icon",
    "category": "Payments",
    "status": "active"
  },
  {
    "id": "discord",
    "name": "Discord",
    "type": "integration",
    "tags": ["Chat", "Automation"],
    "description": "Integrate with Discord to send messages and manage servers.",
    "inputs": [
      {
        "name": "Channel ID",
        "type": "text",
        "description": "The ID of the Discord channel to send messages to.",
        "required": true
      },
      {
        "name": "Message Content",
        "type": "text",
        "description": "The content of the message to send.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Message Status",
        "type": "json",
        "description": "Indicates whether the message was successfully sent."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth"],
        "description": "Authenticate using Discord's OAuth."
      }
    },
    "icon": "discord-icon",
    "category": "Chat & Messaging",
    "status": "active"
  },
  {
    "id": "leadconnector",
    "name": "LeadConnector",
    "type": "integration",
    "tags": ["CRM", "Automation", "Marketing"],
    "description": "Integrate with LeadConnector for lead management and automation.",
    "inputs": [
      {
        "name": "Lead Name",
        "type": "text",
        "description": "The name of the lead.",
        "required": true
      },
      {
        "name": "Lead Email",
        "type": "text",
        "description": "The email address of the lead.",
        "required": true
      },
      {
        "name": "Lead Source",
        "type": "dropdown",
        "options": ["Website", "Ad Campaign", "Referral", "Other"],
        "description": "Source from which the lead came.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Lead Status",
        "type": "json",
        "description": "Indicates the status of the lead (e.g., new, contacted, qualified)."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["API Key", "OAuth"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "leadconnector-icon",
    "category": "CRM",
    "status": "active"
  },
  {
    "id": "activecampaign",
    "name": "ActiveCampaign",
    "type": "integration",
    "tags": ["CRM", "Email Marketing", "Automation"],
    "description": "Automate your marketing and CRM workflows with ActiveCampaign.",
    "inputs": [
      {
        "name": "Campaign ID",
        "type": "text",
        "description": "The ID of the ActiveCampaign campaign.",
        "required": true
      },
      {
        "name": "Subscriber Email",
        "type": "text",
        "description": "The email address of the subscriber to add to the campaign.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Campaign Status",
        "type": "json",
        "description": "Indicates whether the subscriber was successfully added to the campaign."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["API Key", "OAuth"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "activecampaign-icon",
    "category": "Email Marketing",
    "status": "active"
  },
  {
    "id": "chatgpt",
    "name": "ChatGPT",
    "type": "integration",
    "tags": ["AI", "Chat", "Automation"],
    "description": "Integrate with OpenAI's ChatGPT for automated conversations and processing.",
    "inputs": [
      {
        "name": "Prompt",
        "type": "text",
        "description": "The input text or question to send to ChatGPT for response.",
        "required": true
      },
      {
        "name": "Model",
        "type": "dropdown",
        "options": ["gpt-3.5-turbo", "gpt-4"],
        "description": "The model version to use for the response.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Response",
        "type": "text",
        "description": "The response generated by ChatGPT."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["API Key"],
        "description": "Authenticate using your OpenAI API key."
      }
    },
    "icon": "chatgpt-icon",
    "category": "AI",
    "status": "active"
  },
  {
    "id": "webflow",
    "name": "Webflow",
    "type": "integration",
    "tags": ["Web Design", "CMS", "Automation"],
    "description": "Automate website design and content management with Webflow.",
    "inputs": [
      {
        "name": "Project ID",
        "type": "text",
        "description": "The ID of the Webflow project.",
        "required": true
      },
      {
        "name": "Page URL",
        "type": "text",
        "description": "The URL of the page to update or interact with.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Page Update Status",
        "type": "json",
        "description": "Indicates whether the page was successfully updated."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "webflow-icon",
    "category": "Web Design",
    "status": "active"
  },
  {
    "id": "salesforce",
    "name": "Salesforce",
    "type": "integration",
    "tags": ["CRM", "Sales", "Automation"],
    "description": "Integrate Salesforce for managing leads, opportunities, and customer data.",
    "inputs": [
      {
        "name": "Lead Name",
        "type": "text",
        "description": "The name of the lead.",
        "required": true
      },
      {
        "name": "Lead Email",
        "type": "text",
        "description": "The email address of the lead.",
        "required": true
      },
      {
        "name": "Opportunity Stage",
        "type": "dropdown",
        "options": ["Prospecting", "Qualified", "Negotiation", "Closed Won"],
        "description": "The stage of the opportunity.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Lead Status",
        "type": "json",
        "description": "Indicates whether the lead was successfully added to Salesforce."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "salesforce-icon",
    "category": "CRM",
    "status": "active"
  },
  {
    "id": "asana",
    "name": "Asana",
    "type": "integration",
    "tags": ["Task Management", "Project Management", "Automation"],
    "description": "Automate task and project management with Asana integration.",
    "inputs": [
      {
        "name": "Project ID",
        "type": "text",
        "description": "The ID of the Asana project.",
        "required": true
      },
      {
        "name": "Task Name",
        "type": "text",
        "description": "The name of the task to add to the project.",
        "required": true
      },
      {
        "name": "Due Date",
        "type": "date",
        "description": "The due date for the task.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Task Status",
        "type": "json",
        "description": "Indicates whether the task was successfully created."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "asana-icon",
    "category": "Project Management",
    "status": "active"
  },
  {
    "id": "gravity-forms",
    "name": "Gravity Forms",
    "type": "integration",
    "tags": ["Forms", "Automation"],
    "description": "Automate form submissions and manage data in Gravity Forms.",
    "inputs": [
      {
        "name": "Form ID",
        "type": "text",
        "description": "The ID of the Gravity Form.",
        "required": true
      },
      {
        "name": "Form Data",
        "type": "json",
        "description": "The data to submit to the form.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Form Submission Status",
        "type": "json",
        "description": "Indicates whether the form submission was successful."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["API Key", "OAuth"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "gravity-forms-icon",
    "category": "Forms",
    "status": "active"
  },
  {
    "id": "monday-com",
    "name": "monday.com",
    "type": "integration",
    "tags": ["Project Management", "Automation"],
    "description": "Automate workflows and manage projects with monday.com integration.",
    "inputs": [
      {
        "name": "Board ID",
        "type": "text",
        "description": "The ID of the monday.com board.",
        "required": true
      },
      {
        "name": "Item Name",
        "type": "text",
        "description": "The name of the item to add to the board.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Item Status",
        "type": "json",
        "description": "Indicates whether the item was successfully created in monday.com."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "monday-com-icon",
    "category": "Project Management",
    "status": "active"
  },
  {
    "id": "google-docs",
    "name": "Google Docs",
    "type": "integration",
    "tags": ["Document Management", "Google"],
    "description": "Automate document management with Google Docs integration.",
    "inputs": [
      {
        "name": "Document ID",
        "type": "text",
        "description": "The ID of the Google Doc to modify.",
        "required": true
      },
      {
        "name": "Document Content",
        "type": "text",
        "description": "The content to add to the document.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Document Status",
        "type": "json",
        "description": "Indicates whether the document was successfully updated."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth"],
        "description": "Authenticate using Google OAuth."
      }
    },
    "icon": "google-docs-icon",
    "category": "Document Management",
    "status": "active"
  },
  {
    "id": "jotform",
    "name": "Jotform",
    "type": "integration",
    "tags": ["Forms", "Automation"],
    "description": "Integrate Jotform for form automation and data management.",
    "inputs": [
      {
        "name": "Form ID",
        "type": "text",
        "description": "The ID of the Jotform form.",
        "required": true
      },
      {
        "name": "Form Data",
        "type": "json",
        "description": "The data to submit to the form.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Form Submission Status",
        "type": "json",
        "description": "Indicates whether the form submission was successful."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["API Key", "OAuth"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "jotform-icon",
    "category": "Forms",
    "status": "active"
  },
  {
    "id": "youtube",
    "name": "YouTube",
    "type": "integration",
    "tags": ["Video", "Social Media", "Media Management"],
    "description": "Integrate YouTube for video management and automation.",
    "inputs": [
      {
        "name": "Video Title",
        "type": "text",
        "description": "The title of the video to upload or manage.",
        "required": true
      },
      {
        "name": "Video File",
        "type": "file",
        "description": "The video file to upload.",
        "required": true
      },
      {
        "name": "Video Description",
        "type": "text",
        "description": "A description for the video.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "Upload Status",
        "type": "json",
        "description": "Indicates the success or failure of the video upload."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth"],
        "description": "Authenticate using Google OAuth."
      }
    },
    "icon": "youtube-icon",
    "category": "Video",
    "status": "active"
  },
  {
    "id": "pipedrive",
    "name": "Pipedrive",
    "type": "integration",
    "tags": ["CRM", "Sales", "Automation"],
    "description": "Automate your sales pipeline and CRM activities with Pipedrive.",
    "inputs": [
      {
        "name": "Deal Name",
        "type": "text",
        "description": "The name of the deal to add or update.",
        "required": true
      },
      {
        "name": "Deal Value",
        "type": "number",
        "description": "The monetary value of the deal.",
        "required": true
      },
      {
        "name": "Deal Status",
        "type": "dropdown",
        "options": ["Open", "Won", "Lost"],
        "description": "The current status of the deal.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Deal Status Update",
        "type": "json",
        "description": "Indicates whether the deal status was successfully updated."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "pipedrive-icon",
    "category": "Sales",
    "status": "active"
  },
  {
    "id": "whatsapp-notifications",
    "name": "WhatsApp Notifications",
    "type": "integration",
    "tags": ["Messaging", "Notifications", "Automation"],
    "description": "Send WhatsApp notifications through automated workflows.",
    "inputs": [
      {
        "name": "Phone Number",
        "type": "text",
        "description": "The phone number of the recipient.",
        "required": true
      },
      {
        "name": "Message Content",
        "type": "text",
        "description": "The content of the message to send.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Message Status",
        "type": "json",
        "description": "Indicates whether the WhatsApp message was successfully sent."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["API Key", "OAuth"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "whatsapp-icon",
    "category": "Messaging",
    "status": "active"
  },
  {
    "id": "clickup",
    "name": "ClickUp",
    "type": "integration",
    "tags": ["Project Management", "Automation"],
    "description": "Manage tasks, projects, and workflows with ClickUp integration.",
    "inputs": [
      {
        "name": "Task Name",
        "type": "text",
        "description": "The name of the task to create or update.",
        "required": true
      },
      {
        "name": "Due Date",
        "type": "date",
        "description": "The due date of the task.",
        "required": false
      },
      {
        "name": "Priority",
        "type": "dropdown",
        "options": ["Low", "Medium", "High"],
        "description": "The priority level of the task.",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "Task Status",
        "type": "json",
        "description": "Indicates the success or failure of the task creation or update."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "clickup-icon",
    "category": "Project Management",
    "status": "active"
  },
  {
    "id": "squarespace",
    "name": "Squarespace",
    "type": "integration",
    "tags": ["Website Builder", "Content Management"],
    "description": "Integrate Squarespace to manage websites and content.",
    "inputs": [
      {
        "name": "Website ID",
        "type": "text",
        "description": "The ID of the Squarespace website to manage.",
        "required": true
      },
      {
        "name": "Page Content",
        "type": "text",
        "description": "Content to add or update on the webpage.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Page Update Status",
        "type": "json",
        "description": "Indicates the success or failure of the page content update."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth"],
        "description": "Authenticate using Squarespace OAuth."
      }
    },
    "icon": "squarespace-icon",
    "category": "Website Builder",
    "status": "active"
  },
  {
    "id": "shopify",
    "name": "Shopify",
    "type": "integration",
    "tags": ["E-commerce", "Automation"],
    "description": "Automate product and order management with Shopify integration.",
    "inputs": [
      {
        "name": "Product Name",
        "type": "text",
        "description": "The name of the product to manage.",
        "required": true
      },
      {
        "name": "Product Price",
        "type": "number",
        "description": "The price of the product.",
        "required": true
      },
      {
        "name": "Stock Quantity",
        "type": "number",
        "description": "The quantity of the product in stock.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Product Update Status",
        "type": "json",
        "description": "Indicates whether the product details were successfully updated."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "shopify-icon",
    "category": "E-commerce",
    "status": "active"
  },
  {
    "id": "facebook-pages",
    "name": "Facebook Pages",
    "type": "integration",
    "tags": ["Social Media", "Automation"],
    "description": "Automate social media management through Facebook Pages integration.",
    "inputs": [
      {
        "name": "Page ID",
        "type": "text",
        "description": "The ID of the Facebook page to manage.",
        "required": true
      },
      {
        "name": "Post Content",
        "type": "text",
        "description": "Content to post on the Facebook page.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Post Status",
        "type": "json",
        "description": "Indicates the success or failure of the post submission."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth"],
        "description": "Authenticate using Facebook OAuth."
      }
    },
    "icon": "facebook-pages-icon",
    "category": "Social Media",
    "status": "active"
  },
  {
    "id": "google-contacts",
    "name": "Google Contacts",
    "type": "integration",
    "tags": ["Contacts", "Google", "Automation"],
    "description": "Manage contacts in Google Contacts via automation.",
    "inputs": [
      {
        "name": "Contact Name",
        "type": "text",
        "description": "The name of the contact.",
        "required": true
      },
      {
        "name": "Contact Email",
        "type": "text",
        "description": "The email address of the contact.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Contact Status",
        "type": "json",
        "description": "Indicates whether the contact was successfully added or updated."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth"],
        "description": "Authenticate using Google OAuth."
      }
    },
    "icon": "google-contacts-icon",
    "category": "Contacts",
    "status": "active"
  },
  {
    "id": "zoom",
    "name": "Zoom",
    "type": "integration",
    "tags": ["Video Conferencing", "Communication"],
    "description": "Automate video conferencing tasks with Zoom integration.",
    "inputs": [
      {
        "name": "Meeting ID",
        "type": "text",
        "description": "The ID of the Zoom meeting.",
        "required": true
      },
      {
        "name": "Participant Name",
        "type": "text",
        "description": "The name of the participant.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Meeting Status",
        "type": "json",
        "description": "Indicates whether the participant was successfully added to the meeting."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "zoom-icon",
    "category": "Communication",
    "status": "active"
  },
  {
    "id": "microsoft-excel",
    "name": "Microsoft Excel",
    "type": "integration",
    "tags": ["Spreadsheets", "Microsoft"],
    "description": "Automate spreadsheet management tasks with Microsoft Excel integration.",
    "inputs": [
      {
        "name": "Sheet Name",
        "type": "text",
        "description": "The name of the Excel sheet to update.",
        "required": true
      },
      {
        "name": "Row Data",
        "type": "json",
        "description": "The data to insert or update in the specified row.",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "Excel Update Status",
        "type": "json",
        "description": "Indicates whether the row was successfully updated in the sheet."
      }
    ],
    "configurations": {
      "auth_method": {
        "type": "dropdown",
        "options": ["OAuth", "API Key"],
        "description": "Choose the authentication method."
      }
    },
    "icon": "microsoft-excel-icon",
    "category": "Spreadsheets",
    "status": "active"
  }],
      error.value = null
    } catch (e) {
      error.value = 'Failed to load components'
      console.error('Error loading components:', e)
    } finally {
      isLoading.value = false
    }
  }

  // Group components by category
  const groupedComponents = computed(() => {
    const groups: Record<string, Component[]> = {}
    components.value.forEach(component => {
      if (!groups[component.category]) {
        groups[component.category] = []
      }
      groups[component.category].push(component)
    })
    return groups
  })

  // Get component by ID
  const getComponentById = (id: string) => {
    return components.value.find(c => c.id === id)
  }

  // Initialize components on composable creation
  fetchComponents()

  return {
    components,
    groupedComponents,
    isLoading,
    error,
    getComponentById,
    fetchComponents
  }
}
