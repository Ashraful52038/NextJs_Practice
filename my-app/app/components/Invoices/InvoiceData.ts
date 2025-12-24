// src/components/invoices/InvoiceData.ts
import { Invoice } from './types';

export const invoiceData: Invoice[] = [
  {
    id: 1,
    invoiceNumber: 'INV-2024-001',
    date: '2024-01-15',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    customerAddress: '123 Main Street, Suite 100\nNew York, NY 10001',
    companyName: 'Tech Solutions Inc.',
    companyAddress: '456 Business Road, Tech Park\nSan Francisco, CA 94107',
    companyLogo: 'https://via.placeholder.com/150x50/3b82f6/ffffff?text=TSI',
    items: [
      {
        id: 1,
        name: 'Website Redesign',
        description: 'Complete website redesign with responsive design',
        quantity: 1,
        price: 2500,
        unit: 'project',
      },
      {
        id: 2,
        name: 'Hosting Plan',
        description: 'Business hosting with SSL and email',
        quantity: 12,
        price: 29.99,
        unit: 'month',
      },
      {
        id: 3,
        name: 'Domain Registration',
        description: 'Annual domain registration',
        quantity: 1,
        price: 14.99,
        unit: 'year',
      },
      {
        id: 4,
        name: 'SEO Optimization',
        description: 'Monthly SEO service',
        quantity: 3,
        price: 500,
        unit: 'month',
      },
    ],
    taxRate: 10,
    currency: 'USD',
    paymentMethod: 'Bank Transfer',
    dueDate: '2024-02-15',
    notes: 'Thank you for your business. Please make payment within 30 days.',
    status: 'Paid',
    terms: 'Net 30. Late payments subject to 1.5% monthly interest.',
  },
  {
    id: 2,
    invoiceNumber: 'INV-2024-002',
    date: '2024-01-20',
    customer: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerAddress: '789 Oak Avenue, Floor 5\nChicago, IL 60601',
    companyName: 'Digital Services LLC',
    companyAddress: '101 Innovation Drive, Suite 200\nAustin, TX 78701',
    companyLogo: 'https://via.placeholder.com/150x50/10b981/ffffff?text=DSL',
    items: [
      {
        id: 1,
        name: 'Mobile App Development',
        description: 'Cross-platform mobile application',
        quantity: 1,
        price: 8500,
        unit: 'project',
      },
      {
        id: 2,
        name: 'API Integration',
        description: 'Third-party API integration services',
        quantity: 1,
        price: 1200,
        unit: 'project',
      },
      {
        id: 3,
        name: 'Monthly Maintenance',
        description: 'Ongoing support and maintenance',
        quantity: 6,
        price: 299,
        unit: 'month',
      },
      {
        id: 4,
        name: 'UI/UX Design',
        description: 'User interface and experience design',
        quantity: 1,
        price: 1500,
        unit: 'project',
      },
    ],
    taxRate: 10,
    currency: 'USD',
    paymentMethod: 'Credit Card',
    dueDate: '2024-02-20',
    notes: 'Please review and let us know if you have any questions.',
    status: 'Pending',
    terms: '50% advance payment required. Net 45.',
  },
];

export const getInvoiceCalculations = (invoice: Invoice) => {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const tax = subtotal * (invoice.taxRate / 100);
  const total = subtotal + tax;
  
  return { subtotal, tax, total };
};