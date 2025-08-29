# Q&A Collection System - Setup Instructions

## Overview
This is a complete web application for collecting descriptive Q&A responses. The system includes:
- A beautiful, responsive frontend (HTML/CSS/JS)
- Google Sheets backend for data storage
- Automatic data persistence
- Export capabilities

## Quick Start

### 1. Frontend Setup (5 minutes)
1. Open `index.html` in any web browser
2. The app is ready to use immediately with local storage
3. For production use, follow the backend setup below

### 2. Backend Setup (Google Sheets - 10 minutes)

#### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Q&A Collection System" (or any name you prefer)
4. Keep this spreadsheet open

#### Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the entire content from `google-apps-script.js`
4. Save the script (Ctrl+S or Cmd+S)
5. Name it "Q&A Collection Backend"

#### Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Choose **Web app** as the type
3. Set the following:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the Web App URL** (you'll need this for the frontend)

#### Step 4: Initialize the Sheet
1. In the Apps Script editor, run the `setupWebApp()` function
2. Go back to your Google Sheet
3. You should see a new sheet called "QAResponses" with headers

#### Step 5: Connect Frontend to Backend
1. Open `index.html` in a text editor
2. Find this line: `const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your actual Web App URL
4. Save the file

### 3. Customize Questions (Optional)
1. In `index.html`, find the `questionsDatabase` object
2. Replace the sample questions with your actual 40 questions
3. Use the format: `'Q101': 'Your question text here',`

## Usage

### For Respondents
1. Open the web app in a browser
2. Enter a question code (e.g., Q101, Q102)
3. Read the displayed question
4. Provide 3 descriptive answers
5. Click "Submit Answers"
6. See the thank you message

### For Administrators
1. **View Responses**: Open your Google Sheet and check the "QAResponses" tab
2. **Export Data**: Run the `exportResponses()` function in Apps Script
3. **Clear Test Data**: Use `clearTestData()` function if needed

## Data Structure

Each response is saved with:
- **Timestamp**: When the response was submitted
- **Question Code**: The unique identifier (Q101, Q102, etc.)
- **Question Text**: The full question
- **Answer 1**: First descriptive answer
- **Answer 2**: Second descriptive answer
- **Answer 3**: Third descriptive answer

## Features

### Frontend Features
- ✅ Modern, responsive design
- ✅ Input validation
- ✅ Loading states
- ✅ Error handling
- ✅ Mobile-friendly
- ✅ Keyboard navigation (Enter key support)

### Backend Features
- ✅ Automatic data persistence
- ✅ No data loss (append-only)
- ✅ Structured data storage
- ✅ Export capabilities
- ✅ Error handling
- ✅ CORS support

### Security Features
- ✅ Input validation
- ✅ Error handling
- ✅ Safe data storage
- ✅ No sensitive data exposure

## Troubleshooting

### Common Issues

**1. "Question code not found" error**
- Check that the question code exists in the `questionsDatabase`
- Ensure the code format matches exactly (Q101, Q102, etc.)

**2. "Failed to submit answers" error**
- Check your internet connection
- Verify the Google Apps Script URL is correct
- Ensure the Google Apps Script is deployed and accessible

**3. Data not appearing in Google Sheets**
- Run the `setupWebApp()` function in Apps Script
- Check that the "QAResponses" sheet exists
- Verify the Apps Script has permission to access the sheet

**4. CORS errors**
- The Apps Script includes CORS headers
- If issues persist, check browser console for specific errors

### Testing
1. **Local Testing**: The app works with local storage for testing
2. **Backend Testing**: Use the Web App URL in a browser to test the API
3. **Data Validation**: Check Google Sheets after each submission

## Advanced Configuration

### Adding More Questions
Edit the `questionsDatabase` in `index.html`:
```javascript
const questionsDatabase = {
    'Q101': 'Your question 1',
    'Q102': 'Your question 2',
    // ... add up to Q140
};
```

### Customizing the UI
- Colors: Modify CSS variables in the `<style>` section
- Layout: Adjust the container width and padding
- Text: Update placeholder text and labels

### Scheduling Exports
In Google Apps Script, you can set up triggers:
1. Go to **Triggers** in Apps Script
2. Create a new trigger for `exportResponses()`
3. Set frequency (daily, weekly, etc.)

## Data Export Options

### From Google Sheets
1. **CSV Export**: File → Download → CSV
2. **Excel Export**: File → Download → Microsoft Excel
3. **Google Drive**: File → Share → Copy link

### From Apps Script
1. **Email Export**: Modify `exportResponses()` to email data
2. **Drive Export**: Save as CSV/Excel to Google Drive
3. **API Export**: Create additional endpoints for data retrieval

## Support

If you encounter issues:
1. Check the browser console for JavaScript errors
2. Check the Apps Script logs for backend errors
3. Verify all URLs and permissions are correct
4. Test with a simple question code first

## Security Notes

- The system is designed for internal use
- No authentication is included (add if needed)
- Data is stored in Google Sheets (Google's security)
- Consider adding rate limiting for production use

## Performance Notes

- The app works offline (with local storage fallback)
- Google Sheets can handle thousands of responses
- Consider pagination for large datasets
- Optimize question database for faster lookups

---

**Ready to use!** Your Q&A collection system is now fully functional and ready to collect responses.
