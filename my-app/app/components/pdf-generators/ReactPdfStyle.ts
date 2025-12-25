// src/components/pdf-generators/ReactPdfStyles.ts
import { StyleSheet } from '@react-pdf/renderer';

// Tailwind CSS inspired styles
export const pdfStyles = StyleSheet.create({
  // Layout
  page: {
    padding: 32, // p-8 equivalent
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#374151', // text-gray-700
  },
  
  // Spacing utilities
  mt4: { marginTop: 16 },
  mt6: { marginTop: 24 },
  mt8: { marginTop: 32 },
  mb4: { marginBottom: 16 },
  mb6: { marginBottom: 24 },
  mb8: { marginBottom: 32 },
  mlAuto: { marginLeft: 'auto' },
  mrAuto: { marginRight: 'auto' },
  
  // Flex utilities
  flex: { display: 'flex' },
  flexRow: { flexDirection: 'row' },
  flexCol: { flexDirection: 'column' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyEnd: { justifyContent: 'flex-end' },
  itemsCenter: { alignItems: 'center' },
  itemsStart: { alignItems: 'flex-start' },
  itemsEnd: { alignItems: 'flex-end' },
  flex1: { flex: 1 },
  flexGrow: { flexGrow: 1 },
  
  // Width utilities
  wFull: { width: '100%' },
  wHalf: { width: '50%' },
  wAuto: { width: 'auto' },
  
  // Text utilities
  textXs: { fontSize: 10 },
  textSm: { fontSize: 12 },
  textBase: { fontSize: 14 },
  textLg: { fontSize: 18 },
  textXl: { fontSize: 24 },
  text2xl: { fontSize: 28 },
  
  // Font weight
  fontNormal: { fontWeight: 'normal' },
  fontMedium: { fontWeight: 'medium' },
  fontSemibold: { fontWeight: 'semibold' },
  fontBold: { fontWeight: 'bold' },
  
  // Text colors (Tailwind inspired)
  textGray50: { color: '#f9fafb' },
  textGray100: { color: '#f3f4f6' },
  textGray200: { color: '#e5e7eb' },
  textGray300: { color: '#d1d5db' },
  textGray400: { color: '#9ca3af' },
  textGray500: { color: '#6b7280' },
  textGray600: { color: '#4b5563' },
  textGray700: { color: '#374151' },
  textGray800: { color: '#1f2937' },
  textGray900: { color: '#111827' },
  textBlue600: { color: '#2563eb' },
  textBlue700: { color: '#1d4ed8' },
  textRed600: { color: '#dc2626' },
  textGreen600: { color: '#16a34a' },
  textWhite: { color: '#ffffff' },
  
  // Background colors
  bgWhite: { backgroundColor: '#ffffff' },
  bgGray50: { backgroundColor: '#f9fafb' },
  bgGray100: { backgroundColor: '#f3f4f6' },
  bgGray200: { backgroundColor: '#e5e7eb' },
  bgBlue50: { backgroundColor: '#eff6ff' },
  bgBlue100: { backgroundColor: '#dbeafe' },
  bgBlue600: { backgroundColor: '#2563eb' },
  bgBlue700: { backgroundColor: '#1d4ed8' },
  
  // Border styles
  border: { borderWidth: 1, borderStyle: 'solid' },
  border0: { borderWidth: 0 },
  border2: { borderWidth: 2 },
  borderGray200: { borderColor: '#e5e7eb' },
  borderGray300: { borderColor: '#d1d5db' },
  borderBlue500: { borderColor: '#3b82f6' },
  borderBlue600: { borderColor: '#2563eb' },
  rounded: { borderRadius: 4 },
  roundedSm: { borderRadius: 2 },
  roundedMd: { borderRadius: 6 },
  roundedLg: { borderRadius: 8 },
  
  // Padding
  p0: { padding: 0 },
  p2: { padding: 8 },
  p3: { padding: 12 },
  p4: { padding: 16 },
  p6: { padding: 24 },
  p8: { padding: 32 },
  px3: { paddingHorizontal: 12 },
  px4: { paddingHorizontal: 16 },
  px6: { paddingHorizontal: 24 },
  py2: { paddingVertical: 8 },
  py3: { paddingVertical: 12 },
  py4: { paddingVertical: 16 },
  
  // Text alignment
  textLeft: { textAlign: 'left' },
  textCenter: { textAlign: 'center' },
  textRight: { textAlign: 'right' },
  
  // Specific component styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    borderBottomStyle: 'solid',
  },
  
  invoiceInfo: {
    textAlign: 'right',
    fontSize: 10,
    color: '#6b7280',
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#374151',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
  },
  
  infoBox: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'solid',
    flex: 1,
    marginRight: 16,
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  
  tableHeaderCell: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
  },
  
  tableCell: {
    flex: 1,
    fontSize: 11,
    color: '#4b5563',
  },
  
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginBottom: 8,
    paddingVertical: 6,
  },
  
  notesBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    fontSize: 11,
    color: '#4b5563',
  },
});

// Theme constants (colors, spacing, etc.)
export const pdfTheme = {
  colors: {
    primary: '#3b82f6',
    primaryDark: '#1d4ed8',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: '#16a34a',
    error: '#dc2626',
    warning: '#ca8a04',
    info: '#2563eb',
  },
  
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
  },
  
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 18,
    xl: 24,
    '2xl': 28,
    '3xl': 32,
  },
  
  borderRadius: {
    sm: 2,
    base: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    full: 9999,
  },
};

// Helper function to combine styles
export const combineStyles = (...styleArgs: any[]) => {
  return styleArgs.reduce((acc, style) => {
    if (Array.isArray(style)) {
      return [...acc, ...style];
    }
    return [...acc, style];
  }, []);
};

// Pre-composed styles for common components
export const componentStyles = {
  invoiceHeader: [
    pdfStyles.flexRow,
    pdfStyles.justifyBetween,
    pdfStyles.mb6,
    pdfStyles.pb4,
    { borderBottomWidth: 2, borderBottomColor: '#3b82f6' },
  ],
  
  card: [
    pdfStyles.p4,
    pdfStyles.bgWhite,
    pdfStyles.roundedMd,
    pdfStyles.border,
    pdfStyles.borderGray200,
    pdfStyles.shadowSm,
  ],
  
  tableHeaderRow: [
    pdfStyles.flexRow,
    pdfStyles.bgBlue600,
    pdfStyles.py3,
    pdfStyles.px4,
    pdfStyles.rounded,
  ],
  
  tableDataRow: (index: number) => [
    pdfStyles.flexRow,
    pdfStyles.py3,
    pdfStyles.px4,
    index % 2 === 0 ? pdfStyles.bgGray50 : pdfStyles.bgWhite,
    { borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  ],
};

// Create a shadow style (not natively supported in react-pdf)
const shadowStyle = {
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 1 },
};

// Add shadow to pdfStyles
pdfStyles.shadowSm = shadowStyle;