// Google Apps Script for Q&A Collection System
// This script creates a web endpoint to save responses to Google Sheets

function doPost(e) {
  try {
    console.log('doPost called with:', e ? 'valid event' : 'no event');
    
    // Check if e and e.postData exist
    if (!e || !e.postData) {
      console.error('Invalid request: missing event or postData');
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Invalid request data' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    console.log('PostData contents:', e.postData.contents);
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', data);
    
    // Validate required fields
    if (!data.questionCode || !data.questionText || !data.answer1 || !data.answer2 || !data.answer3) {
      console.error('Missing required fields:', data);
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Missing required fields' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    console.log('Spreadsheet name:', spreadsheet.getName());
    
    let sheet = spreadsheet.getSheetByName('QAResponses');
    if (!sheet) {
      console.log('QAResponses sheet not found, creating...');
      sheet = createResponseSheet(spreadsheet);
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.questionCode,
      data.questionText,
      data.answer1,
      data.answer2,
      data.answer3
    ];
    
    console.log('Appending row:', rowData);
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    console.log('Data saved successfully');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Response saved successfully',
        timestamp: data.timestamp,
        rowCount: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing request:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: 'Internal server error',
        details: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing or data retrieval)
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'Q&A Collection System API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function createResponseSheet(spreadsheet) {
  // Create a new sheet for responses if it doesn't exist
  const sheet = spreadsheet.insertSheet('QAResponses');
  
  // Set up headers
  const headers = [
    'Timestamp',
    'Question Code',
    'Question Text',
    'Answer 1',
    'Answer 2',
    'Answer 3'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  
  // Auto-resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
  
  // Freeze the header row
  sheet.setFrozenRows(1);
  
  return sheet;
}

function setupWebApp() {
  // This function helps set up the web app
  // Run this once to create the response sheet
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    createResponseSheet(spreadsheet);
    
    console.log('Q&A Collection System setup complete!');
    
    // Try to get the web app URL (only works if deployed)
    try {
      const webAppUrl = ScriptApp.getService().getUrl();
      console.log('Web app URL: ' + webAppUrl);
    } catch (urlError) {
      console.log('Web app not yet deployed. Please deploy as web app first.');
    }
    
    return 'Setup completed successfully!';
  } catch (error) {
    console.error('Setup error:', error);
    throw error;
  }
}

function exportResponses() {
  // Function to export all responses (can be run manually or scheduled)
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('QAResponses');
  
  if (!sheet) {
    console.log('No responses sheet found');
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const responses = data.slice(1);
  
  console.log('Total responses:', responses.length);
  console.log('Headers:', headers);
  
  // You can add export logic here (email, download, etc.)
  return {
    headers: headers,
    responses: responses,
    count: responses.length
  };
}

function clearTestData() {
  // Function to clear test data (use with caution!)
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('QAResponses');
  
  if (sheet) {
    // Keep headers, clear all data rows
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
    }
  }
}

// Optional: Add CORS headers for cross-origin requests
function addCorsHeaders(response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// Test function to verify everything is working
function testSetup() {
  try {
    console.log('Testing Q&A Collection System setup...');
    
    // Test 1: Check if spreadsheet is accessible
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    console.log('✓ Spreadsheet accessible:', spreadsheet.getName());
    
    // Test 2: Check if QAResponses sheet exists
    const sheet = spreadsheet.getSheetByName('QAResponses');
    if (sheet) {
      console.log('✓ QAResponses sheet exists');
      console.log('✓ Sheet has', sheet.getLastRow(), 'rows');
      
      // Show last few rows if any data exists
      if (sheet.getLastRow() > 1) {
        const lastRows = sheet.getRange(Math.max(1, sheet.getLastRow() - 2), 1, Math.min(3, sheet.getLastRow()), 6).getValues();
        console.log('✓ Last few rows:', lastRows);
      }
    } else {
      console.log('⚠ QAResponses sheet not found - run setupWebApp() first');
    }
    
    // Test 3: Check if web app is deployed
    try {
      const webAppUrl = ScriptApp.getService().getUrl();
      console.log('✓ Web app deployed:', webAppUrl);
    } catch (error) {
      console.log('⚠ Web app not deployed - deploy as web app first');
    }
    
    console.log('Test completed successfully!');
    return 'All tests passed!';
    
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}

// Test function to manually add a test response
function addTestResponse() {
  try {
    console.log('Adding test response...');
    
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName('QAResponses');
    
    if (!sheet) {
      console.log('Creating QAResponses sheet...');
      sheet = createResponseSheet(spreadsheet);
    }
    
    const testData = [
      new Date().toISOString(),
      'TEST001',
      'Test Question: What is your favorite color?',
      'Red',
      'Blue',
      'Green'
    ];
    
    sheet.appendRow(testData);
    console.log('✓ Test response added successfully');
    console.log('✓ Total rows now:', sheet.getLastRow());
    
    return 'Test response added successfully!';
    
  } catch (error) {
    console.error('Error adding test response:', error);
    throw error;
  }
}
